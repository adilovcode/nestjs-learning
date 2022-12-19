import { EventEntity } from "src/domain/entities/event.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { plainToClass } from 'class-transformer';
import { TimeOff } from "./time-off";
import { WorkingDay } from "./working-day";

@Entity()
export class Event {

    @PrimaryGeneratedColumn('increment')
    id: string;

    @Column()
    name: string;

    @Column('text')
    description: string;

    @Column()
    duration: number;

    @Column()
    bufferTime: number = 0;

    @Column('smallint')
    bookableInAdvance: number = 1;

    @Column()
    acceptsPerSlot: number = 1;

    @OneToMany(() => TimeOff, timeOff => timeOff.event)
    timeOffs: TimeOff[];

    @OneToMany(() => WorkingDay, workingDay => workingDay.event)
    workingDays: WorkingDay[];

    toDomainEntity(): EventEntity {
        return plainToClass(EventEntity, this)
    }
}
