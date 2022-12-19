import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { addDays, getDay } from "date-fns";
import { DailySlotsGeneratorDto } from "src/domain/dtos/daily-slot-generator.dto";
import { BookingEntity } from "src/domain/entities/booking.entities";
import { EventEntity } from "src/domain/entities/event.entity";
import { formatToTime } from "../helpers";
import { IBookingRepository } from "../repositories/bookings.repository";
import { ITimeOffRepository } from "../repositories/time-off.repository";
import { IWorkingDayRepository } from "../repositories/working-day.repository";
import { DailySlotsGenerator } from "./daily-slots-generator.service";

@Injectable()
export class AvailableSlotChecker {
    constructor(
        private readonly workingDayRepository: IWorkingDayRepository,
        private readonly bookingRepository: IBookingRepository,
        private readonly timeOffRepository: ITimeOffRepository,
        private readonly dailySlotGenerator: DailySlotsGenerator
    ) {}

    async check(bookingDate: Date, event: EventEntity, slotsCount: number): Promise<boolean> {

        this.validateIfiIEventDateRange(event.bookableInAdvance, bookingDate);

        const workingDay = await this.workingDayRepository.fetchByWeekDayAndEventId(
            event.id,
            getDay(bookingDate)
        );

        if (!workingDay) {
            throw new HttpException('Not working day', HttpStatus.BAD_REQUEST);
        }

        const bookings = await this.bookingRepository.fetchByDateEventId(event.id, bookingDate);
        const timeOffs = await this.timeOffRepository.fetchByEventId(event.id);
        
        const dailySlotGeneratorDto: DailySlotsGeneratorDto = {
            startTime: workingDay.startTime,
            endTime: workingDay.endTime,
            duration: event.duration,
            timeOffs,
            bookings: [...bookings, ...this.generateDummyBookings(slotsCount - 1, bookingDate)],
            acceptsPerSlot: event.acceptsPerSlot,
            isToday: getDay(new Date()) === workingDay.day
        };

        const slots = this.dailySlotGenerator.generate(dailySlotGeneratorDto);

        return slots.indexOf(formatToTime(bookingDate)) > -1;
    }

    private validateIfiIEventDateRange(bookableInAdvance: number, bookingDate: Date): void {
        if (!this.isInRangeOfHours(new Date(), addDays(new Date(), bookableInAdvance), bookingDate)) {
            throw new HttpException("Out of event date range", HttpStatus.BAD_REQUEST);
        }
    }

    private isInRangeOfHours(startTime: Date, endTime: Date, checkingTime: Date): boolean {
        return checkingTime <= endTime && checkingTime >= startTime;
    }

    private generateDummyBookings(slotsCount: number, bookingDate: Date): BookingEntity[] {
        return Array(slotsCount).fill(1).map(() => ({
            eventId: '1',
            firstName: 'John',
            lastName: 'Doe',
            email: 'johndoe@gmail.com',
            bookingDate: bookingDate.toUTCString()
        }));
    }
}