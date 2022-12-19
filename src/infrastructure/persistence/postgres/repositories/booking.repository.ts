import { InjectRepository } from "@nestjs/typeorm";
import { addDays, format } from "date-fns";
import { IBookingRepository } from "src/application/repositories/bookings.repository";
import { BookingEntity } from "src/domain/entities/booking.entities";
import { Between, Repository } from "typeorm";
import { Booking } from "../models/booking";

export class BookingRepository implements IBookingRepository {
    constructor(
        @InjectRepository(Booking)
        private readonly _repository: Repository<Booking>,
    ) {}

    async fetchByEventId(eventId: string): Promise<BookingEntity[]> {
        return (await this._repository.find( {where: {eventId}} )).map(booking => booking.toDomainEntity());
    }

    async fetchByDateEventId(eventId: string, date: Date): Promise<BookingEntity[]> {
        const dateAfter = format(date, 'yyyy-MM-dd');
        const dateBefore = format(addDays(date, 1), 'yyyy-MM-dd');

        return (await this._repository.find({
            where: {
                bookingDate: Between(dateAfter, dateBefore),
                eventId
            }
        })).map(booking => booking.toDomainEntity())
    }
    
    async store(booking: BookingEntity): Promise<void> {
        const event = this._repository.create(booking);
        this._repository.save(event);
    }
}