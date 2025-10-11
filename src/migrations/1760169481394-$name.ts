import { MigrationInterface, QueryRunner } from "typeorm";

export class  $name1760169481394 implements MigrationInterface {
    name = ' $name1760169481394'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."users_verificationstatus_enum" RENAME TO "users_verificationstatus_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."users_verificationstatus_enum" AS ENUM('pending', 'submitted', 'interview', 'interviewed', 'verified', 'rejected')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "verificationStatus" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "verificationStatus" TYPE "public"."users_verificationstatus_enum" USING "verificationStatus"::"text"::"public"."users_verificationstatus_enum"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "verificationStatus" SET DEFAULT 'pending'`);
        await queryRunner.query(`DROP TYPE "public"."users_verificationstatus_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_verificationstatus_enum_old" AS ENUM('pending', 'submitted', 'interview', 'verified', 'rejected')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "verificationStatus" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "verificationStatus" TYPE "public"."users_verificationstatus_enum_old" USING "verificationStatus"::"text"::"public"."users_verificationstatus_enum_old"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "verificationStatus" SET DEFAULT 'pending'`);
        await queryRunner.query(`DROP TYPE "public"."users_verificationstatus_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."users_verificationstatus_enum_old" RENAME TO "users_verificationstatus_enum"`);
    }

}
