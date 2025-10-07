import { MigrationInterface, QueryRunner } from "typeorm";

export class UserProfile1759824736830 implements MigrationInterface {
    name = 'UserProfile1759824736830'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "skills" ("id" SERIAL NOT NULL, "name" character varying(120) NOT NULL, "description" text, CONSTRAINT "PK_0d3212120f4ecedf90864d7e298" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."labour_profiles_verificationstatus_enum" AS ENUM('pending', 'interview', 'verified', 'rejected')`);
        await queryRunner.query(`CREATE TABLE "labour_profiles" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "resumeUrl" character varying, "idProofUrl" character varying, "certificateUrl" character varying, "portfolioUrl" character varying, "skillLevel" character varying, "experienceRange" character varying, "verificationStatus" "public"."labour_profiles_verificationstatus_enum" NOT NULL DEFAULT 'pending', CONSTRAINT "UQ_3106a4d98df7141983ccf0977ec" UNIQUE ("userId"), CONSTRAINT "REL_3106a4d98df7141983ccf0977e" UNIQUE ("userId"), CONSTRAINT "PK_c46df190c35e90150f99993f3cd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('SuperAdmin', 'Admin', 'Labour')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "phone" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "location" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_a000cca60bcf04454e727699490" UNIQUE ("phone"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "labour_profile_skills" ("labour_profile_id" integer NOT NULL, "skill_id" integer NOT NULL, CONSTRAINT "PK_326f7e7c3f6aa9bcab00da74712" PRIMARY KEY ("labour_profile_id", "skill_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_62967e5e78a20e3c6e082d15d6" ON "labour_profile_skills" ("labour_profile_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_407e73c92078a21419853bccec" ON "labour_profile_skills" ("skill_id") `);
        await queryRunner.query(`ALTER TABLE "labour_profiles" ADD CONSTRAINT "FK_3106a4d98df7141983ccf0977ec" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "labour_profile_skills" ADD CONSTRAINT "FK_62967e5e78a20e3c6e082d15d6c" FOREIGN KEY ("labour_profile_id") REFERENCES "labour_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "labour_profile_skills" ADD CONSTRAINT "FK_407e73c92078a21419853bccecc" FOREIGN KEY ("skill_id") REFERENCES "skills"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "labour_profile_skills" DROP CONSTRAINT "FK_407e73c92078a21419853bccecc"`);
        await queryRunner.query(`ALTER TABLE "labour_profile_skills" DROP CONSTRAINT "FK_62967e5e78a20e3c6e082d15d6c"`);
        await queryRunner.query(`ALTER TABLE "labour_profiles" DROP CONSTRAINT "FK_3106a4d98df7141983ccf0977ec"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_407e73c92078a21419853bccec"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_62967e5e78a20e3c6e082d15d6"`);
        await queryRunner.query(`DROP TABLE "labour_profile_skills"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP TABLE "labour_profiles"`);
        await queryRunner.query(`DROP TYPE "public"."labour_profiles_verificationstatus_enum"`);
        await queryRunner.query(`DROP TABLE "skills"`);
    }

}
