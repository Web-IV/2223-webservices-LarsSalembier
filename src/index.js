const createServer = require('./createServer');

/**
 * Start the server.
 *
 * @return {Promise<void>} The promise.
 */
async function main() {
  try {
    const server = await createServer();
    await server.start();

    /**
     * Close the server.
     *
     * @return {Promise<void>} The promise.
     */
    async function onClose() {
      await server.stop();
      process.exit(0);
    }

    process.on('SIGTERM', onClose);
    process.on('SIGQUIT', onClose);
  } catch (error) {
    console.error(error);
    process.exit(-1);
  }
}

// Wrap inside a main function as top level await is not supported in all
// NodeJS versions
main();
