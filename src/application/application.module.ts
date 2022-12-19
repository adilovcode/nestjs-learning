import { Module } from '@nestjs/common';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { EventFactory } from './factories/event.factory';
import { TimeOffsFactory } from './factories/time-offs.factory';
import { WorkingDaysFactory } from './factories/working-days.factory';
import { DailySlotsGenerator } from './services/daily-slots-generator.service';
import { EventSlotsGenerator } from './services/event-slots-generator.service';
import { SlotsGenerator } from './services/slots-generator.service';
import { WorkingDaysGenerator } from './services/working-day-generator.service';
import { CreateEventUseCase } from './use-cases/create-event.use-case';
import { EventFetcherUseCase } from './use-cases/event-fetcher.use-case';

@Module({
    imports: [
        InfrastructureModule
    ],
    providers: [
        EventFetcherUseCase,
        CreateEventUseCase,
        EventFactory,
        WorkingDaysFactory,
        TimeOffsFactory,
        SlotsGenerator,
        DailySlotsGenerator,
        WorkingDaysGenerator,
        EventSlotsGenerator,
    ],
    exports: [
        EventFetcherUseCase,
        CreateEventUseCase
    ]
})
export class ApplicationModule {}
