import { InjectRepository } from "@nestjs/typeorm";
import { IWorkingDayRepository } from "src/application/repositories/working-day.repository";
import { WorkingDayEntity } from "src/domain/entities/working-day.entity";
import { Repository } from "typeorm";
import { WorkingDay } from "../models/working-day";
import { QueryRunnerTransaction } from "../utils/query-runner-transaction.utils";

export class WorkingDayRepository implements IWorkingDayRepository {

    constructor(
        @InjectRepository(WorkingDay)
        private _repository: Repository<WorkingDay>,
        private readonly queryRunner: QueryRunnerTransaction
    ) { }

    insert(workingDays: WorkingDayEntity[]): void {
        workingDays.map(
            workingDay => this.queryRunner._queryRunner.manager.save(
                this._repository.create(workingDay)
            )
        )
    }

    async fetchByEventId(eventId: string): Promise<WorkingDayEntity[]> {
        return (await this._repository.find({ where: { eventId } })).map(workingDay => workingDay.toDomainEntity());
    }
    fetchWorkingDayByWeekDayAndEventId(eventId: string, day: number): Promise<WorkingDayEntity> {
        console.log(eventId, day);
        
        throw new Error("Method not implemented.");
    }
}