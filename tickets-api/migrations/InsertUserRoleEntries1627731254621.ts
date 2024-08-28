import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertUserRoleEntries1627731254621 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO "user_role" (name) VALUES ('admin'), ('user'), ('guest')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`TRUNCATE TABLE "user_role" RESTART IDENTITY CASCADE`);
  }
}
