const { tables } = require("..");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.person, (table) => {
      table.increments("id").primary();
      table.firstName("firstName", 255).notNullable();
      table.lastName("lastName", 255).notNullable();
      table.cellphone("cellphone", 255).notNullable();
      table
        .integer("address_id")
        .unsigned()
        .references("id")
        .inTable(tables.address);
    });
  },
  down: async (knex) => {
    await knex.schema.dropTable(tables.person);
  },
};