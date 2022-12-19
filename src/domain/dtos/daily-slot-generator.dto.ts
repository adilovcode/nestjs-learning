import { BookingEntity } from "../entities/booking.entities";
import { TimeOffEntity } from "../entities/time-off.entity";
import { Minute } from "../value-objects";

export class DailySlotsGeneratorDto {
    readonly startTime: string;

    readonly endTime: string;
    
    readonly duration: Minute;

    readonly timeOffs: TimeOffEntity[];
    
    readonly bookings: BookingEntity[];
    
    readonly acceptsPerSlot: number;

    readonly isToday: boolean = false
}