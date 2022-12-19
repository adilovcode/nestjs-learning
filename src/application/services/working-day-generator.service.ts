import { Injectable } from '@nestjs/common';
import { differenceInDays, addDays, getDay } from 'date-fns'
import { EventEntity } from "src/domain/entities/event.entity";
import { WorkingDayEntity } from 'src/domain/entities/working-day.entity';
import { WorkingDay } from 'src/domain/value-objects/working-day';
import { IWorkingDayRepository } from '../repositories/working-day.repository';

@Injectable()
export class WorkingDaysGenerator {
    
    constructor(
        private readonly workingDayRepository: IWorkingDayRepository
    ) {}

    async generate(event: EventEntity) {
        const workingDays = await this.workingDayRepository.fetchByEventId(event.id);

        return this.filterDateRangeByAvailableWorkingDays(event, workingDays);
    }

    private filterDateRangeByAvailableWorkingDays(event: EventEntity, workingDays: WorkingDayEntity[]): WorkingDay[] {
        const availableWorkingDays: WorkingDay[] = [];
        
        const dateRange = differenceInDays(addDays(new Date(), event.bookableInAdvance), new Date());

        for (let i = 0; i < dateRange; i++) {
            
            workingDays.forEach(workingDay => {
            
                if (getDay(addDays(new Date(), i)) == workingDay.day) {
                    availableWorkingDays.push({
                        date: addDays(new Date(), i).toString(),
                        startTime: workingDay.startTime,
                        endTime: workingDay.endTime
                    });
                }
            });
        }

        return availableWorkingDays;
    }
}