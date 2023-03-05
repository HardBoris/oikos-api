import { MigrationInterface, QueryRunner } from "typeorm";

export class AllTables1678028965910 implements MigrationInterface {
  name = "AllTables1678028965910";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "purchase_details" ("purchaseDetailId" uuid NOT NULL DEFAULT uuid_generate_v4(), "ingredientName" character varying NOT NULL, "ingredientQty" double precision NOT NULL, "measurementUnit" character varying NOT NULL, "ingredientPrice" double precision NOT NULL, "purchaseId" uuid, CONSTRAINT "PK_59f39639be9d76d65e474d892ef" PRIMARY KEY ("purchaseDetailId"))`
    );
    await queryRunner.query(
      `CREATE TABLE "purchase" ("purchaseId" uuid NOT NULL DEFAULT uuid_generate_v4(), "purchaseDate" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_9c8db52e14c0fff5873059251fd" PRIMARY KEY ("purchaseId"))`
    );
    await queryRunner.query(
      `CREATE TABLE "recipe_details" ("recipeDetailId" uuid NOT NULL DEFAULT uuid_generate_v4(), "ingredientName" character varying NOT NULL, "ingredientQty" double precision NOT NULL, "measurementUnit" character varying NOT NULL, "recipeId" uuid, CONSTRAINT "PK_e1b349bb69e4c150a2a4fa98139" PRIMARY KEY ("recipeDetailId"))`
    );
    await queryRunner.query(
      `CREATE TABLE "recipes" ("recipeId" uuid NOT NULL DEFAULT uuid_generate_v4(), "recipeName" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_739eb9215614dc41efacb026614" PRIMARY KEY ("recipeId"))`
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("userId" uuid NOT NULL DEFAULT uuid_generate_v4(), "userName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_8bf09ba754322ab9c22a215c919" PRIMARY KEY ("userId"))`
    );
    await queryRunner.query(
      `CREATE TABLE "productions" ("productionId" uuid NOT NULL DEFAULT uuid_generate_v4(), "productionDate" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_012d82ad33c5233667ce7cad911" PRIMARY KEY ("productionId"))`
    );
    await queryRunner.query(
      `CREATE TABLE "production_details" ("productionDetailId" uuid NOT NULL DEFAULT uuid_generate_v4(), "recipeName" character varying NOT NULL, "recipeQty" double precision NOT NULL, "productionId" uuid, CONSTRAINT "PK_3f05011f79db9ea2c765fb22ee6" PRIMARY KEY ("productionDetailId"))`
    );
    await queryRunner.query(
      `CREATE TABLE "ingredients" ("ingredientId" uuid NOT NULL DEFAULT uuid_generate_v4(), "ingredientName" character varying NOT NULL, "measurementUnit" character varying NOT NULL, CONSTRAINT "PK_ea762d9f387ef1c0be08ac990eb" PRIMARY KEY ("ingredientId"))`
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_details" ADD CONSTRAINT "FK_2f0e27fc223b947c853f4e0785e" FOREIGN KEY ("purchaseId") REFERENCES "purchase"("purchaseId") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "purchase" ADD CONSTRAINT "FK_33520b6c46e1b3971c0a649d38b" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "recipe_details" ADD CONSTRAINT "FK_787891b4afda5a0cf6ede644de1" FOREIGN KEY ("recipeId") REFERENCES "recipes"("recipeId") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "recipes" ADD CONSTRAINT "FK_ad4f881e4b9769d16c0ed2bb3f0" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "productions" ADD CONSTRAINT "FK_08bb9f142bf1dbdc68f2d3127ed" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "production_details" ADD CONSTRAINT "FK_9cbbd6165ce80afccf6d609c9c4" FOREIGN KEY ("productionId") REFERENCES "productions"("productionId") ON DELETE CASCADE ON UPDATE CASCADE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "production_details" DROP CONSTRAINT "FK_9cbbd6165ce80afccf6d609c9c4"`
    );
    await queryRunner.query(
      `ALTER TABLE "productions" DROP CONSTRAINT "FK_08bb9f142bf1dbdc68f2d3127ed"`
    );
    await queryRunner.query(
      `ALTER TABLE "recipes" DROP CONSTRAINT "FK_ad4f881e4b9769d16c0ed2bb3f0"`
    );
    await queryRunner.query(
      `ALTER TABLE "recipe_details" DROP CONSTRAINT "FK_787891b4afda5a0cf6ede644de1"`
    );
    await queryRunner.query(
      `ALTER TABLE "purchase" DROP CONSTRAINT "FK_33520b6c46e1b3971c0a649d38b"`
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_details" DROP CONSTRAINT "FK_2f0e27fc223b947c853f4e0785e"`
    );
    await queryRunner.query(`DROP TABLE "ingredients"`);
    await queryRunner.query(`DROP TABLE "production_details"`);
    await queryRunner.query(`DROP TABLE "productions"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "recipes"`);
    await queryRunner.query(`DROP TABLE "recipe_details"`);
    await queryRunner.query(`DROP TABLE "purchase"`);
    await queryRunner.query(`DROP TABLE "purchase_details"`);
  }
}
