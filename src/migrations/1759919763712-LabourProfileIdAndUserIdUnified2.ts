import { MigrationInterface, QueryRunner } from 'typeorm';

export class LabourProfileIdAndUserIdUnified21759919763712
  implements MigrationInterface
{
  name = 'LabourProfileIdAndUserIdUnified21759919763712';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(`ALTER TABLE "labour_profiles" DROP CONSTRAINT "FK_3106a4d98df7141983ccf0977ec"`);
    // await queryRunner.query(
    //   `ALTER TABLE "labour_profiles" DROP CONSTRAINT "UQ_3106a4d98df7141983ccf0977ec"`,
    // );
    // await queryRunner.query(
    //   `ALTER TABLE "labour_profiles" DROP COLUMN "userId"`,
    // );
    await queryRunner.query(
      `ALTER TABLE "labour_profiles" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(`DROP SEQUENCE "labour_profiles_id_seq"`);
    // await queryRunner.query(
    //   `ALTER TABLE "labour_profiles" ADD CONSTRAINT "FK_c46df190c35e90150f99993f3cd" FOREIGN KEY ("id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    // );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "labour_profiles" DROP CONSTRAINT "FK_c46df190c35e90150f99993f3cd"`,
    );
    await queryRunner.query(
      `CREATE SEQUENCE IF NOT EXISTS "labour_profiles_id_seq" OWNED BY "labour_profiles"."id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "labour_profiles" ALTER COLUMN "id" SET DEFAULT nextval('"labour_profiles_id_seq"')`,
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
