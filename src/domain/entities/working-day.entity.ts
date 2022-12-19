import { EventEntity } from "./event.entity";

export class WorkingDayEntity {
    id?: string

    day: number;
    
    startTime: string;

    endTime: string;

    event?: EventEntity;
}