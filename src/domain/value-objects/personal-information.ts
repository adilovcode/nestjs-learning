import { IsEmail, IsString } from "class-validator";

export class PersonalInformation {

    @IsString()
    @IsEmail()
    readonly email: string;

    @IsString()    
    readonly firstName: string;

    @IsString()
    readonly lastName: string;
}