import { DataSource, Repository } from "typeorm";
import { RefreshToken } from "../entities/refresh-token.entity";
import { ForbiddenException, Injectable } from "@nestjs/common";

@Injectable()
export class RefreshTokenRepository extends Repository<RefreshToken> {
  constructor(private readonly dataSource: DataSource) {
    super(RefreshToken, dataSource.createEntityManager());
  }
  async findExistingTokenByUser(userId: number) {
    const existingToken = await this.findOne({
      where: { user: { id: userId } },
      relations: ["user"],
    });

    return existingToken;
  }
}