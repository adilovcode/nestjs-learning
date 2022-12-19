import { Injectable } from "@nestjs/common";
import { DailySlotsGeneratorDto } from "src/domain/dtos/daily-slot-generator.dto";
import { Slot } from "src/domain/value-objects";
import { Hour } from "src/domain/value-objects/hour";
import { SlotsGenerator } from "./slots-generator.service";
import { addMinutes, format } from 'date-fns';

@Injectable()
export class DailySlotsGenerator {

    private dailySlotsGeneratorDto: DailySlotsGeneratorDto;

    constructor(
        private readonly slotsGenerator: SlotsGenerator
    ) {}
    
    generate(dailySlotsGeneratorDto: DailySlotsGeneratorDto): Slot[] {
        this.dailySlotsGeneratorDto = dailySlotsGeneratorDto;
        
        const slots: Slot[] = [];

        let start = dailySlotsGeneratorDto.startTime;

        let busyHours: Hour[] = [
            ...this.makeHoursFromTimeOffs(),
            ...this.filterBookingHoursWithAcceptsPerSlot()
        ];

        busyHours = this.sortHours(busyHours);

        busyHours.forEach(busyHour => {
         
            slots.push(
                ...this.slotsGenerator.generate(start, busyHour.startTime, dailySlotsGeneratorDto.duration)
            );
        
            start = busyHour.endTime;
        });

        slots.push(
            ...this.slotsGenerator.generate(start, dailySlotsGeneratorDto.endTime, dailySlotsGeneratorDto.duration)
        );

        return dailySlotsGeneratorDto.isToday ? this.filterSlotsByCurrentDate(slots) : slots;
    }


    private makeHoursFromTimeOffs(): Hour[] {
        return this.dailySlotsGeneratorDto.timeOffs.map(timeOff => ({
            startTime: timeOff.startTime,
            endTime: timeOff.endTime
        }));
    }

    private filterBookingHoursWithAcceptsPerSlot(): Hour[] {
        const separator = '-';

        const mutatedData = this.dailySlotsGeneratorDto.bookings.map(booking => {
            const startTime = format(new Date(booking.bookingDate), 'HH:mm');
            const endTime = format(addMinutes(new Date(booking.bookingDate), this.dailySlotsGeneratorDto.duration), 'HH:mm');

            return startTime + separator + endTime;
        });

        let duplication: {[key: string]: number} = {};

        for (let i = 0; i < mutatedData.length; i++) {

            duplication[mutatedData[i]]
                ? duplication[mutatedData[i]]++
                : duplication[mutatedData[i]] = 1;

        }

        const filteredData = Object.keys(duplication).filter(key => duplication[key] >= this.dailySlotsGeneratorDto.acceptsPerSlot);

        return filteredData.map((item: string) => {
            const hours = item.split(separator);

            return {
                startTime: hours[0],
                endTime: hours[1]
            }
        });
    }

    private filterSlotsByCurrentDate(slots: Slot[]): Slot[] {
        return slots.filter(slot => slot > format(new Date(), 'H:mm'));
    }

    private sortHours(hours: Hour[]): Hour[] {
        return hours.sort((f, s) => f.startTime > s.startTime ? 0 : -1);
    }
}