import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

// Winston & Morgan
import { logger, stream } from './config/winston.config';
import * as morgan from 'morgan';

// Config
import configuration from './config/configuration.config';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: logger,
  });

  app.use(morgan('combined', { stream }));

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(configuration().port);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
