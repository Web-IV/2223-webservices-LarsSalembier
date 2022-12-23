const { tables, getKnex } = require("../data/index");
const { getLogger } = require("../core/logger");

const SELECT_COLUMNS = [
  `${tables.event}.id`,
  "name",
  "description",
  `${tables.event}.start_date as event_start_date`,
  `${tables.event}.end_date as event_end_date`,
  "target_audience",
  `${tables.event}.end_date`,
  `${tables.address}.id as address_id`,
  `${tables.address}.street as address_street`,
  `${tables.address}.number as address_number`,
  `${tables.address}.city as address_city`,
  `${tables.address}.zip as address_zip`,
  `${tables.year}.id as year_id`,
  `${tables.year}.start_date as year_start_date`,
  `${tables.year}.end_date as year_end_date`,
];

const formatEvent = ({
  address_id,
  address_street,
  address_number,
  address_city,
  address_zip,
  year_id,
  year_start_date,
  year_end_date,
  event_start_date,
  event_end_date,
  ...rest
}) => {
  const address = address_id
    ? {
        id: address_id,
        street: address_street,
        number: address_number,
        city: address_city,
        zip: address_zip,
      }
    : null;

  return {
    ...rest,
    start_date: event_start_date,
    end_date: event_end_date,
    address: address,
    year: {
      id: year_id,
      start_date: year_start_date,
      end_date: year_end_date,
    },
  };
};

/**
 * Get all events
 *
 * @returns {Promise<Array>} events
 */
const findAll = async () => {
  const events = await getKnex()(tables.event)
    .select(SELECT_COLUMNS)
    .join(
      tables.address,
      `${tables.event}.address_id`,
      "=",
      `${tables.address}.id`
    )
    .join(tables.year, `${tables.event}.year_id`, "=", `${tables.year}.id`)
    .orderBy(`${tables.event}.start_date`, "desc");

  return events.map(formatEvent);
};

/**
 * Calculate the number of events
 *
 * @returns {Promise<number>} number of events
 */
const findCount = async () => {
  const [count] = await getKnex()(tables.event).count();

  return count["count(*)"];
};

/**
 * Get an event by id
 *
 * @param {number} id
 *
 * @returns {Promise<Object>} event
 */
const findById = async (id) => {
  const [event] = await getKnex()(tables.event)
    .select(SELECT_COLUMNS)
    .join(
      tables.address,
      `${tables.event}.address_id`,
      "=",
      `${tables.address}.id`
    )
    .join(tables.year, `${tables.event}.year_id`, "=", `${tables.year}.id`)
    .where(`${tables.event}.id`, id);

  return formatEvent(event);
};

/**
 * Create an event
 *
 * @param {object} event
 * @param {string} event.name
 * @param {string} event.description
 * @param {number} event.address_id
 * @param {string} event.start_date
 * @param {string} event.end_date
 * @param {string} event.target_audience
 * @param {number} event.year_id
 *
 * @returns {Promise<number>} id of the created event
 */
const create = async ({
  name,
  description,
  address_id,
  start_date,
  end_date,
  target_audience,
  year_id,
}) => {
  try {
    const [id] = await getKnex()(tables.event).insert({
      name,
      description,
      address_id,
      start_date,
      end_date,
      target_audience,
      year_id,
    });

    return id;
  } catch (error) {
    const logger = getLogger();
    logger.error("Error creating event", { error });
    throw error;
  }
};

/**
 * Update an event
 *
 * @param {number} id
 * @param {object} event
 * @param {string} event.name
 * @param {string} event.description
 * @param {number} event.address_id
 * @param {string} event.start_date
 * @param {string} event.end_date
 * @param {string} event.target_audience
 * @param {number} event.year_id
 *
 * @returns {Promise<number>} id of the updated event
 */
const updateById = async (
  id,
  {
    name,
    description,
    address_id,
    start_date,
    end_date,
    target_audience,
    year_id,
  }
) => {
  try {
    const [id] = await getKnex()(tables.event)
      .update({
        name,
        description,
        address_id,
        start_date,
        end_date,
        target_audience,
        year_id,
      })
      .where(`${tables.event}.id`, id);

    return id;
  } catch (error) {
    const logger = getLogger();
    logger.error("Error updating event", { error });
    throw error;
  }
};

/**
 * Delete an event
 *
 * @param {number} id
 *
 * @returns {Promise<boolean>} true if the event was deleted
 */
const deleteById = async (id) => {
  try {
    const rowsAffected = await getKnex()(tables.event)
      .delete()
      .where(`${tables.event}.id`, id);

    return rowsAffected > 0;
  } catch (error) {
    const logger = getLogger();
    logger.error("Error deleting event", { error });
    throw error;
  }
};

module.exports = {
  findAll,
  findCount,
  findById,
  create,
  updateById,
  deleteById,
};
