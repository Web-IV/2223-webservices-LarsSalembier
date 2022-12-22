const Koa = require('koa');
const config = require('config');
const { initializeLogger, getLogger } = require('./core/logging');
const bodyParser = require('koa-bodyparser');
const installRest = require('./rest');

const NODE_ENV = config.get('env');
const LOG_LEVEL = config.get('logLevel');
const LOG_DISABLED = config.get('logDisabled');

initializeLogger({
  level: LOG_LEVEL,
  disabled: LOG_DISABLED,
  defaultMeta: { env: NODE_ENV },
});

const app = new Koa();

const logger = getLogger();

app.use(bodyParser());

installRest(app);

app.listen(9000);
logger.info('🚀 Server listening on http://localhost:9000');
