import { MigrationInterface, QueryRunner } from "typeorm";

export class  $name1760164452816 implements MigrationInterface {
    name = ' $name1760164452816'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Interview" ADD "selectedDate" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Interview" ADD "selectedTimeSlot" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Interview" DROP COLUMN "selectedTimeSlot"`);
        await queryRunner.query(`ALTER TABLE "Interview" DROP COLUMN "selectedDate"`);
    }

}
