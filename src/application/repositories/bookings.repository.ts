import { BookingEntity } from "src/domain/entities/booking.entities";

export abstract class IBookingRepository {
    abstract fetchByEventId(eventId: string): Promise<BookingEntity[]>;

    abstract fetchByDateEventId(eventId: string, date: Date): Promise<BookingEntity[]>;

    abstract store(booking: BookingEntity): Promise<void>;
}