import { Injectable } from "@nestjs/common";
import { DailySlotsGeneratorDto } from "src/domain/dtos/daily-slot-generator.dto";
import { Slot } from "src/domain/value-objects";
import { Hour } from "src/domain/value-objects/hour";
import { SlotsGenerator } from "./slots-generator.service";
import { format } from 'date-fns';
import { TimeOffEntity } from "src/domain/entities/time-off.entity";

@Injectable()
export class DailySlotsGenerator {
    constructor(
        private readonly slotsGenerator: SlotsGenerator
    ) {}
    
    generate(dailySlotsGeneratorDto: DailySlotsGeneratorDto): Slot[] {
        const slots: Slot[] = [];

        let start = dailySlotsGeneratorDto.startTime;

        const busyHours: Hour[] = [
            ...this.makeHoursFromTimeOffs(dailySlotsGeneratorDto.timeOffs)
        ];

        busyHours.forEach(busyHour => {
         
            slots.push(
                ...this.slotsGenerator.generate(start, busyHour.startTime, dailySlotsGeneratorDto.duration)
            );
        
            start = busyHour.endTime;
        });

        slots.push(
            ...this.slotsGenerator.generate(start, dailySlotsGeneratorDto.endTime, dailySlotsGeneratorDto.duration)
        );

        return dailySlotsGeneratorDto.isToday ? this.filterSlots(slots) : slots;
    }

    private makeHoursFromTimeOffs(timeOffs: TimeOffEntity[]): Hour[] {
        return timeOffs.map(timeOff => timeOff.toHour());
    }

    private filterSlots(slots: Slot[]): Slot[] {
        return slots.filter(slot => slot > format(new Date(), 'H:mm'));
    }
}