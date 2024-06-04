import { Module, forwardRef } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersModule } from "src/users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AccessTokenStrategy } from "./jwt/access-token-strategy";
import { RefreshToken } from "./entities/refresh-token.entity";
import { RefreshTokenStrategy } from "./jwt/refresh-token-strategy";
import { RefreshTokenRepository } from "./repository/refresh-token.repository";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [forwardRef(()=>UsersModule), JwtModule.register({}), TypeOrmModule.forFeature([
    RefreshToken,
    RefreshTokenRepository,
  ]),],

  controllers: [AuthController],
  providers: [AuthService,AccessTokenStrategy,RefreshTokenRepository,RefreshTokenStrategy],
  exports: [AuthService],
})
export class AuthModule {}

