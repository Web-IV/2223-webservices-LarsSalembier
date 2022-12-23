const packageJson = require("../../package.json");

/**
 * Check if the server is healthy. Can be extended to check database connection, etc.
 */
const ping = () => ({ pong: true });

/**
 * Get the running server's information.
 */
const getVersion = () => ({
  env: process.env.NODE_ENV,
  name: packageJson.name,
  version: packageJson.version,
});

module.exports = {
  ping,
  getVersion,
};
