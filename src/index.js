const Koa = require('koa');
const Router = require('@koa/router');
const config = require('config');
const { getLogger } = require('./core/logging');
const personService = require('./service/person');
const bodyParser = require('koa-bodyparser');

const NODE_ENV = config.get('env');
const LOG_LEVEL = config.get('logLevel');
const LOG_DISABLED = config.get('logDisabled');

console.log(`log level ${LOG_LEVEL}, logs enabled: ${!LOG_DISABLED}`);

const app = new Koa();
const logger = getLogger();

app.use(bodyParser());

const router = new Router();

router.get("/api/people", async (ctx) => {
  logger.info(JSON.stringify(ctx.request));
  ctx.body = personService.getAll();
});

router.post("/api/people", async (ctx) => {
  logger.info(JSON.stringify(ctx.request));
  const newPerson = personService.create(ctx.request.body);
  ctx.body = newPerson;
});

app
  .use(router.routes())
  .use(router.allowedMethods());

logger.info('🚀 Server listening on http://localhost:9000');
app.listen(9000);
