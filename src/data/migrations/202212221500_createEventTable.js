const {tables} = require('..');

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.event, (table) => {
      table.increments('id').primary();
      table.string('name', 255).notNullable();
      table.text('description');
      table
          .integer('address_id')
          .unsigned()
          .references('id')
          .inTable(tables.address);
      table.dateTime('start_date').notNullable();
      table.dateTime('end_date');
      table.string('target_audience', 255);
      table
          .integer('year_id')
          .unsigned()
          .references('id')
          .inTable(tables.year)
          .notNullable();
    });
  },
  down: async (knex) => {
    await knex.schema.dropTable(tables.event);
  },
};
