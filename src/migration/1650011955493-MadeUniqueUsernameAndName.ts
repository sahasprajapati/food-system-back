import { MigrationInterface, QueryRunner } from "typeorm";

export class MadeUniqueUsernameAndName1650011955493 implements MigrationInterface {
    name = 'MadeUniqueUsernameAndName1650011955493'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username")`);
        await queryRunner.query(`ALTER TABLE "meal_type" ADD CONSTRAINT "UQ_55a64f8b013b48cc2d529467257" UNIQUE ("name")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meal_type" DROP CONSTRAINT "UQ_55a64f8b013b48cc2d529467257"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb"`);
    }

}
