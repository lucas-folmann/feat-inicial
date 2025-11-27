import {Controller, Get} from '@nestjs/common';
import {HealthCheck, HealthCheckService} from '@nestjs/terminus';
import {AppHealthIndicator} from './app.health';

@Controller(['healthcheck'])
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly appHealthIndicator: AppHealthIndicator
  ) {}

  @Get()
  @HealthCheck()
  public async check() {
    return {status: 'ok'};
  }

  @Get('/complete')
  public healthCheckComplete() {
    return {
      meta: {
        name: '@{{parameters.component}}',
        description: '{{parameters.appDescription}}',
        version: '1.0.0',
        uptime: process.uptime(),
        nodeVersion: process.version
      },
      dependencies: [],
      status: 'ok'
    };
  }
}
