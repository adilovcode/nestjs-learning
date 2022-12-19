import { IsNumber, IsString, Length, Max, Min } from "class-validator";

export class OverrideDay {

    @IsNumber()
    @Min(1)
    @Max(6)
    day: number;

    @IsString()
    @Length(5, 5)
    startTime: string;
    
    @IsString()
    @Length(5, 5)
    endTime: string
}