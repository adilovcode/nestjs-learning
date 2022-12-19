import { EventEntity } from "./event.entity";

export class TimeOffEntity {
    id: string;

    title: string;

    event?: EventEntity;

    eventId: string;

    startTime: string;

    endTime: string;
}