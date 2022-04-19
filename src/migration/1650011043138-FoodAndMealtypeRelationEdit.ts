import { MigrationInterface, QueryRunner } from "typeorm";

export class FoodAndMealtypeRelationEdit1650011043138 implements MigrationInterface {
    name = 'FoodAndMealtypeRelationEdit1650011043138'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meal_type" DROP CONSTRAINT "FK_41c8942e774eaa9a19ce175a0a9"`);
        await queryRunner.query(`CREATE TABLE "food_meal_types_meal_type" ("foodId" integer NOT NULL, "mealTypeId" integer NOT NULL, CONSTRAINT "PK_8fb8aff96dd084d0b8248fb4ab8" PRIMARY KEY ("foodId", "mealTypeId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_64f0864ed4a320e97015f6d9d6" ON "food_meal_types_meal_type" ("foodId") `);
        await queryRunner.query(`CREATE INDEX "IDX_6d503b63c1f6b3d26d86b1e2c7" ON "food_meal_types_meal_type" ("mealTypeId") `);
        await queryRunner.query(`ALTER TABLE "meal_type" DROP COLUMN "foodId"`);
        await queryRunner.query(`ALTER TABLE "food_meal_types_meal_type" ADD CONSTRAINT "FK_64f0864ed4a320e97015f6d9d63" FOREIGN KEY ("foodId") REFERENCES "food"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "food_meal_types_meal_type" ADD CONSTRAINT "FK_6d503b63c1f6b3d26d86b1e2c73" FOREIGN KEY ("mealTypeId") REFERENCES "meal_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "food_meal_types_meal_type" DROP CONSTRAINT "FK_6d503b63c1f6b3d26d86b1e2c73"`);
        await queryRunner.query(`ALTER TABLE "food_meal_types_meal_type" DROP CONSTRAINT "FK_64f0864ed4a320e97015f6d9d63"`);
        await queryRunner.query(`ALTER TABLE "meal_type" ADD "foodId" integer`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6d503b63c1f6b3d26d86b1e2c7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_64f0864ed4a320e97015f6d9d6"`);
        await queryRunner.query(`DROP TABLE "food_meal_types_meal_type"`);
        await queryRunner.query(`ALTER TABLE "meal_type" ADD CONSTRAINT "FK_41c8942e774eaa9a19ce175a0a9" FOREIGN KEY ("foodId") REFERENCES "food"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
