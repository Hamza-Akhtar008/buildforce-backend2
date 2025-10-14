import { MigrationInterface, QueryRunner } from "typeorm";

export class  $name1760427114333 implements MigrationInterface {
    name = ' $name1760427114333'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_a8e7e6c3f9d9528ed35fe5bae33"`);
        await queryRunner.query(`CREATE TABLE "job_applications" ("id" SERIAL NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "jobId" integer NOT NULL, "applicantId" integer NOT NULL, "coverLetter" character varying NOT NULL, "startDate" character varying NOT NULL, "status" character varying NOT NULL DEFAULT 'pending', CONSTRAINT "UQ_7a05f948f04d4a2ad678cc5996b" UNIQUE ("jobId", "applicantId"), CONSTRAINT "PK_c56a5e86707d0f0df18fa111280" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "admin_profiles" ("id" integer NOT NULL, CONSTRAINT "PK_89c52edc2b9c2178f1acd127f3a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "ownerId"`);
        await queryRunner.query(`ALTER TABLE "projects" ADD "ownerId" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "job_applications" ADD CONSTRAINT "FK_800dbac1b41b16b232fbf42f100" FOREIGN KEY ("jobId") REFERENCES "jobs"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "job_applications" ADD CONSTRAINT "FK_e6fe2edecc374e7153e3a99111a" FOREIGN KEY ("applicantId") REFERENCES "labour_profiles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_a8e7e6c3f9d9528ed35fe5bae33" FOREIGN KEY ("ownerId") REFERENCES "company_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "admin_profiles" ADD CONSTRAINT "FK_89c52edc2b9c2178f1acd127f3a" FOREIGN KEY ("id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "admin_profiles" DROP CONSTRAINT "FK_89c52edc2b9c2178f1acd127f3a"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_a8e7e6c3f9d9528ed35fe5bae33"`);
        await queryRunner.query(`ALTER TABLE "job_applications" DROP CONSTRAINT "FK_e6fe2edecc374e7153e3a99111a"`);
        await queryRunner.query(`ALTER TABLE "job_applications" DROP CONSTRAINT "FK_800dbac1b41b16b232fbf42f100"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "ownerId"`);
        await queryRunner.query(`ALTER TABLE "projects" ADD "ownerId" integer NOT NULL`);
        await queryRunner.query(`DROP TABLE "admin_profiles"`);
        await queryRunner.query(`DROP TABLE "job_applications"`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_a8e7e6c3f9d9528ed35fe5bae33" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
