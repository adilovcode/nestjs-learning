import { Injectable, Scope } from "@nestjs/common";
import { IDatabaseTransaction } from "src/application/contracts/database-transaction.contract";
import { DataSource, QueryRunner } from "typeorm";

@Injectable({ scope: Scope.REQUEST })
export class QueryRunnerTransaction implements IDatabaseTransaction {

    public readonly _queryRunner: QueryRunner;

    constructor(
        private readonly _dataSource: DataSource
    ) {
        this._queryRunner = this._dataSource.createQueryRunner();
    }

    async start(): Promise<void> {
        await this._queryRunner.connect();
        return await this._queryRunner.startTransaction();
    }
    async rollback(): Promise<void> {
        return await this._queryRunner.rollbackTransaction();
    }
    async commit(): Promise<void> {
        return await this._queryRunner.commitTransaction();
    }
}