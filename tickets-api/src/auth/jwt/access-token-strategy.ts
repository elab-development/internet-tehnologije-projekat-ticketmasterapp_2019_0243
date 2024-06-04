import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

type JwtPayload = {
  id: string;
  email: string;
  roleId: number;
};

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:'2a12nxSbIctaEKQ5CAV9foZd5OgK2GbFWiDqji0hnE7oTeDjAwixz95XK',
    });
  }

  validate(payload: JwtPayload) {
    return payload;
  }
}