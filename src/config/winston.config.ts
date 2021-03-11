import { join } from 'path';
import { transports, format } from 'winston';
import {
  WinstonModule,
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston';
import * as moment from 'moment';

const logDir = join(__dirname, '..', '..', 'logs');

const consoleTransport = new transports.Console({
  format: format.combine(
    format.timestamp(),
    nestWinstonModuleUtilities.format.nestLike(),
  ),
});

const infoTransport = new transports.File({
  filename: 'info-' + moment().format('YYYY-MM-DD') + '.log',
  dirname: join(logDir, 'info'),
  level: 'info',
  format: format.combine(
    format.timestamp(),
    nestWinstonModuleUtilities.format.nestLike(),
  ),
});

const errorTransport = new transports.File({
  filename: 'error-' + moment().format('YYYY-MM-DD') + '.log',
  dirname: join(logDir, 'error'),
  level: 'error',
  format: format.combine(
    format.timestamp(),
    nestWinstonModuleUtilities.format.nestLike(),
  ),
});

const stream = {
  write: (message: string) => {
    logger.log(message);
  },
};

const logger = WinstonModule.createLogger({
  transports: [consoleTransport, infoTransport, errorTransport],
});

export { logger, stream };
