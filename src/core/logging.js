const winston = require('winston');
const {combine, timestamp, colorize, printf} = winston.format;

let logger;

const loggerFormat = () => {
  const formatMessage = ({level, message, timestamp, ...rest}) =>
    `${timestamp} ${level}: ${message} ${
      Object.keys(rest).length ? JSON.stringify(rest, null, 2) : ''
    }`;

  const formatError = ({error: {stack}, ...rest}) =>
    `${formatMessage(rest)}\n\n${stack}\n`;

  const format = (info) =>
    info.error instanceof Error ? formatError(info) : formatMessage(info);

  return combine(colorize(), timestamp(), printf(format));
};

/**
 * Get the root logger
 *
 * @return {winston.Logger} The root logger
 */
module.exports.getLogger = () => {
  if (!logger) throw new Error('Logger not initialized');
  return logger;
};

/**
 * Initialize the logger
 *
 * @param {object} options The logger options
 * @param {string} options.level The log level
 * @param {boolean} options.disabled Whether to disable logging
 * @param {object} options.defaultMeta The default meta data to log with
 * @param {winston.transport[]} options.extraTransports Extra transports to add
 * besides the console transport
 */

module.exports.initializeLogger = ({
  level,
  disabled,
  defaultMeta = {},
  extraTransports = [],
}) => {
  logger = winston.createLogger({
    level,
    defaultMeta,
    format: loggerFormat(),
    transports: [
      new winston.transports.Console({silent: disabled}),
      ...extraTransports,
    ],
  });

  logger.info(`Logger initialized with minimum log level ${level}`);
};
