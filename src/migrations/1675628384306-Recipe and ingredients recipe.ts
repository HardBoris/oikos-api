import { MigrationInterface, QueryRunner } from "typeorm";

export class RecipeAndIngredientsRecipe1675628384306 implements MigrationInterface {
    name = 'RecipeAndIngredientsRecipe1675628384306'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "recipes" ("recipeId" uuid NOT NULL DEFAULT uuid_generate_v4(), "recipeName" character varying NOT NULL, CONSTRAINT "PK_739eb9215614dc41efacb026614" PRIMARY KEY ("recipeId"))`);
        await queryRunner.query(`CREATE TABLE "recipe_details" ("recipeDetailId" uuid NOT NULL DEFAULT uuid_generate_v4(), "ingredientName" character varying NOT NULL, "ingredientQty" double precision NOT NULL, "measurementUnit" character varying NOT NULL, "ingredientId" uuid, "recipeId" uuid, CONSTRAINT "PK_e1b349bb69e4c150a2a4fa98139" PRIMARY KEY ("recipeDetailId"))`);
        await queryRunner.query(`ALTER TABLE "recipe_details" ADD CONSTRAINT "FK_9df504579e3719067fa751cdf89" FOREIGN KEY ("ingredientId") REFERENCES "ingredients"("ingredientId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipe_details" ADD CONSTRAINT "FK_787891b4afda5a0cf6ede644de1" FOREIGN KEY ("recipeId") REFERENCES "recipes"("recipeId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe_details" DROP CONSTRAINT "FK_787891b4afda5a0cf6ede644de1"`);
        await queryRunner.query(`ALTER TABLE "recipe_details" DROP CONSTRAINT "FK_9df504579e3719067fa751cdf89"`);
        await queryRunner.query(`DROP TABLE "recipe_details"`);
        await queryRunner.query(`DROP TABLE "recipes"`);
    }

}
