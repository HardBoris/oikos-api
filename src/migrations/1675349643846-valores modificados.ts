import { MigrationInterface, QueryRunner } from "typeorm";

export class valoresModificados1675349643846 implements MigrationInterface {
    name = 'valoresModificados1675349643846'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchase" DROP COLUMN "purchaseTotal"`);
        await queryRunner.query(`ALTER TABLE "purchase" ADD "purchaseTotal" double precision NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "purchase_details" DROP COLUMN "ingredientQty"`);
        await queryRunner.query(`ALTER TABLE "purchase_details" ADD "ingredientQty" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "purchase_details" DROP COLUMN "ingredientPrice"`);
        await queryRunner.query(`ALTER TABLE "purchase_details" ADD "ingredientPrice" double precision NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchase_details" DROP COLUMN "ingredientPrice"`);
        await queryRunner.query(`ALTER TABLE "purchase_details" ADD "ingredientPrice" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "purchase_details" DROP COLUMN "ingredientQty"`);
        await queryRunner.query(`ALTER TABLE "purchase_details" ADD "ingredientQty" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "purchase" DROP COLUMN "purchaseTotal"`);
        await queryRunner.query(`ALTER TABLE "purchase" ADD "purchaseTotal" integer NOT NULL DEFAULT '0'`);
    }

}
