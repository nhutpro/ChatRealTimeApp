import { IsNotEmpty, IsEmail, IsEmpty } from 'class-validator';
export class SignupUserDto {
  @IsEmail()
  email: string;
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
}
