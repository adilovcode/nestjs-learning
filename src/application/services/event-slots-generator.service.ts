import { Injectable } from "@nestjs/common";
import { DailySlotsGeneratorDto } from "src/domain/dtos/daily-slot-generator.dto";
import { EventEntity } from "src/domain/entities/event.entity";
import { WorkingDayWithSlots } from "src/domain/value-objects/working-daya-slots";
import { ITimeOffRepository } from "../repositories/time-off.repository";
import { DailySlotsGenerator } from "./daily-slots-generator.service";
import { WorkingDaysGenerator } from "./working-day-generator.service";
import { isToday } from 'date-fns';

@Injectable()
export class EventSlotsGenerator {
    constructor(
        private readonly dailySlotGenerator: DailySlotsGenerator,
        private readonly workingDayGenerator: WorkingDaysGenerator,
        private readonly timeOffRepository: ITimeOffRepository
    ) {}

    async generate(event: EventEntity): Promise<WorkingDayWithSlots[]> {
        const availableWorkingDays = await this.workingDayGenerator.generate(event);
        const timeOffs = await this.timeOffRepository.fetchByEventId(event.id);

        const response: WorkingDayWithSlots[] = [];

        availableWorkingDays.forEach(availableWorkingDay => {
            const dailySlotGeneratorDto: DailySlotsGeneratorDto = {
                startTime: availableWorkingDay.startTime,
                endTime: availableWorkingDay.endTime,
                duration: event.duration,
                timeOffs: timeOffs,
                acceptsPerSlot: event.acceptsPerSlot,
                isToday: isToday(new Date(availableWorkingDay.date))
            };

            const slots = this.dailySlotGenerator.generate(dailySlotGeneratorDto);

            response.push({
                workingDay: availableWorkingDay,
                slots
            })
        });

        return response;
    }
}