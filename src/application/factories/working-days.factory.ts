import { CreateEventDto } from "src/domain/dtos/create-event.dto";
import { EventEntity } from "src/domain/entities/event.entity";
import { WorkingDayEntity } from "src/domain/entities/working-day.entity";

export class WorkingDaysFactory {
    createWorkingDays(createEventDto: CreateEventDto, event: EventEntity): WorkingDayEntity[] {
        const workingHours: WorkingDayEntity[] = [];
        
        createEventDto.workingDays.forEach(workingDay => {
            workingHours[workingDay] = {
                day: workingDay,
                endTime: createEventDto.workingHours.endTime,
                startTime: createEventDto.workingHours.startTime,
                event
            };

            createEventDto.overrideDays.forEach(overrideDay => {
                
                if (workingDay === overrideDay.day) {
                    workingHours[workingDay] = {
                        day: workingDay,
                        endTime: overrideDay.endTime,
                        startTime: overrideDay.startTime,
                        event
                    };
                }
            });
        });

        return workingHours;
    }
}