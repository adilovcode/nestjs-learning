import { plainToClass } from "class-transformer";
import { EventEntity } from "src/domain/entities/event.entity";
import { TimeOffEntity } from "src/domain/entities/time-off.entity";
import { TimeOff } from "src/domain/value-objects/time-off";

export class TimeOffsFactory {
    createTimeOffs(timeOffs: TimeOff[], event: EventEntity): TimeOffEntity[] {
        return timeOffs.map(timeOff => plainToClass(TimeOffEntity, { ...timeOff, event }));
    }
}