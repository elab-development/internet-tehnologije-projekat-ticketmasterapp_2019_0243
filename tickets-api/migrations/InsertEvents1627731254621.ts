import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertEvents1627731254621 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            INSERT INTO "event" (name, date, "priceInEur", "placeId") VALUES 
            ('Rock Concert', '2024-07-01', 50, 1),
            ('Jazz Night', '2024-07-03', 30, 2),
            ('Classical Music Festival', '2024-07-05', 45, 3),
            ('Comedy Show', '2024-07-07', 25, 4),
            ('Tech Conference', '2024-07-10', 100, 5),
            ('Art Exhibition', '2024-07-12', 15, 6),
            ('Food Festival', '2024-07-15', 20, 7),
            ('Theater Play', '2024-07-18', 35, 8),
            ('Movie Premiere', '2024-07-20', 40, 9),
            ('Book Launch', '2024-07-22', 10, 10),
            ('Charity Gala', '2024-07-25', 150, 11),
            ('Fashion Show', '2024-07-27', 60, 12),
            ('Marathon', '2024-07-30', 5, 13),
            ('Dance Performance', '2024-08-01', 50, 14),
            ('Science Fair', '2024-08-03', 25, 15),
            ('Cultural Festival', '2024-08-05', 30, 16),
            ('Music Awards', '2024-08-07', 75, 17),
            ('Stand-up Comedy', '2024-08-10', 20, 18),
            ('Magic Show', '2024-08-12', 35, 19),
            ('Circus', '2024-08-15', 25, 20),
            ('Gaming Convention', '2024-08-17', 50, 21),
            ('Wine Tasting', '2024-08-20', 40, 22),
            ('Opera', '2024-08-22', 60, 23),
            ('Symphony Orchestra', '2024-08-25', 70, 24),
            ('Pop Concert', '2024-08-27', 55, 25)
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`TRUNCATE TABLE "event" RESTART IDENTITY CASCADE`);
  }
}
