import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UsersService } from "src/users/users.service";
import { RegisterUserDto, SignInDto } from "src/users/dto/user.dtos";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {}

  @Post("sign-up")
  signUp(@Body() registerUserDto: RegisterUserDto) {
    return this.usersService.registerUser(registerUserDto);
  }

  @Post("sign-in")
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }
}
