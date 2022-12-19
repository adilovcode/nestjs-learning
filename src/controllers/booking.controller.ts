import { Body, Controller, Post } from "@nestjs/common";
import { BookingCreatorUseCase } from "src/application/use-cases/booking-creator.use-case";
import { CreateBookingDto } from "src/domain/dtos/create-booking.dto";

@Controller('bookings')
export class BookingController {

    constructor(
        private readonly bookingCreatorUseCase: BookingCreatorUseCase
    ) {}

    @Post()
    async store(@Body() createBookingDto: CreateBookingDto) {
        await this.bookingCreatorUseCase.perform(createBookingDto);
    }
}