import { Injectable } from "@nestjs/common";
import { CreateEventDto } from "src/domain/dtos/create-event.dto";
import { TimeOff } from "src/domain/value-objects/time-off";
import { EventFactory } from "../factories/event.factory";
import { TimeOffsFactory } from "../factories/time-offs.factory";
import { WorkingDaysFactory } from "../factories/working-days.factory";
import { IEventsRepository } from "../repositories/events.repository";
import { ITimeOffRepository } from "../repositories/time-off.repository";
import { IWorkingDayRepository } from "../repositories/working-day.repository";

@Injectable()
export class CreateEventUseCase {

    private _createEventDto: CreateEventDto;

    constructor(
        private readonly eventFactory: EventFactory,
        private readonly timeOffFactory: TimeOffsFactory,
        private readonly workingDayFactory: WorkingDaysFactory,
        private readonly eventRepository: IEventsRepository,
        private readonly timeOffRepository: ITimeOffRepository,
        private readonly workingDayRepository: IWorkingDayRepository,
    ) {}

    async perform(createEventDto: CreateEventDto): Promise<void> {
        this._createEventDto = createEventDto;

        this.validateTimeOffs();

        const event = await this.eventRepository.create(
            this.eventFactory.createNewEvent(createEventDto)
        );

        this.timeOffRepository.insert(
            this.timeOffFactory.createTimeOffs(createEventDto.timeOffs, event)
        );

        this.workingDayRepository.insert(
            this.workingDayFactory.createWorkingDays(createEventDto, event)
        );
    }

    private validateTimeOffs(): void {
        this._createEventDto.timeOffs.forEach((oTimeOff, oI) => {
            this._createEventDto.timeOffs.forEach((tTimeOff, oT) => {
                if (oI !== oT && this.doesTimeOffsHaveConflict(oTimeOff, tTimeOff)) {
                    throw "Time-off has conflicts";
                }
            }); 
        });
    }

    private doesTimeOffsHaveConflict(first: TimeOff, second: TimeOff): boolean {
        return (first.startTime <= second.startTime && first.endTime >= second.startTime) ||
        (first.startTime <= second.endTime && first.endTime >= second.endTime);
    }
}