import { MigrationInterface, QueryRunner } from "typeorm";

export class  $name1760166072748 implements MigrationInterface {
    name = ' $name1760166072748'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Interview" ALTER COLUMN "selectedDate" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Interview" ALTER COLUMN "selectedTimeSlot" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Interview" ALTER COLUMN "selectedTimeSlot" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Interview" ALTER COLUMN "selectedDate" SET NOT NULL`);
    }

}
