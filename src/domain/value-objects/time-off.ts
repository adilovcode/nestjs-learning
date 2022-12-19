import { IsString, Length } from "class-validator";

export class TimeOff {
    @IsString()
    title: string;

    @IsString()
    @Length(5, 5)
    startTime: string;

    @IsString()
    @Length(5, 5)
    endTime: string;
}