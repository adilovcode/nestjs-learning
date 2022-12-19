import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1671465905423 implements MigrationInterface {
    name = 'createTables1671465905423'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookings" DROP COLUMN "bookingDate"`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD "bookingDate" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookings" DROP COLUMN "bookingDate"`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD "bookingDate" character varying NOT NULL`);
    }

}
