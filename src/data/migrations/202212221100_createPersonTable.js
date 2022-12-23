const {tables} = require('..');

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.person, (table) => {
      table.increments('id').primary();
      table.string('first_name', 255).notNullable();
      table.string('last_name', 255).notNullable();
      table.string('cellphone', 255).notNullable();
      table
          .integer('address_id')
          .unsigned()
          .references('id')
          .inTable(tables.address);
    });
  },
  down: async (knex) => {
    await knex.schema.dropTable(tables.person);
  },
};
