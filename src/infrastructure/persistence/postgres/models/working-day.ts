import { plainToClass } from "class-transformer";
import { WorkingDayEntity } from "src/domain/entities/working-day.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Event } from "./event";

@Entity()
export class WorkingDay {
    @PrimaryGeneratedColumn()
    id: string

    @ManyToOne(() => Event, event => event.workingDays)
    event: Event;

    @Column('smallint')
    day: number;
    
    @Column()
    eventId: string;

    @Column({ length: 5 })
    startTime: string;

    @Column({ length: 5 })
    endTime: string;

    toDomainEntity(): WorkingDayEntity {
        return plainToClass(WorkingDayEntity, this)
    }
}