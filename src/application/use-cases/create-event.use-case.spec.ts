import { Test, TestingModule } from "@nestjs/testing";
import { CreateEventDto } from "src/domain/dtos/create-event.dto";
import { EventEntity } from "src/domain/entities/event.entity";
import { TimeOffEntity } from "src/domain/entities/time-off.entity";
import { WorkingDayEntity } from "src/domain/entities/working-day.entity";
import { EventFactory } from "../factories/event.factory";
import { TimeOffsFactory } from "../factories/time-offs.factory";
import { WorkingDaysFactory } from "../factories/working-days.factory";
import { IEventsRepository } from "../repositories/events.repository";
import { ITimeOffRepository } from "../repositories/time-off.repository";
import { IWorkingDayRepository } from "../repositories/working-day.repository";
import { CreateEventUseCase } from "./create-event.use-case";

const eventCreatorDto: CreateEventDto = {
    name: "Every day meeting",
    description: "Text long",
    duration: 15,
    acceptsPerSlot: 2,
    bookableInAdvance: 0,
    bufferTime: 5,
    workingDays: [
        1,2,3,4,5,6
    ],
    workingHours: {
        startTime: "08:00",
        endTime: "20:00"
    },
    overrideDays: [
        {
            day: 6,
            startTime: "10:00",
            endTime: "22:00"
        }
    ],
    timeOffs: [
        {
            title: "Lunch break",
            startTime: "12:00",
            endTime: "13:00"
        }
    ]
};

const expectedEvent = {
    bufferTime: 5,
    bookableInAdvance: 0,
    acceptsPerSlot: 2,
    name: 'Every day meeting',
    description: 'Text long',
    duration: 15,
}

const timeOffs = [
    {
        title: 'Lunch break',
        startTime: '12:00',
        endTime: '13:00',
    }   
]

type EventMockRepository = Partial<Record<keyof IEventsRepository, jest.Mock>>;
type TimeOffMockRepository = Partial<Record<keyof ITimeOffRepository, jest.Mock>>;
type WorkingMockRepository = Partial<Record<keyof IWorkingDayRepository, jest.Mock>>;

const eventRepositoryMock: EventMockRepository = {
    create: jest.fn(),
    delete: jest.fn()
}

const timeOffRepositoryMock: TimeOffMockRepository = {
    insert: jest.fn()
}

const workingDayRepositoryMock: WorkingMockRepository = {
    insert: jest.fn()
}

describe('Testing event-creator', () => {

    let eventCreator: CreateEventUseCase;
    let eventRepository: EventMockRepository;
    let timeOffRepository: TimeOffMockRepository;
    let workingDayRepository: WorkingMockRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateEventUseCase,
                EventFactory,
                TimeOffsFactory,
                WorkingDaysFactory,
                {
                    provide: IEventsRepository,
                    useValue: eventRepositoryMock
                },
                {
                    provide: ITimeOffRepository,
                    useValue: timeOffRepositoryMock
                },
                {
                    provide: IWorkingDayRepository,
                    useValue: workingDayRepositoryMock
                },
            ],
        })
        .compile();

        eventCreator = module.get<CreateEventUseCase>(CreateEventUseCase);
        eventRepository = module.get<EventMockRepository>(IEventsRepository);
        timeOffRepository = module.get<TimeOffMockRepository>(ITimeOffRepository);
        workingDayRepository = module.get<WorkingMockRepository>(IWorkingDayRepository);
    });

    it('should be defined', () => {
        expect(eventCreator).toBeDefined();
    });

    describe('perform', () => {
        it('should not pass time-offs validation', async () => {

            const eventCreatorDtoClone: CreateEventDto =  { 
                ...eventCreatorDto,
                timeOffs: [
                    ...eventCreatorDto.timeOffs,
                    {
                        title: "Lunch break",
                        startTime: "12:30",
                        endTime: "14:00"
                    }
                ]
            };

            expect(async () => {
                await eventCreator.perform(eventCreatorDtoClone);
            })
            .rejects
            .toThrowError('Time-off has conflicts');
        });

        it("should store event", async () => {
            
            await eventCreator.perform(eventCreatorDto);

            expect(eventRepository.create?.mock.calls.length).toBe(1);
            expect(eventRepository.create?.mock.calls[0][0]).toMatchObject(expectedEvent)
            expect(eventRepository.create?.mock.calls[0][0]).toBeInstanceOf(EventEntity);
            
            expect(timeOffRepository.insert?.mock.calls.length).toBe(1);
            expect(timeOffRepository.insert?.mock.calls[0][0]).toMatchObject(timeOffs)
            expect(timeOffRepository.insert?.mock.calls[0][0]).toBeInstanceOf(Array<TimeOffEntity>);

            expect(workingDayRepository.insert?.mock.calls.length).toBe(1);
            expect(workingDayRepository.insert?.mock.calls[0][0]).toBeInstanceOf(Array<WorkingDayEntity>);
        });
    })
});