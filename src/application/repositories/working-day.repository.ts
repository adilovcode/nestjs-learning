import { WorkingDayEntity } from "src/domain/entities/working-day.entity";

export abstract class IWorkingDayRepository {
    abstract insert(workingDays: WorkingDayEntity[]): void;

    abstract fetchByEventId(eventId: string): Promise<WorkingDayEntity[]>;

    abstract fetchWorkingDayByWeekDayAndEventId(eventId: string, day: number): Promise<WorkingDayEntity>;
}