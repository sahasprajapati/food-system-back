import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateOrderTable1650603480206 implements MigrationInterface {
    name = 'UpdateOrderTable1650603480206'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "amount"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" ADD "amount" integer NOT NULL`);
    }

}
