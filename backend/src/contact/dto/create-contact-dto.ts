import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateContactDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail() // This ensures it's a real email format
  email: string;

  @IsString()
  @MinLength(10) // Ensures they don't send a 1-letter message
  message: string;
}