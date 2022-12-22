const { tables } = require("..");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.headLeader, (table) => {
      table.increments("id").primary();
      table
        .integer("person_id")
        .unsigned()
        .references("id")
        .inTable(tables.person)
        .notNullable();
      table
        .integer("year_id")
        .unsigned()
        .references("id")
        .inTable(tables.year)
        .notNullable();
    });
  },
  down: async (knex) => {
    await knex.schema.dropTable(tables.headLeader);
  },
};
