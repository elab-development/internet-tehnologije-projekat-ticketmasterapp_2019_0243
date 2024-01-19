import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(email: string, pass: string) {
    const user = await this.usersService.findUserByEmail(email);

    if (!user) throw new NotFoundException("User with that email does not exist");

    if (!user.validatePassword(pass)) throw new UnauthorizedException("Password does not match");

    const payload = { sub: user.id, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
