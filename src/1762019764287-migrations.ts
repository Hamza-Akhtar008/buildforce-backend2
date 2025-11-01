import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1762019764287 implements MigrationInterface {
    name = 'Migrations1762019764287'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "jobs" DROP CONSTRAINT "FK_0109dd9e3af90efa9ab35cdb292"`);
        await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "skillsRequired"`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD "hiringInfo" character varying`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD "postedOn" date`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD "startDate" date`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD "fullAddress" text`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD "scheduleDays" text`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD "shiftHours" character varying`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD "shiftNote" character varying`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD "experience" text`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD "licenses" text`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD "skills" text`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD "benefits" text`);
        await queryRunner.query(`ALTER TABLE "jobs" ALTER COLUMN "projectId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD CONSTRAINT "FK_0109dd9e3af90efa9ab35cdb292" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "jobs" DROP CONSTRAINT "FK_0109dd9e3af90efa9ab35cdb292"`);
        await queryRunner.query(`ALTER TABLE "jobs" ALTER COLUMN "projectId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "benefits"`);
        await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "skills"`);
        await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "licenses"`);
        await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "experience"`);
        await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "shiftNote"`);
        await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "shiftHours"`);
        await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "scheduleDays"`);
        await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "fullAddress"`);
        await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "startDate"`);
        await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "postedOn"`);
        await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "hiringInfo"`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD "skillsRequired" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD CONSTRAINT "FK_0109dd9e3af90efa9ab35cdb292" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
