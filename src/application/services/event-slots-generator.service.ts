import { Injectable } from "@nestjs/common";
import { DailySlotsGeneratorDto } from "src/domain/dtos/daily-slot-generator.dto";
import { EventEntity } from "src/domain/entities/event.entity";
import { WorkingDayWithSlots } from "src/domain/value-objects/working-daya-slots";
import { ITimeOffRepository } from "../repositories/time-off.repository";
import { DailySlotsGenerator } from "./daily-slots-generator.service";
import { WorkingDaysGenerator } from "./working-day-generator.service";
import { isToday } from 'date-fns';
import { BookingEntity } from "src/domain/entities/booking.entities";
import { WorkingDay } from "src/domain/value-objects/working-day";
import { IBookingRepository } from "../repositories/bookings.repository";

@Injectable()
export class EventSlotsGenerator {

    private bookings: BookingEntity[] = [];

    constructor(
        private readonly dailySlotGenerator: DailySlotsGenerator,
        private readonly workingDayGenerator: WorkingDaysGenerator,
        private readonly timeOffRepository: ITimeOffRepository,
        private readonly bookingRepository: IBookingRepository
    ) {}

    async generate(event: EventEntity): Promise<WorkingDayWithSlots[]> {
        const availableWorkingDays = await this.workingDayGenerator.generate(event);
        const timeOffs = await this.timeOffRepository.fetchByEventId(event.id);

        this.bookings = await this.bookingRepository.fetchByEventId(event.id);

        const response: WorkingDayWithSlots[] = [];

        availableWorkingDays.forEach(availableWorkingDay => {
            const dailySlotGeneratorDto: DailySlotsGeneratorDto = {
                startTime: availableWorkingDay.startTime,
                endTime: availableWorkingDay.endTime,
                duration: event.duration,
                timeOffs: timeOffs,
                acceptsPerSlot: event.acceptsPerSlot,
                bookings: this.filterBookingsForSpecificDate(availableWorkingDay),
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

    private filterBookingsForSpecificDate(workingDay: WorkingDay): BookingEntity[] {
        return this.bookings.filter((booking, key) => {
            if (new Date(booking.bookingDate).toDateString() === workingDay.date) {
                delete this.bookings[key];
                return true;    
            }
            return false;
        });
    }
}