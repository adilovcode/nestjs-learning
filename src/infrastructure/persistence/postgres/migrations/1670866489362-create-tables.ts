import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1670866489362 implements MigrationInterface {
    name = 'createTables1670866489362'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "time_off" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "startTime" character varying(5) NOT NULL, "endTime" character varying(5) NOT NULL, "eventId" integer, CONSTRAINT "PK_e80a790cc96026d0f557a78f83d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "event" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" text NOT NULL, "duration" integer NOT NULL, "bufferTime" integer NOT NULL, "bookableInAdvance" smallint NOT NULL, "acceptsPerSlot" integer NOT NULL, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "working_day" ("id" SERIAL NOT NULL, "day" smallint NOT NULL, "startTime" character varying(5) NOT NULL, "endTime" character varying(5) NOT NULL, "eventId" integer, CONSTRAINT "PK_3579cabbff042b5b0117aa40933" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "time_off" ADD CONSTRAINT "FK_a798bbcd7ecae9e85b8a5e3c4e6" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "working_day" ADD CONSTRAINT "FK_eb7276e8f4b357ba92392e92b15" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "working_day" DROP CONSTRAINT "FK_eb7276e8f4b357ba92392e92b15"`);
        await queryRunner.query(`ALTER TABLE "time_off" DROP CONSTRAINT "FK_a798bbcd7ecae9e85b8a5e3c4e6"`);
        await queryRunner.query(`DROP TABLE "working_day"`);
        await queryRunner.query(`DROP TABLE "event"`);
        await queryRunner.query(`DROP TABLE "time_off"`);
    }

}
