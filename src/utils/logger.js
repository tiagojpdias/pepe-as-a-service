const winston = require('winston');
const config = require('../../config');

const logsPath = config('logs.path');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      filename: `${logsPath}/error.log`,
      level: 'error',
    }),
    new winston.transports.File({
      filename: `${logsPath}/combined.log`,
    }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({ format: winston.format.simple() }),
  );
}

module.exports = logger;
