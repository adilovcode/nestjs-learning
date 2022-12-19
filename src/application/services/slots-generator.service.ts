import { Minute, Slot } from "src/domain/value-objects";
import { startOfDay, format } from 'date-fns'
import { Injectable } from "@nestjs/common";

@Injectable()
export class SlotsGenerator {

    generate(start: string, end: string, duration: Minute): Slot[] {
        const slots: Slot[] = [];

        const [ startHour, startMinute ] = start.split(":");
        const [ endHour, endMinute ] = end.split(":");

        const startInMinute = parseInt(startHour) * 60 + parseInt(startMinute);
        const endInMinutes =  parseInt(endHour) * 60 + parseInt(endMinute);

        for (let i = startInMinute; i < endInMinutes; i += duration) {
            slots.push(format(startOfDay(new Date()).setMinutes(i), 'HH:mm'))
        }

        return slots;
    }
}