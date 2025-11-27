import {Test} from '@nestjs/testing';
import {WINSTON_MODULE_PROVIDER} from 'nest-winston';
import {Logger} from 'winston';

import {LoggingService} from '../modules/logging/logging.service';

describe('Logging service', () => {
  let loggingService: LoggingService;
  let logger: Logger;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        LoggingService,
        {
          provide: WINSTON_MODULE_PROVIDER,
          useValue: {
            info: jest.fn().mockReturnThis(),
            error: jest.fn().mockReturnThis()
          }
        }
      ]
    }).compile();
    loggingService = module.get(LoggingService);
    logger = module.get(WINSTON_MODULE_PROVIDER);
  });

  it('Info - When called, should log the information at the correct level', async () => {
    await loggingService.info('info');

    expect(logger.info).toHaveBeenCalledWith('info');
  });

  it('Error - When called, should log the information at the correct level', async () => {
    await loggingService.error('error');

    expect(logger.error).toHaveBeenCalledWith('error');
  });
});
