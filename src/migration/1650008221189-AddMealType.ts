import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMealType1650008221189 implements MigrationInterface {
    name = 'AddMealType1650008221189'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "meal_type" ("id" SERIAL NOT NULL, "name" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "foodId" integer, CONSTRAINT "PK_7c4e585a0551696b23c43e40c47" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "food" ADD "startTime" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "food" ADD "endTime" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "meal_type" ADD CONSTRAINT "FK_41c8942e774eaa9a19ce175a0a9" FOREIGN KEY ("foodId") REFERENCES "food"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meal_type" DROP CONSTRAINT "FK_41c8942e774eaa9a19ce175a0a9"`);
        await queryRunner.query(`ALTER TABLE "food" DROP COLUMN "endTime"`);
        await queryRunner.query(`ALTER TABLE "food" DROP COLUMN "startTime"`);
        await queryRunner.query(`DROP TABLE "meal_type"`);
    }

}
