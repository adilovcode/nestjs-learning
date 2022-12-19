import { Module } from '@nestjs/common';
import { ApplicationModule } from 'src/application/application.module';
import { EventControllerController } from './event.controller';

@Module({
  imports: [ApplicationModule],
  controllers: [EventControllerController],
})
export class ControllersModule {}
