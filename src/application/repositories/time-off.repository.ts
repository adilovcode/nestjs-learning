import { TimeOffEntity } from "src/domain/entities/time-off.entity";

export abstract class ITimeOffRepository {
    
    abstract insert(timeOffs: TimeOffEntity[]): Promise<void>;

    abstract fetchByEventId(eventId: string): Promise<TimeOffEntity[]>;
}