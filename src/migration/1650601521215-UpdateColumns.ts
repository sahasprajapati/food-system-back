import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateColumns1650601521215 implements MigrationInterface {
    name = 'UpdateColumns1650601521215'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "order_item" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "quantity" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "foodId" integer, "orderId" integer, CONSTRAINT "REL_eefd7c5ad8708989375a9db7b5" UNIQUE ("foodId"), CONSTRAINT "PK_d01158fe15b1ead5c26fd7f4e90" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order" ("id" SERIAL NOT NULL, "amount" integer NOT NULL, "serveMe" boolean NOT NULL DEFAULT false, "status" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "expenseId" integer, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "expense" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_edd925b450e13ea36197c9590fc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "organization" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "creditLimit" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_472c1f99a32def1b0abb219cd67" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "expense"`);
        await queryRunner.query(`ALTER TABLE "profile" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "profile" ADD "expenseId" integer`);
        await queryRunner.query(`ALTER TABLE "profile" ADD CONSTRAINT "UQ_9d35aacc0ada35485d8c94bcbda" UNIQUE ("expenseId")`);
        await queryRunner.query(`ALTER TABLE "user" ADD "organizationId" integer`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_eefd7c5ad8708989375a9db7b5e" FOREIGN KEY ("foodId") REFERENCES "food"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_266ac6112f91b97da227ec0b560" FOREIGN KEY ("expenseId") REFERENCES "expense"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "profile" ADD CONSTRAINT "FK_9d35aacc0ada35485d8c94bcbda" FOREIGN KEY ("expenseId") REFERENCES "expense"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_dfda472c0af7812401e592b6a61" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_dfda472c0af7812401e592b6a61"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP CONSTRAINT "FK_9d35aacc0ada35485d8c94bcbda"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_266ac6112f91b97da227ec0b560"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_eefd7c5ad8708989375a9db7b5e"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "organizationId"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP CONSTRAINT "UQ_9d35aacc0ada35485d8c94bcbda"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "expenseId"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "profile" ADD "expense" integer NOT NULL`);
        await queryRunner.query(`DROP TABLE "organization"`);
        await queryRunner.query(`DROP TABLE "expense"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "order_item"`);
    }

}
