import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class AddUserRoleTable1627731254621 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "user_role",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "name",
            type: "enum",
            enum: ["admin", "user", "guest"], // Assuming these are the values in RoleNameEnum
            isNullable: false,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("user_role");
  }
}
