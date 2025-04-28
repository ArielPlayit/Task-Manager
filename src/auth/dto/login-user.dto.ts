import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";

export class LoginUserDto {
    
    @ApiProperty()
    @IsString()
    @IsEmail()
    @Matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;
}