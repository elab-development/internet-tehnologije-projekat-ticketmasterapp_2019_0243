import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from "bcryptjs";
import { RefreshTokenRepository } from "./repository/refresh-token.repository";
import { User } from "src/users/entities/user.entity";
import { RefreshToken } from "./entities/refresh-token.entity";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
    private jwtService: JwtService,
    private refreshTokenRepository: RefreshTokenRepository
  ) {}

  async signIn(email: string, pass: string) {
    const user = await this.usersService.findUserByEmail(email);

    if (!user) throw new NotFoundException("User with that email does not exist");

    if (!(await bcrypt.compare(pass, user.password)))
      throw new BadRequestException("Password does not match");

    const tokens = await this.getTokens(user.id, user.email, user.role.id);
    const existingToken = await this.refreshTokenRepository.findExistingTokenByUser(user.id);
    await this.updateRefreshToken(user, tokens.refreshToken, existingToken);

    return tokens;
  }

  async getTokens(userId: number, email: string, roleId: number) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: userId,
          email,
          roleId,
        },
        {
          secret: this.configService.get<string>("JWT_ACCESS_SECRET"),
          expiresIn: "7d",
        }
      ),
      this.jwtService.signAsync(
        {
          id: userId,
          email,
        },
        {
          secret: this.configService.get<string>("JWT_REFRESH_SECRET"),
          expiresIn: "7d",
        }
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async updateRefreshToken(user: User, refreshToken: string, existingToken?: RefreshToken) {
    const salt = await bcrypt.genSalt();
    const hashedRefreshToken = await bcrypt.hash(refreshToken, salt);

    if (existingToken) {
      existingToken.refreshToken = hashedRefreshToken;
      this.refreshTokenRepository.save(existingToken);
    } else {
      await this.refreshTokenRepository.save({
        refreshToken: hashedRefreshToken,
        user,
        valid: true,
      });
    }
  }
}
