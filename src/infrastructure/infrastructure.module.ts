import { Module } from '@nestjs/common';
import { IEventsRepository } from 'src/application/repositories/events.repository';
import { EventsRepository } from './persistence/postgres/repositories/events.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOption } from 'src/config/postgres';
import { Event } from './persistence/postgres/models/event';
import { TimeOff } from './persistence/postgres/models/time-off';
import { IWorkingDayRepository } from 'src/application/repositories/working-day.repository';
import { WorkingDayRepository } from './persistence/postgres/repositories/working-day.repository';
import { ITimeOffRepository } from 'src/application/repositories/time-off.repository';
import { TimeOffRepository } from './persistence/postgres/repositories/time-offs.repository';
import { WorkingDay } from './persistence/postgres/models/working-day';
import { IDatabaseTransaction } from 'src/application/contracts/database-transaction.contract';
import { QueryRunnerTransaction } from './persistence/postgres/utils/query-runner-transaction.utils';
import { ClsModule } from 'nestjs-cls';

@Module({
    imports: [
        TypeOrmModule.forRoot(dataSourceOption),
        TypeOrmModule.forFeature([Event, TimeOff, WorkingDay]),
        ClsModule.forRoot({
            global: true,
            middleware: { mount: true },
        }),
    ],
    providers: [
        {
            provide: IEventsRepository,
            useClass: EventsRepository
        },
        {
            provide: IWorkingDayRepository,
            useClass: WorkingDayRepository
        },
        {
            provide: ITimeOffRepository,
            useClass: TimeOffRepository
        },
        {
            provide: IDatabaseTransaction,
            useClass: QueryRunnerTransaction
        },
        QueryRunnerTransaction
    ],
    exports: [
        IEventsRepository,
        IWorkingDayRepository,
        ITimeOffRepository,
        IDatabaseTransaction,
        QueryRunnerTransaction
    ]
})
export class InfrastructureModule {
}
