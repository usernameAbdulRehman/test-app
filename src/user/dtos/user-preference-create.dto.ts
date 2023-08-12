import { IsString, MaxLength, IsNotEmpty, IsUUID } from 'class-validator';
export class UserPreferenceCreateDto {
    
    @MaxLength(255)
    @IsNotEmpty()
    title: string;

    @MaxLength(255)
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    @IsUUID()
    userId: string;

}
  