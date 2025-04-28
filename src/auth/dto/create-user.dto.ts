import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";
import { Role } from "../entities/user.entity";

export class CreateUserDto {
    
    @ApiProperty()
    @IsString()
    @IsEmail()
    @Matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])(?!.*\s).{12,}$/, {
        message: 'The password must be: minimum 12 characters, at least 1 uppercase, 1 lowercase, 1 number, 1 special character and no spaces'
      })
    password: string;

    @ApiProperty()
    @IsString()
    @MinLength(1)
    fullName: string;

    rol?: Role;

}
