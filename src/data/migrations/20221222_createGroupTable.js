const { tables } = require("..");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.group, (table) => {
      table.increments("id").primary();
      table.string("name", 255).notNullable();
      table.string("color", 255).notNullable();
      table.string("mascotName", 255);
      table.string("targetAudience", 255).notNullable();
    });
  },
  down: async (knex) => {
    await knex.schema.dropTable(tables.group);
  },
};
