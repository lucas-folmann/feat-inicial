import {NestFastifyApplication, FastifyAdapter} from '@nestjs/platform-fastify';
import {Test} from '@nestjs/testing';
import * as winston from 'winston';
import {WinstonModule, WINSTON_MODULE_NEST_PROVIDER} from 'nest-winston';
import {AppModule} from '../app.module';
import {setupSwagger} from '../common/swagger.config';
import winstonTransports from '../common/winston.logger';


describe('Main', () => {
  let app: NestFastifyApplication;
  let logger: winston.Logger;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, WinstonModule.forRoot(winstonTransports)]
    }).compile();

    app = moduleRef.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter()
    );

    logger = app.get<winston.Logger>(WINSTON_MODULE_NEST_PROVIDER);

    app.useLogger(logger);

    setupSwagger(app);
  });

  it('should log a warning message', () => {
    const loggerWarnSpy = jest.spyOn(logger, 'warn');

    expect(loggerWarnSpy).not.toHaveBeenCalled();

    logger.warn('Test warning message');

    expect(loggerWarnSpy).toHaveBeenCalledWith('Test warning message');
  });

  afterAll(async () => {
    await app.close();
  });
});
