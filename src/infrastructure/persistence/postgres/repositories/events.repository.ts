import { IEventsRepository } from "src/application/repositories/events.repository";
import { EventEntity } from "src/domain/entities/event.entity";
import { Repository } from "typeorm";
import { Event } from "../models/event";
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from "@nestjs/common";

export class EventsRepository implements IEventsRepository {

    constructor(
        @InjectRepository(Event)
        private readonly _repository: Repository<Event>,
    ) {}

    async create(eventEntity: EventEntity): Promise<EventEntity> {
        const event = this._repository.create(eventEntity);
        
        return (await this._repository.save(event)).toDomainEntity();
    }
    
    async update(eventEntity: EventEntity): Promise<EventEntity> {
        const event = await this._repository.preload({ ...eventEntity, id: eventEntity.id });

        if (!event) {
            throw new NotFoundException();
        }
        return (await this._repository.save(event)).toDomainEntity();
    }
    
    async delete(id: string): Promise<void> {
        const event = await this._repository.findOneOrFail( {where: {id}} )

        this._repository.remove(event);
    }

    async fetchById(id: string): Promise<EventEntity> {
        const event = await this._repository.findOne( {where: {id}} )

        if (!event) {
            throw new NotFoundException();
        }

        return event.toDomainEntity();
    }
}