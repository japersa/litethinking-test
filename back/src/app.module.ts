import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import configuration from '../config/configuration';
import { ConfigModule } from '@nestjs/config';
import { CompanyModule } from './infrastructure/modules/company.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    ScheduleModule.forRoot(),
    CompanyModule,
  ],
  providers: [AppService],
})
export class AppModule {}
