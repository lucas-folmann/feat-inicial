import {TerminusModule} from '@nestjs/terminus';
import {Test, TestingModule} from '@nestjs/testing';
import {AppHealthIndicator} from '../modules/health/app.health';
import {HealthController} from '../modules/health/health.controller';

describe('HealthController', () => {
  let controller: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      imports: [TerminusModule],
      providers: [AppHealthIndicator]
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should verify application liveness', async () => {
    const expected = {
      status: 'ok'
    };

    const result = await controller.check();
    expect(result).toEqual(expected);
  });
  it('should return a complete healthcheck ', async () => {
    jest.spyOn(process, 'uptime').mockImplementation(() => 123);

    const expected = {
      meta: {
        name: '@{{parameters.component}}',
        description: '{{parameters.appDescription}}',
        version: '1.0.0',
        uptime: 123,
        nodeVersion: process.version
      },
      status: 'ok',
      dependencies: []
    };

    const result = await controller.healthCheckComplete();
    expect(result).toEqual(expected);
  });
});
