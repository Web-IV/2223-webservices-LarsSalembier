const Koa = require('koa');
const Router = require('@koa/router');
const config = require('config');
const { initializeLogger, getLogger } = require('./core/logging');
const personService = require('./service/person');
const bodyParser = require('koa-bodyparser');

const NODE_ENV = config.get('env');
const LOG_LEVEL = config.get('logLevel');
const LOG_DISABLED = config.get('logDisabled');

initializeLogger({
  level: LOG_LEVEL,
  disabled: LOG_DISABLED,
  defaultMeta: { env: NODE_ENV },
});

console.log(`log level ${LOG_LEVEL}, logs enabled: ${!LOG_DISABLED}`);

const app = new Koa();

app.use(bodyParser());
const logger = getLogger();

const router = new Router();

router.get("/api/people", async (ctx) => {
  logger.info(JSON.stringify(ctx.request));
  ctx.body = personService.getAll();
});

router.post("/api/people", async (ctx) => {
  ctx.body = personService.create(ctx.request.body);
});

router.get("/api/people/:id", async (ctx) => {
  ctx.body = personService.getById(Number(ctx.params.id));
});

router.put("/api/people/:id", async (ctx) => {
  ctx.body = personService.updateById(Number(ctx.params.id), ctx.request.body);
});

router.delete("/api/people/:id", async (ctx) => {
  personService.deleteById(Number(ctx.params.id));
  ctx.status = 204;
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(9000);
logger.info('🚀 Server listening on http://localhost:9000');
