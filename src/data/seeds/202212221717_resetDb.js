const {tables} = require('..');

module.exports = {
  seed: async (knex) => {
    // first delete all entries in every table.
    await knex(tables.person).del();
    await knex(tables.address).del();
    await knex(tables.leader).del();
    await knex(tables.group).del();
    await knex(tables.year).del();
    await knex(tables.event).del();
    await knex(tables.article).del();
  },
};
