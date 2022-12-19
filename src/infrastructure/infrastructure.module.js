"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.InfrastructureModule = void 0;
var common_1 = require("@nestjs/common");
var events_repository_1 = require("../application/repositories/events.repository");
var events_repository_2 = require("./persistence/postgres/repositories/events.repository");
var typeorm_1 = require("@nestjs/typeorm");
var postgres_1 = require("../config/postgres");
var event_1 = require("./persistence/postgres/models/event");
var time_off_1 = require("./persistence/postgres/models/time-off");
var working_day_repository_1 = require("../application/repositories/working-day.repository");
var working_day_repository_2 = require("./persistence/postgres/repositories/working-day.repository");
var time_off_repository_1 = require("../application/repositories/time-off.repository");
var time_offs_repository_1 = require("./persistence/postgres/repositories/time-offs.repository");
var working_day_1 = require("./persistence/postgres/models/working-day");
var database_transaction_contract_1 = require("../application/contracts/database-transaction.contract");
var query_runner_transaction_utils_1 = require("./persistence/postgres/utils/query-runner-transaction.utils");
var nestjs_cls_1 = require("nestjs-cls");
var InfrastructureModule = /** @class */ (function () {
    function InfrastructureModule() {
    }
    InfrastructureModule = __decorate([
        (0, common_1.Module)({
            imports: [
                typeorm_1.TypeOrmModule.forRoot(postgres_1.dataSourceOption),
                typeorm_1.TypeOrmModule.forFeature([event_1.Event, time_off_1.TimeOff, working_day_1.WorkingDay]),
                nestjs_cls_1.ClsModule.forRoot({
                    global: true,
                    middleware: { mount: true }
                }),
            ],
            providers: [
                {
                    provide: events_repository_1.IEventsRepository,
                    useClass: events_repository_2.EventsRepository
                },
                {
                    provide: working_day_repository_1.IWorkingDayRepository,
                    useClass: working_day_repository_2.WorkingDayRepository
                },
                {
                    provide: time_off_repository_1.ITimeOffRepository,
                    useClass: time_offs_repository_1.TimeOffRepository
                },
                {
                    provide: database_transaction_contract_1.IDatabaseTransaction,
                    useClass: query_runner_transaction_utils_1.QueryRunnerTransaction
                },
                query_runner_transaction_utils_1.QueryRunnerTransaction
            ],
            exports: [
                events_repository_1.IEventsRepository,
                working_day_repository_1.IWorkingDayRepository,
                time_off_repository_1.ITimeOffRepository,
                database_transaction_contract_1.IDatabaseTransaction,
                query_runner_transaction_utils_1.QueryRunnerTransaction
            ]
        })
    ], InfrastructureModule);
    return InfrastructureModule;
}());
exports.InfrastructureModule = InfrastructureModule;
