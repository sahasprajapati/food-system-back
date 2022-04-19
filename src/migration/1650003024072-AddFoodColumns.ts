import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFoodColumns1650003024072 implements MigrationInterface {
    name = 'AddFoodColumns1650003024072'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "food" ADD "price" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "food" ADD "quantity" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "food" DROP COLUMN "quantity"`);
        await queryRunner.query(`ALTER TABLE "food" DROP COLUMN "price"`);
    }

}
