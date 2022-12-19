import { Module } from '@nestjs/common';
import { ApplicationModule } from 'src/application/application.module';
import { BookingController } from './booking.controller';
import { EventControllerController } from './event.controller';

@Module({
  imports: [ApplicationModule],
  controllers: [EventControllerController, BookingController],
})
export class ControllersModule {}
