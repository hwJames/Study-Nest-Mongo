import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';

// Winston & Morgan
import {
  WinstonModule,
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston';
import { format, transports } from 'winston';
import * as morgan from 'morgan';

// Config
import configuration from './config/configuration.config';

declare const module: any;

async function bootstrap() {
  const logDir = join(__dirname, '..', 'logs');

  const consoleTransport = new transports.Console({
    format: format.combine(
      format.timestamp(),
      nestWinstonModuleUtilities.format.nestLike(),
    ),
  });

  const infoTransport = new transports.File({
    filename: 'info.log',
    dirname: logDir,
    level: 'info',
    format: format.combine(
      format.timestamp(),
      nestWinstonModuleUtilities.format.nestLike(),
    ),
  });

  const errorTransport = new transports.File({
    filename: 'error.log',
    dirname: logDir,
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

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: logger,
  });

  app.use(morgan('combined', { stream }));

  await app.listen(configuration().port);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
