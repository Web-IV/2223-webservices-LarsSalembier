const Koa = require('koa');
const config = require('config');

const { getLogger } = require('./core/logging');

const NODE_ENV = config.get('env');
const LOG_LEVEL = config.get('logLevel');
const LOG_DISABLED = config.get('logDisabled');

console.log(`log level ${LOG_LEVEL}, logs enabled: ${!LOG_DISABLED}`);

const app = new Koa();
const logger = getLogger();

app.use(async (ctx, next) => {
  ctx.body = 'Hello world';
  next();
});

logger.info('🚀 Server listening on http://localhost:9000');
app.listen(9000);
