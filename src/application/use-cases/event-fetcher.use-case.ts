import { Injectable } from "@nestjs/common";
import { EventEntity } from "src/domain/entities/event.entity";
import { WorkingDayWithSlots } from "src/domain/value-objects/working-daya-slots";
import { IEventsRepository } from "../repositories/events.repository";
import { EventSlotsGenerator } from "../services/event-slots-generator.service";

@Injectable()
export class EventFetcherUseCase {

    constructor(
        private readonly eventRepository: IEventsRepository,
        private readonly eventSlotGenerator: EventSlotsGenerator,
    ) {}

    async perform(id: string): Promise<{event: EventEntity, days: WorkingDayWithSlots[]}> {
        const event = await this.eventRepository.fetchById(id);

        const days = await this.eventSlotGenerator.generate(event);

        return {
            event,
            days
        };
    }
}
