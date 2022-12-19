import { Hour } from "../value-objects/hour";
import { EventEntity } from "./event.entity";

export class TimeOffEntity {
    id: string;

    title: string;

    event?: EventEntity;

    eventId: string;

    startTime: string;

    endTime: string;

    toHour(): Hour {
        return {
            startTime: this.startTime,
            endTime: this.endTime
        };
    }
}