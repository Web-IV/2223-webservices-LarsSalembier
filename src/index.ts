/* eslint-disable no-console */
import config from 'config';
import Server from './core/Server.js';

async function main() {
  try {
    const shouldSeed: boolean = config.get('database.seed');
    const port: number = config.get('port');

    const server = new Server(port, shouldSeed);
    await server.start();

    const onClose = async () => {
      await server.stop();
      process.exit(0);
    };

    process.on('SIGTERM', onClose);
    process.on('SIGQUIT', onClose);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();
