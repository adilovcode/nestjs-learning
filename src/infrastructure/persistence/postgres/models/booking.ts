import { plainToClass } from "class-transformer";
import { BookingEntity } from "src/domain/entities/booking.entities";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('bookings')
export class Booking {

    @PrimaryGeneratedColumn('increment')
    id: string;

    @Column()
    eventId: string;
    
    @Column()
    firstName: string;
    
    @Column()
    lastName: string;
    
    @Column()
    email: string;
    
    @Column({ type: 'timestamp' })
    bookingDate: string;

    toDomainEntity(): BookingEntity {
        return plainToClass(BookingEntity, this);
    }
}