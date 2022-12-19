import { Type } from "class-transformer";
import { IsArray, IsString, ValidateNested } from "class-validator";
import { PersonalInformation } from "../value-objects/personal-information";

export class CreateBookingDto {
    @IsArray()
    @ValidateNested()
    @Type(() => PersonalInformation)
    readonly personalInformation: PersonalInformation[];

    @IsString()
    readonly bookingDate: string;

    @IsString()
    readonly eventId: string;
}