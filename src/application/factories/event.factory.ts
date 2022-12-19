import { Injectable } from "@nestjs/common";
import { CreateEventDto } from "src/domain/dtos/create-event.dto";
import { EventEntity } from "src/domain/entities/event.entity";
import { plainToClass } from 'class-transformer'


@Injectable()
export class EventFactory {
    createNewEvent(createEventDto: CreateEventDto): EventEntity {
        return plainToClass(EventEntity, createEventDto);
    }

}