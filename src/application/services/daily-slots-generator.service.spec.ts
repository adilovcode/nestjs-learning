import { DailySlotsGeneratorDto } from "src/domain/dtos/daily-slot-generator.dto"
import { DailySlotsGenerator } from "./daily-slots-generator.service"
import { SlotsGenerator } from "./slots-generator.service"
import { Slot } from 'src/domain/value-objects'

const expectedSlots: Slot[] = ['08:00', '10:00', '10:30'];

const dailySlotsGeneratorDto: DailySlotsGeneratorDto = {
    startTime: "08:00",
    endTime: "11:00",
    duration: 30,
    timeOffs: [
        {
            startTime: "9:00",
            endTime: "10:00",
            title: "Launch time",
            eventId: "1",
            id: '2'
        }
    ],
    bookings: [
        {
            bookingDate: '2022-12-19 08:30',
            email: 'test@gmail.com',
            lastName: 'Doe',
            firstName: 'John',
            eventId: '1'
        },
        {
            bookingDate: '2022-12-19 08:30',
            email: 'test@gmail.com',
            lastName: 'Doe',
            firstName: 'John',
            eventId: '1'
        }
    ],
    acceptsPerSlot: 2,
    isToday: false
}


describe('Testing daily slots generator', () => {

    describe('generate', () => {

        it('should return valid slots', () => {

            const slots = new DailySlotsGenerator(new SlotsGenerator())
                .generate(dailySlotsGeneratorDto);

            expect(slots).toStrictEqual(expectedSlots);
        })

    })

})