const { tables } = require("..");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.article, (table) => {
      table.increments("id").primary();
      table.string("title", 255).notNullable();
      table.text("content").notNullable();
    });
  },
  down: async (knex) => {
    await knex.schema.dropTable(tables.article);
  },
};
