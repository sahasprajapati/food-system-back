import { MigrationInterface, QueryRunner } from "typeorm";

export class FixMealTypeBluder1650011257132 implements MigrationInterface {
    name = 'FixMealTypeBluder1650011257132'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meal_type" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "meal_type" ADD "name" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meal_type" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "meal_type" ADD "name" integer NOT NULL`);
    }

}
