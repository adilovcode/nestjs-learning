import { SlotsGenerator } from "./slots-generator.service"
import { Slot } from 'src/domain/value-objects'

const expectedSlots: Slot[] = ['08:00', '08:30', '09:00', '09:30'];

describe('Testing slots generator', () => { 

    describe('generate', () => {
        
        it('should return valid slots', () => {
            const slotGenerator = new SlotsGenerator();
        
            expect(slotGenerator.generate('08:00', '10:00', 30)).toStrictEqual(expectedSlots);
        })
    });
})
