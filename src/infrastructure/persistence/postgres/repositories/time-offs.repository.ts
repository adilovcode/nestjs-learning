import { InjectRepository } from "@nestjs/typeorm";
import { ITimeOffRepository } from "src/application/repositories/time-off.repository";
import { TimeOffEntity } from "src/domain/entities/time-off.entity";
import { Repository } from "typeorm";
import { TimeOff } from "../models/time-off";
import { QueryRunnerTransaction } from "../utils/query-runner-transaction.utils";

export class TimeOffRepository implements ITimeOffRepository {
    
    constructor(
        @InjectRepository(TimeOff)
        private _repository: Repository<TimeOff>,
        private readonly queryRunner: QueryRunnerTransaction
    ) {}

    async insert(timeOffs: TimeOffEntity[]): Promise<void> {
        timeOffs.map(
            timeOff => this.queryRunner._queryRunner.manager.save(
                this._repository.create(timeOff)
            )
        )
    }

    async fetchByEventId(eventId: string): Promise<TimeOffEntity[]> {
        const timeOffs = await this._repository.find({where: { eventId }})
        return timeOffs.map(timeOff => timeOff.toDomainEntity());
    }
}