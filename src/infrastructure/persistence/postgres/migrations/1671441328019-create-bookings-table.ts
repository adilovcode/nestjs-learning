import { MigrationInterface, QueryRunner } from "typeorm";

export class createBookingsTable1671441328019 implements MigrationInterface {
    name = 'createBookingsTable1671441328019'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "bookings" ("id" SERIAL NOT NULL, "eventId" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "bookingDate" character varying NOT NULL, CONSTRAINT "PK_bee6805982cc1e248e94ce94957" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "time_off" DROP CONSTRAINT "FK_a798bbcd7ecae9e85b8a5e3c4e6"`);
        await queryRunner.query(`ALTER TABLE "time_off" ALTER COLUMN "eventId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "working_day" DROP CONSTRAINT "FK_eb7276e8f4b357ba92392e92b15"`);
        await queryRunner.query(`ALTER TABLE "working_day" ALTER COLUMN "eventId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "time_off" ADD CONSTRAINT "FK_a798bbcd7ecae9e85b8a5e3c4e6" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "working_day" ADD CONSTRAINT "FK_eb7276e8f4b357ba92392e92b15" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "working_day" DROP CONSTRAINT "FK_eb7276e8f4b357ba92392e92b15"`);
        await queryRunner.query(`ALTER TABLE "time_off" DROP CONSTRAINT "FK_a798bbcd7ecae9e85b8a5e3c4e6"`);
        await queryRunner.query(`ALTER TABLE "working_day" ALTER COLUMN "eventId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "working_day" ADD CONSTRAINT "FK_eb7276e8f4b357ba92392e92b15" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "time_off" ALTER COLUMN "eventId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "time_off" ADD CONSTRAINT "FK_a798bbcd7ecae9e85b8a5e3c4e6" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP TABLE "bookings"`);
    }

}
