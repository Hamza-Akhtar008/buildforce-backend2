import { MigrationInterface, QueryRunner } from "typeorm";

export class VerificationStatusMovedToUserEntity1759995495103 implements MigrationInterface {
    name = 'VerificationStatusMovedToUserEntity1759995495103'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "labour_profiles" DROP COLUMN "verificationStatus"`);
        await queryRunner.query(`DROP TYPE "public"."labour_profiles_verificationstatus_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."users_verificationstatus_enum" AS ENUM('pending', 'submitted', 'interview', 'verified', 'rejected')`);
        await queryRunner.query(`ALTER TABLE "users" ADD "verificationStatus" "public"."users_verificationstatus_enum" NOT NULL DEFAULT 'pending'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "verificationStatus"`);
        await queryRunner.query(`DROP TYPE "public"."users_verificationstatus_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."labour_profiles_verificationstatus_enum" AS ENUM('pending', 'interview', 'verified', 'rejected')`);
        await queryRunner.query(`ALTER TABLE "labour_profiles" ADD "verificationStatus" "public"."labour_profiles_verificationstatus_enum" NOT NULL DEFAULT 'pending'`);
    }

}
