import { IsString, IsEmail, IsDate, IsDefined, MaxLength, IsNotEmpty, IsDateString } from 'class-validator';
import { Transform } from 'class-transformer';
export class AuthRegisterDto {
    
    @MaxLength(255)
    @IsString()
    @IsNotEmpty()
    fullName: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @IsDateString()
    @IsNotEmpty()
    dateOfBirth: Date;

}
  