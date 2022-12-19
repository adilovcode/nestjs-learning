import { EventEntity } from "src/domain/entities/event.entity";

export abstract class IEventsRepository {
    abstract fetchById(id: string): Promise<EventEntity>;

    abstract create(event: EventEntity): Promise<EventEntity>;

    abstract update(event: EventEntity): Promise<EventEntity>;

    abstract delete(id: string): Promise<void>
}
