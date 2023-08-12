import { IsString, MaxLength, IsNotEmpty, IsEmail } from 'class-validator';
export class AuthLoginDto {
    
    @MaxLength(255)
    @IsEmail()
    @IsNotEmpty()
    email: string;

   
    @IsString()
    @IsNotEmpty()
    password: string;

}
  