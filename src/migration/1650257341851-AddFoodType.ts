import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFoodType1650257341851 implements MigrationInterface {
    name = 'AddFoodType1650257341851'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "food_type" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_dde03feabfea81314d7c2ce1788" UNIQUE ("name"), CONSTRAINT "PK_2e96981e13ce218ad84105a9ced" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "food" ADD "foodTypeId" integer`);
        await queryRunner.query(`ALTER TABLE "food" ADD CONSTRAINT "FK_7592e87ccc282d640cf45304ec4" FOREIGN KEY ("foodTypeId") REFERENCES "food_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "food" DROP CONSTRAINT "FK_7592e87ccc282d640cf45304ec4"`);
        await queryRunner.query(`ALTER TABLE "food" DROP COLUMN "foodTypeId"`);
        await queryRunner.query(`DROP TABLE "food_type"`);
    }

}
