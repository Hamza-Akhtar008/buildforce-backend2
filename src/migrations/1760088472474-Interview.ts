import { MigrationInterface, QueryRunner } from "typeorm";

export class Interview1760088472474 implements MigrationInterface {
    name = 'Interview1760088472474'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Interview" ("id" SERIAL NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "date" character varying NOT NULL, "timeSlots" character varying NOT NULL, "candidateId" integer NOT NULL, CONSTRAINT "REL_2ace52bb2ab7a4b53d543e6f54" UNIQUE ("candidateId"), CONSTRAINT "PK_7ef5ba08921fb7af393e454efb0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Interview" ADD CONSTRAINT "FK_2ace52bb2ab7a4b53d543e6f541" FOREIGN KEY ("candidateId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Interview" DROP CONSTRAINT "FK_2ace52bb2ab7a4b53d543e6f541"`);
        await queryRunner.query(`DROP TABLE "Interview"`);
    }

}
