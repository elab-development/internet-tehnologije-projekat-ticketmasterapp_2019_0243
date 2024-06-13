import { IsNumber, IsString } from "class-validator";

export class RegisterUserDto {
  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  name: string;

  @IsNumber()
  roleId: number;
}

export class SignInDto {
  @IsString()
  email: string;

  @IsString()
  password: string;
}
