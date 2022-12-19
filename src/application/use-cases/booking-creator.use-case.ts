import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateBookingDto } from "src/domain/dtos/create-booking.dto";
import { BookingFactory } from "../factories/booking.factory";
import { IBookingRepository } from "../repositories/bookings.repository";
import { IEventsRepository } from "../repositories/events.repository";
import { AvailableSlotChecker } from "../services/availabe-slot-checker.service";

@Injectable()
export class BookingCreatorUseCase {

    constructor(
        private readonly availableSlotChecker: AvailableSlotChecker,
        private readonly eventRepository: IEventsRepository,
        private readonly bookingRepository: IBookingRepository,
        private readonly bookingFactory: BookingFactory
    ) {}

    async perform(createBookingDto: CreateBookingDto): Promise<void> {
        const event = await this.eventRepository.fetchById(createBookingDto.eventId);

        const isAvailable = await this.availableSlotChecker.check(
            new Date(createBookingDto.bookingDate),
            event,
            createBookingDto.personalInformation.length
        );

        if (!isAvailable) {
            throw new HttpException("Slots are not available", HttpStatus.BAD_REQUEST);
        }

        this.bookingFactory
            .createBookings(createBookingDto)
            .map(booking => this.bookingRepository.store(booking));
    }
}