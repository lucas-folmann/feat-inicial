import {Module} from '@nestjs/common';
import {TerminusModule} from '@nestjs/terminus';
import {AppHealthIndicator} from './app.health';
import {HealthController} from './health.controller';

@Module({
  controllers: [HealthController],
  imports: [TerminusModule],
  providers: [AppHealthIndicator]
})
export class HealthModule {}
