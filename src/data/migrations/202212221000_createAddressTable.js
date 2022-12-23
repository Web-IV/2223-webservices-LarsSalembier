const { tables } = require("..");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.address, (table) => {
      table.increments("id").primary();
      table.string("street", 255).notNullable();
      table.string("number", 255).notNullable();
      table.string("city", 255).notNullable();
      table.integer("zip").unsigned().notNullable();
    });
  },
  down: async (knex) => {
    await knex.schema.dropTable(tables.address);
  },
};
