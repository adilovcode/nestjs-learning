import { TimeOffEntity } from "../entities/time-off.entity";
import { Minute } from "../value-objects";

export class DailySlotsGeneratorDto {
    startTime: string;

    endTime: string;
    
    duration: Minute;

    timeOffs: TimeOffEntity[];
    // private readonly array $bookings,
    acceptsPerSlot: number;

    isToday: boolean = false
}