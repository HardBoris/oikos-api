import { MigrationInterface, QueryRunner } from "typeorm";

export class AllEntitiesReady1675815954793 implements MigrationInterface {
    name = 'AllEntitiesReady1675815954793'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchase_details" DROP CONSTRAINT "FK_050f75603048a32b538fe3e9766"`);
        await queryRunner.query(`ALTER TABLE "recipe_details" DROP CONSTRAINT "FK_9df504579e3719067fa751cdf89"`);
        await queryRunner.query(`CREATE TABLE "production_details" ("productionDetailId" uuid NOT NULL DEFAULT uuid_generate_v4(), "recipeName" character varying NOT NULL, "recipeQty" double precision NOT NULL, "productionId" uuid, CONSTRAINT "PK_3f05011f79db9ea2c765fb22ee6" PRIMARY KEY ("productionDetailId"))`);
        await queryRunner.query(`CREATE TABLE "productions" ("productionId" uuid NOT NULL DEFAULT uuid_generate_v4(), "productionDate" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_012d82ad33c5233667ce7cad911" PRIMARY KEY ("productionId"))`);
        await queryRunner.query(`ALTER TABLE "purchase_details" DROP COLUMN "ingredientId"`);
        await queryRunner.query(`ALTER TABLE "recipe_details" DROP COLUMN "ingredientId"`);
        await queryRunner.query(`ALTER TABLE "purchase_details" ADD "ingredientName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "purchase_details" ADD "measurementUnit" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "recipes" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "production_details" ADD CONSTRAINT "FK_9cbbd6165ce80afccf6d609c9c4" FOREIGN KEY ("productionId") REFERENCES "productions"("productionId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "productions" ADD CONSTRAINT "FK_08bb9f142bf1dbdc68f2d3127ed" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipes" ADD CONSTRAINT "FK_ad4f881e4b9769d16c0ed2bb3f0" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipes" DROP CONSTRAINT "FK_ad4f881e4b9769d16c0ed2bb3f0"`);
        await queryRunner.query(`ALTER TABLE "productions" DROP CONSTRAINT "FK_08bb9f142bf1dbdc68f2d3127ed"`);
        await queryRunner.query(`ALTER TABLE "production_details" DROP CONSTRAINT "FK_9cbbd6165ce80afccf6d609c9c4"`);
        await queryRunner.query(`ALTER TABLE "recipes" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "purchase_details" DROP COLUMN "measurementUnit"`);
        await queryRunner.query(`ALTER TABLE "purchase_details" DROP COLUMN "ingredientName"`);
        await queryRunner.query(`ALTER TABLE "recipe_details" ADD "ingredientId" uuid`);
        await queryRunner.query(`ALTER TABLE "purchase_details" ADD "ingredientId" uuid`);
        await queryRunner.query(`DROP TABLE "productions"`);
        await queryRunner.query(`DROP TABLE "production_details"`);
        await queryRunner.query(`ALTER TABLE "recipe_details" ADD CONSTRAINT "FK_9df504579e3719067fa751cdf89" FOREIGN KEY ("ingredientId") REFERENCES "ingredients"("ingredientId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purchase_details" ADD CONSTRAINT "FK_050f75603048a32b538fe3e9766" FOREIGN KEY ("ingredientId") REFERENCES "ingredients"("ingredientId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
