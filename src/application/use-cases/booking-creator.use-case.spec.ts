import { Test, TestingModule } from "@nestjs/testing";
import { CreateBookingDto } from "src/domain/dtos/create-booking.dto";
import { BookingFactory } from "../factories/booking.factory";
// import { EventEntity } from "src/domain/entities/event.entity";
import { IBookingRepository } from "../repositories/bookings.repository";
import { IEventsRepository } from "../repositories/events.repository";
import { AvailableSlotChecker } from "../services/availabe-slot-checker.service";
import { BookingCreatorUseCase } from "./booking-creator.use-case";

const bookingCreatorDto: CreateBookingDto = {
    personalInformation: [
        {
            email: "nike@gmail.com",
            firstName: "Nike",
            lastName: "Jackson"
        },
        {
            email: "adilovcode@gmail.com",
            firstName: "John",
            lastName: "Williams"
        }
    ],
    bookingDate: "2022-11-24 17:10",
    eventId: "1"
};

const event = {
    id: '1',
    bufferTime: 5,
    bookableInAdvance: 0,
    acceptsPerSlot: 2,
    name: 'Every day meeting',
    description: 'Text long',
    duration: 15,
};

const expectedBooking1 = {
    email: "nike@gmail.com",
    firstName: "Nike",
    lastName: "Jackson",
    bookingDate: "2022-11-24 17:10",
    eventId: "1"
}

const expectedBooking2 = {
    email: "adilovcode@gmail.com",
    firstName: "John",
    lastName: "Williams",
    bookingDate: "2022-11-24 17:10",
    eventId: "1"
}

type EventMockRepository = Partial<Record<keyof IEventsRepository, jest.Mock>>;
type BookingMockRepository = Partial<Record<keyof IBookingRepository, jest.Mock>>;
type AvailableSlotCheckerMock = Partial<Record<keyof AvailableSlotChecker, jest.Mock>>;

const eventRepositoryMock: EventMockRepository = {
    fetchById: jest.fn(),
}

const bookingRepositoryMock: BookingMockRepository = {
    store: jest.fn()
}

const availableSlotCheckerMock: AvailableSlotCheckerMock = {
    check: jest.fn()
}

describe('Testing booking-creator', () => {

    let bookingCreator: BookingCreatorUseCase;
    let eventRepository: EventMockRepository;
    let bookingRepository: BookingMockRepository;
    let availableSlotChecker: AvailableSlotCheckerMock;

    beforeEach(async () => {
    
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                BookingCreatorUseCase,
                BookingFactory,
                {
                    provide: AvailableSlotChecker,
                    useValue: availableSlotCheckerMock
                },
                {
                    provide: IEventsRepository,
                    useValue: eventRepositoryMock
                },
                {
                    provide: IBookingRepository,
                    useValue: bookingRepositoryMock
                },
            ]
        }).compile();

        bookingCreator = module.get<BookingCreatorUseCase>(BookingCreatorUseCase);
        eventRepository = module.get<EventMockRepository>(IEventsRepository);
        bookingRepository = module.get<BookingMockRepository>(IBookingRepository);
        availableSlotChecker = module.get<AvailableSlotCheckerMock>(AvailableSlotChecker);
    });


    describe('perform', () => {
        it('should fail if slots are not available', async () => {
            eventRepository.fetchById?.mockReturnValue(event);

            availableSlotChecker.check?.mockReturnValue(false);

            await expect(
                async () => await bookingCreator.perform(bookingCreatorDto)
            ).rejects.toThrow('Slots are not available')
            
            expect(availableSlotChecker.check).toBeCalledTimes(1);
            expect(eventRepository.fetchById).toBeCalledTimes(1);

            expect(eventRepository.fetchById).toBeCalledWith(bookingCreatorDto.eventId)
            expect(availableSlotChecker.check).toBeCalledWith(
                new Date(bookingCreatorDto.bookingDate),
                event,
                bookingCreatorDto.personalInformation.length
            );            
        });

        it('should store if slots are available', async () => {
            eventRepository.fetchById?.mockReturnValue(event);
            availableSlotChecker.check?.mockReturnValue(true);

            await bookingCreator.perform(bookingCreatorDto);

            expect(availableSlotChecker.check).toBeCalledTimes(2);
            expect(eventRepository.fetchById).toBeCalledTimes(2);

            expect(eventRepository.fetchById).toBeCalledWith(bookingCreatorDto.eventId)
            expect(availableSlotChecker.check).toBeCalledWith(
                new Date(bookingCreatorDto.bookingDate),
                event,
                bookingCreatorDto.personalInformation.length
            );

            expect(bookingRepository.store).toBeCalledWith(expectedBooking1);
            expect(bookingRepository.store).toBeCalledWith(expectedBooking2);
        });

    });

});