import {Module} from '@nestjs/common';
import {WinstonModule} from 'nest-winston';
import {ConfigModule} from '@nestjs/config';
import winstonConfig from './common/winston.logger';
import {HealthModule} from './modules/health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HealthModule,
    WinstonModule.forRoot(winstonConfig)
  ]
})
export class AppModule {}
