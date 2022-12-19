import { Injectable } from "@nestjs/common";
import { CreateBookingDto } from "src/domain/dtos/create-booking.dto";
import { BookingEntity } from "src/domain/entities/booking.entities";

@Injectable()
export class BookingFactory {
    createBookings(createBookingDto: CreateBookingDto): BookingEntity[] {
        return createBookingDto.personalInformation.map(personalInfo => ({
            firstName: personalInfo.firstName,
            email: personalInfo.email,
            lastName: personalInfo.lastName,
            bookingDate: createBookingDto.bookingDate,
            eventId: createBookingDto.eventId,
        }));
    }
}