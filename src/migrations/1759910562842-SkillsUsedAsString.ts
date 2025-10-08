import { MigrationInterface, QueryRunner } from "typeorm";

export class SkillsUsedAsString1759910562842 implements MigrationInterface {
    name = 'SkillsUsedAsString1759910562842'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "labour_profiles" ADD "skills" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "labour_profiles" DROP COLUMN "skills"`);
    }

}
