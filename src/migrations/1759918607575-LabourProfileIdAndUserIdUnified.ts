import { MigrationInterface, QueryRunner } from 'typeorm';

export class LabourProfileIdAndUserIdUnified1759918607575
  implements MigrationInterface
{
  name = 'LabourProfileIdAndUserIdUnified1759918607575';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Drop constraints if they exist
    try {
      await queryRunner.query(
        `ALTER TABLE "labour_profiles" DROP CONSTRAINT "FK_3106a4d98df7141983ccf0977ec"`,
      );
    } catch (error) {
      // Constraint doesn't exist, continue
    }

    try {
      await queryRunner.query(
        `ALTER TABLE "labour_profiles" DROP CONSTRAINT "UQ_3106a4d98df7141983ccf0977ec"`,
      );
    } catch (error) {
      // Constraint doesn't exist, continue
    }

    // Drop userId column if it exists
    try {
      await queryRunner.query(
        `ALTER TABLE "labour_profiles" DROP COLUMN "userId"`,
      );
    } catch (error) {
      // Column doesn't exist, continue
    }

    // Add new foreign key constraint
    await queryRunner.query(
      `ALTER TABLE "labour_profiles" ADD CONSTRAINT "FK_c46df190c35e90150f99993f3cd" FOREIGN KEY ("id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "labour_profiles" DROP CONSTRAINT "FK_c46df190c35e90150f99993f3cd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "labour_profiles" ADD "userId" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "labour_profiles" ADD CONSTRAINT "UQ_3106a4d98df7141983ccf0977ec" UNIQUE ("userId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "labour_profiles" ADD CONSTRAINT "FK_3106a4d98df7141983ccf0977ec" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
