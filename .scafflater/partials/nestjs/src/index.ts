import {NestFactory} from '@nestjs/core';
import {WinstonModule, WINSTON_MODULE_NEST_PROVIDER} from 'nest-winston';
import {FastifyAdapter, NestFastifyApplication} from '@nestjs/platform-fastify';
import {AppModule} from './app.module';
import {setupSwagger} from './common/swagger.config';
import winstonTransports from './common/winston.logger';

const port: number = parseInt(process.env.APP_PORT || '3000', 10);

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      logger: WinstonModule.createLogger(winstonTransports)
    }
  );
  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);

  // Este bloco é utilizado para que as chamadas ao console respeitem o log level configurado no winston
  console.log = (...args) => logger.log(...args);
  console.info = (...args) => logger.log(...args);
  console.warn = (...args) => logger.warn(...args);
  console.error = (...args) => logger.error(...args);
  console.debug = (...args) => logger.debug(...args);

  app.useLogger(logger);

  setupSwagger(app);

  await app.listen(port, '0.0.0.0');

  logger.warn(`Application is running on port ${port}`);
}

bootstrap();
