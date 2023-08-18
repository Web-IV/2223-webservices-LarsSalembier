import Koa from 'koa';
import KoaRouter from '@koa/router';

import { PrismaClient } from '@prisma/client';
import bodyParser from 'koa-bodyparser';
import Seeder from '../seeders/Seeder.js';
import Service from '../service/Service.js';
import Router from '../router/Router.js';
import CorsManager from './CorsManager.js';
import CustomLogger from './CustomLogger.js';
import CustomPrismaClient from './CustomPrismaClient.js';
import RequestLogger from './RequestLogger.js';
import ErrorHandler from './ErrorHandler.js';
import Auth from './Auth.js';
import Repository from '../repository/Repository.js';

class Server {
  private readonly port: number;

  private readonly serverLogger: CustomLogger;

  private readonly prismaLogger: CustomLogger;

  private readonly requestLogger: RequestLogger;

  private readonly seederLogger: CustomLogger;

  private readonly prisma: PrismaClient;

  private readonly repository: Repository;

  private readonly service: Service;

  private readonly koaRouter: KoaRouter;

  private readonly errorHandler: ErrorHandler;

  private readonly router: Router;

  private readonly seed: Seeder | null = null;

  public readonly app: Koa;

  constructor(port: number, seedDatabase: boolean = false) {
    // setup port
    this.port = port;

    // setup loggers
    this.serverLogger = new CustomLogger('Server');
    this.prismaLogger = new CustomLogger('Prisma', false);
    this.requestLogger = new RequestLogger(this.serverLogger);
    this.requestLogger.koaMiddleware = this.requestLogger.koaMiddleware.bind(
      this.requestLogger
    );
    this.seederLogger = new CustomLogger('Seeder');

    // setup prisma client
    this.prisma = new CustomPrismaClient(this.prismaLogger);

    // setup repository
    this.repository = new Repository(this.prisma);

    // setup service
    this.service = new Service(this.repository);

    // setup error handler
    this.errorHandler = new ErrorHandler(this.serverLogger);
    this.errorHandler.koaMiddleware = this.errorHandler.koaMiddleware.bind(
      this.errorHandler
    );

    // setup router
    this.koaRouter = new KoaRouter();
    this.router = new Router(this.koaRouter, this.service);

    if (seedDatabase) {
      // setup seeds
      this.seed = new Seeder(this.service, this.seederLogger);
    }

    // setup koa app
    this.app = new Koa();
  }

  private async runServer() {
    // setup CORS
    this.app.use(CorsManager.getCors());

    // setup request logger
    this.app.use(this.requestLogger.koaMiddleware);

    // setup error handler
    this.app.use(this.errorHandler.koaMiddleware);

    this.app.use(Auth.checkJsonWebToken());

    // setup body parser
    this.app.use(bodyParser());

    // setup routes
    this.app.use(this.router.routes()).use(this.router.allowedMethods());

    // run seeds
    if (this.seed != null) {
      await this.seed.run();
    }

    // start server
    this.app.listen(this.port);

    // log server startup
    this.serverLogger.info(
      `🚀 Server listening on http://localhost:${this.port}`
    );
  }

  public async start() {
    await this.runServer()
      .then(async () => {
        await this.prisma.$disconnect();
      })
      .catch(async (e) => {
        this.prismaLogger.error(e);
        await this.stop();
        process.exit(1);
      });
  }

  public async stop() {
    this.app.removeAllListeners();
    await this.prisma.$disconnect();
    this.serverLogger.info('🪦 Server stopped');
  }
}

export default Server;
