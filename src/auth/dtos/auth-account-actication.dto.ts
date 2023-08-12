import { IsString, MaxLength, IsNotEmpty } from 'class-validator';
import { IsValidPassword } from 'src/auth/decorators';
export class AuthAccountActivationDto {
    
    @MaxLength(255)
    @IsString()
    @IsNotEmpty()
    token: string;

   
    @IsString()
    @IsNotEmpty()
    @IsValidPassword()
    password: string;

}
  