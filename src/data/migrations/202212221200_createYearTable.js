const {tables} = require('..');

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.year, (table) => {
      table.increments('id').primary();
      table.dateTime('start_date').notNullable();
      table.dateTime('end_date').notNullable();
    });
  },
  down: async (knex) => {
    await knex.schema.dropTable(tables.year);
  },
};
