import winston, { Logger } from 'winston';
import config from '../../config';

const logsPath: string = config('logs.path') as string;

const logger: Logger = winston.createLogger({
  format: winston.format.json(),
  level: 'info',
  transports: [
    new winston.transports.File({
      filename: `${logsPath}/error.log`,
      level: 'error',
    }),
    new winston.transports.File({ filename: `${logsPath}/combined.log` }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({ format: winston.format.simple() }),
  );
}

export default logger;
