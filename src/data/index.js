const config = require("config");
const knex = require("knex");
const { join } = require("path");

const { getLogger } = require("../core/logging");

const NODE_ENV = config.get("env");
const isDevelopment = NODE_ENV === "development";

const DATABASE_CLIENT = config.get("database.client");
const DATABASE_HOST = config.get("database.host");
const DATABASE_PORT = config.get("database.port");
const DATABASE_NAME = config.get("database.name");
const DATABASE_USERNAME = config.get("database.username");
const DATABASE_PASSWORD = config.get("database.password");

let knexInstance = null;

const getKnexLogger = (logger, level) => (message) => {
  if (message.sql) {
    logger.log(level, message.sql);
  } else if (message.length && message.forEach) {
    message.forEach((msg) => logger.log(level, msg.sql ?? JSON.stringify(msg)));
  } else {
    logger.log(level, JSON.stringify(message));
  }
};

async function initializeData() {
  const logger = getLogger();
  logger.info("Initializing connection to database");

  const knexOptions = {
    client: DATABASE_CLIENT,
    connection: {
      host: DATABASE_HOST,
      port: DATABASE_PORT,
      user: DATABASE_USERNAME,
      password: DATABASE_PASSWORD,
      insecureAuth: isDevelopment,
    },
    debug: isDevelopment,
    log: {
      debug: getKnexLogger(logger, "debug"),
      warn: getKnexLogger(logger, "warn"),
      error: getKnexLogger(logger, "error"),
      deprecate: (method, alternative) =>
        logger.warn("Knex reported something deprecated", {
          method,
          alternative,
        }),
    },
    migrations: {
      tableName: "knex_meta",
      directory: join("src", "data", "migrations"),
    },
    seeds: {
      directory: join("src", "data", "seeds"),
    },
  };

  knexInstance = knex(knexOptions);

  // Check the connection, create the database and then reconnect.
  try {
    await knexInstance.raw("SELECT 1+1 AS result");
    await knexInstance.raw(`CREATE DATABASE IF NOT EXISTS ${DATABASE_NAME}`);

    // We need to update the Knex configuration and reconnect to use the created database by default.
    await knexInstance.destroy();

    knexOptions.connection.database = DATABASE_NAME;
    knexInstance = knex(knexOptions);
    await knexInstance.raw("SELECT 1+1 AS result");
  } catch (error) {
    logger.error(error.message, { error });
    throw new Error("Could not initialize the data layer");
  }

  // Run migrations
  let migrationsFailed = true;
  try {
    await knexInstance.migrate.latest();
    migrationsFailed = false;
  } catch (error) {
    logger.error("Error while migrating the database", { error });
  }

  // Undo last migration if it failed
  if (migrationsFailed) {
    try {
      await knexInstance.migrate.down();
    } catch (error) {
      logger.error("Error while undoing the last migration", { error });
    }

    // No point in starting the server if the migrations failed
    throw new Error("Migrations failed");
  }

  // Run seeds in development
  if (isDevelopment) {
    try {
      await knexInstance.seed.run();
    } catch (error) {
      logger.error("Error while seeding the database", { error });
    }
  }

  logger.info("Successfully connected to database");
  return knexInstance;
}

async function shutdownData() {
  const logger = getLogger();
  logger.info("Shutting down connection to database");

  await knexInstance.destroy();
  knexInstance = null;

  logger.info("Successfully shut down connection to database");
}

function getKnex() {
  if (!knexInstance) {
    throw new Error("Data layer not initialized");
  }

  return knexInstance;
}

const tables = {
  address: "addresses",
  article: "articles",
  event: "events",
  group: "groups",
  leader: "leaders",
  headLeader: "head_leaders",
  adultLeader: "adult_leaders",
  person: "people",
  year: "years",
};

module.exports = {
  initializeData,
  shutdownData,
  getKnex,
  tables,
};
