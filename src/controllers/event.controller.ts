import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateEventUseCase } from 'src/application/use-cases/create-event.use-case';
import { EventFetcherUseCase } from 'src/application/use-cases/event-fetcher.use-case';
import { CreateEventDto } from 'src/domain/dtos/create-event.dto';

@Controller('events')
export class EventControllerController {
    constructor(
        private readonly eventFetcher: EventFetcherUseCase,
        private readonly createEvent: CreateEventUseCase
    ) {}

    @Get(':id')
    async show(@Param('id') id: string) {
        return this.eventFetcher.perform(id);
    }

    @Post()
    async store(@Body() createEventDto: CreateEventDto) {
        await this.createEvent.perform(createEventDto);            
    }
}
