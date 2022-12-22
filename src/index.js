const Koa = require('koa');
const config = require('config');
const bodyParser = require('koa-bodyparser');
const koaCors = require('@koa/cors');
const { initializeLogger, getLogger } = require('./core/logging');
const installRest = require('./rest');

const NODE_ENV = config.get('env');
const CORS_ORIGINS = config.get('cors.origins');
const CORS_MAX_AGE = config.get('cors.maxAge');
const LOG_LEVEL = config.get('logLevel');
const LOG_DISABLED = config.get('logDisabled');

initializeLogger({
  level: LOG_LEVEL,
  disabled: LOG_DISABLED,
  defaultMeta: { env: NODE_ENV },
});

const app = new Koa();

// Add CORS
app.use(
  koaCors({
    origin: (ctx) => {
      if (CORS_ORIGINS.includes(ctx.request.header.origin)) {
        return ctx.request.header.origin;
      }
      return CORS_ORIGINS[0];
    },
    allowHeaders: ['Accept', 'Content-Type', 'Authorization'],
    maxAge: CORS_MAX_AGE,
  })
);

const logger = getLogger();

app.use(bodyParser());

installRest(app);

app.listen(9000);
logger.info('🚀 Server listening on http://localhost:9000');
