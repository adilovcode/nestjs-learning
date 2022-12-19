import { plainToClass } from "class-transformer";
import { TimeOffEntity } from "src/domain/entities/time-off.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Event } from "./event";

@Entity()
export class TimeOff {
    @PrimaryGeneratedColumn('increment')
    id: string;

    @Column()
    title: string;

    @ManyToOne(() => Event, event => event.timeOffs)
    @JoinColumn()
    event: Event;

    @Column()
    eventId: string;

    @Column({ length: 5 })
    startTime: string;

    @Column({ length: 5 })
    endTime: string;

    toDomainEntity(): TimeOffEntity {
        return plainToClass(TimeOffEntity, this)
    }
}