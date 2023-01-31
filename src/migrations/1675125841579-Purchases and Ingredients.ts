import { MigrationInterface, QueryRunner } from "typeorm";

export class PurchasesAndIngredients1675125841579 implements MigrationInterface {
    name = 'PurchasesAndIngredients1675125841579'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("userId" uuid NOT NULL DEFAULT uuid_generate_v4(), "userName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_8bf09ba754322ab9c22a215c919" PRIMARY KEY ("userId"))`);
        await queryRunner.query(`CREATE TABLE "purchase" ("purchaseId" uuid NOT NULL DEFAULT uuid_generate_v4(), "purchaseDate" TIMESTAMP NOT NULL DEFAULT now(), "purchaseTotal" integer NOT NULL DEFAULT '0', "userId" uuid, CONSTRAINT "PK_9c8db52e14c0fff5873059251fd" PRIMARY KEY ("purchaseId"))`);
        await queryRunner.query(`CREATE TABLE "purchase_details" ("purchaseDetailId" uuid NOT NULL DEFAULT uuid_generate_v4(), "ingredientQty" integer NOT NULL, "ingredientPrice" integer NOT NULL, "purchaseId" uuid, "ingredientId" uuid, CONSTRAINT "PK_59f39639be9d76d65e474d892ef" PRIMARY KEY ("purchaseDetailId"))`);
        await queryRunner.query(`CREATE TABLE "ingredients" ("ingredientId" uuid NOT NULL DEFAULT uuid_generate_v4(), "ingredientName" character varying NOT NULL, "measurementUnit" character varying NOT NULL, CONSTRAINT "PK_ea762d9f387ef1c0be08ac990eb" PRIMARY KEY ("ingredientId"))`);
        await queryRunner.query(`ALTER TABLE "purchase" ADD CONSTRAINT "FK_33520b6c46e1b3971c0a649d38b" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purchase_details" ADD CONSTRAINT "FK_2f0e27fc223b947c853f4e0785e" FOREIGN KEY ("purchaseId") REFERENCES "purchase"("purchaseId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purchase_details" ADD CONSTRAINT "FK_050f75603048a32b538fe3e9766" FOREIGN KEY ("ingredientId") REFERENCES "ingredients"("ingredientId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchase_details" DROP CONSTRAINT "FK_050f75603048a32b538fe3e9766"`);
        await queryRunner.query(`ALTER TABLE "purchase_details" DROP CONSTRAINT "FK_2f0e27fc223b947c853f4e0785e"`);
        await queryRunner.query(`ALTER TABLE "purchase" DROP CONSTRAINT "FK_33520b6c46e1b3971c0a649d38b"`);
        await queryRunner.query(`DROP TABLE "ingredients"`);
        await queryRunner.query(`DROP TABLE "purchase_details"`);
        await queryRunner.query(`DROP TABLE "purchase"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
