const supertest = require('supertest');

const createServer = require('../src/createServer');
const {getKnex} = require('../src/data');

/**
 * Ensure a server instance is running.
 *
 * @param {Function} setter - Setter which gives access to the supertest agent
 * and the Knex instance
 *
 * @return {supertest.SuperAgentTest} - Supertest agent
 */
const withServer = (setter) => {
  let server;

  beforeAll(async () => {
    server = await createServer();
    server.start();

    setter({
      knex: getKnex(),
      request: supertest(server.getApp().callback()),
    });
  });

  afterAll(async () => {
    // Cleanup resources!
    await server.stop();
  });

  return server;
};

module.exports = {
  withServer,
};
