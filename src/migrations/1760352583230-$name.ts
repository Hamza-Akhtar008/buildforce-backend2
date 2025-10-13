import { MigrationInterface, QueryRunner } from "typeorm";

export class  $name1760352583230 implements MigrationInterface {
    name = ' $name1760352583230'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "company_profiles" ("id" integer NOT NULL, "name" character varying NOT NULL, "logoUrl" character varying, "about" text, "location" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_1980200b310bd1e2ac86aa1ae4a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."projects_status_enum" AS ENUM('draft', 'open', 'closed', 'completed')`);
        await queryRunner.query(`CREATE TABLE "projects" ("id" SERIAL NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "location" character varying NOT NULL, "startDate" date NOT NULL, "description" text NOT NULL, "budget" numeric(10,2) NOT NULL, "status" "public"."projects_status_enum" NOT NULL DEFAULT 'draft', CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "company_profiles" ADD CONSTRAINT "FK_1980200b310bd1e2ac86aa1ae4a" FOREIGN KEY ("id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company_profiles" DROP CONSTRAINT "FK_1980200b310bd1e2ac86aa1ae4a"`);
        await queryRunner.query(`DROP TABLE "projects"`);
        await queryRunner.query(`DROP TYPE "public"."projects_status_enum"`);
        await queryRunner.query(`DROP TABLE "company_profiles"`);
    }

}
