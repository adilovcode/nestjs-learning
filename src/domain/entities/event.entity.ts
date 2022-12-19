import { TimeOffEntity } from "./time-off.entity";
import { WorkingDayEntity } from "./working-day.entity";

export class EventEntity {
    id: string;

    name: string;

    description: string;

    duration: number;

    bufferTime: number = 0;

    bookableInAdvance: number = 1;

    acceptsPerSlot: number = 1;

    timeOffs?: TimeOffEntity[];

    workingDays?: WorkingDayEntity[];
}
