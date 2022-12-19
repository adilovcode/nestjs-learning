import { Type } from "class-transformer";
import { IsString, Length, IsInt, IsArray, IsObject, ValidateNested } from "class-validator";
import { Hour } from "../value-objects/hour";
import { OverrideDay } from "../value-objects/override-day";
import { TimeOff } from "../value-objects/time-off";

export class CreateEventDto {

    @IsString()
    @Length(2)
    name: string;

    @IsString()
    description: string;

    @IsInt()
    duration: number;   

    @IsInt()
    bufferTime: number = 0;

    @IsInt()
    bookableInAdvance: number = 7;

    @IsInt()
    acceptsPerSlot: number = 1;

    @IsArray()
    workingDays: number[];

    @IsObject()
    @ValidateNested()
    @Type(() => Hour)
    workingHours: Hour;

    @IsArray()
    @ValidateNested()
    @Type(() => OverrideDay)
    overrideDays: OverrideDay[]

    @IsArray()
    @ValidateNested()
    @Type(() => TimeOff)
    timeOffs: TimeOff[]
}
