"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ApplicationModule = void 0;
var common_1 = require("@nestjs/common");
var infrastructure_module_1 = require("../infrastructure/infrastructure.module");
var event_factory_1 = require("./factories/event.factory");
var time_offs_factory_1 = require("./factories/time-offs.factory");
var working_days_factory_1 = require("./factories/working-days.factory");
var daily_slots_generator_service_1 = require("./services/daily-slots-generator.service");
var event_slots_generator_service_1 = require("./services/event-slots-generator.service");
var slots_generator_service_1 = require("./services/slots-generator.service");
var working_day_generator_service_1 = require("./services/working-day-generator.service");
var create_event_use_case_1 = require("./use-cases/create-event.use-case");
var event_fetcher_use_case_1 = require("./use-cases/event-fetcher.use-case");
var ApplicationModule = /** @class */ (function () {
    function ApplicationModule() {
    }
    ApplicationModule = __decorate([
        (0, common_1.Module)({
            imports: [
                infrastructure_module_1.InfrastructureModule
            ],
            providers: [
                event_fetcher_use_case_1.EventFetcherUseCase,
                create_event_use_case_1.CreateEventUseCase,
                event_factory_1.EventFactory,
                working_days_factory_1.WorkingDaysFactory,
                time_offs_factory_1.TimeOffsFactory,
                slots_generator_service_1.SlotsGenerator,
                daily_slots_generator_service_1.DailySlotsGenerator,
                working_day_generator_service_1.WorkingDaysGenerator,
                event_slots_generator_service_1.EventSlotsGenerator,
            ],
            exports: [
                event_fetcher_use_case_1.EventFetcherUseCase,
                create_event_use_case_1.CreateEventUseCase
            ]
        })
    ], ApplicationModule);
    return ApplicationModule;
}());
exports.ApplicationModule = ApplicationModule;
