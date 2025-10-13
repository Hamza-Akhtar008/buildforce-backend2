import { MigrationInterface, QueryRunner } from "typeorm";

export class  $name1760357933929 implements MigrationInterface {
    name = ' $name1760357933929'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."jobs_workduration_enum" AS ENUM('medium', 'short-term', 'long-term', 'permanent')`);
        await queryRunner.query(`CREATE TYPE "public"."jobs_shift_enum" AS ENUM('day', 'night', 'both')`);
        await queryRunner.query(`CREATE TYPE "public"."jobs_skilllevel_enum" AS ENUM('beginner', 'intermediate', 'expert', 'need_training')`);
        await queryRunner.query(`CREATE TABLE "jobs" ("id" SERIAL NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" text NOT NULL, "skillsRequired" text NOT NULL, "salary" character varying NOT NULL, "location" character varying NOT NULL, "workDuration" "public"."jobs_workduration_enum" NOT NULL, "shift" "public"."jobs_shift_enum" NOT NULL, "skillLevel" "public"."jobs_skilllevel_enum" NOT NULL, "projectId" integer NOT NULL, CONSTRAINT "PK_cf0a6c42b72fcc7f7c237def345" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD CONSTRAINT "FK_0109dd9e3af90efa9ab35cdb292" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "jobs" DROP CONSTRAINT "FK_0109dd9e3af90efa9ab35cdb292"`);
        await queryRunner.query(`DROP TABLE "jobs"`);
        await queryRunner.query(`DROP TYPE "public"."jobs_skilllevel_enum"`);
        await queryRunner.query(`DROP TYPE "public"."jobs_shift_enum"`);
        await queryRunner.query(`DROP TYPE "public"."jobs_workduration_enum"`);
    }

}
