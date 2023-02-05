import { Request } from "express";
import { Ingredient, Recipe } from "../entities";
import { ingredientRepository, recipeRepository } from "../repositories";
import { AssertsShape } from "yup/lib/object";
import * as dotenv from "dotenv";
import { ingredientShape, recipeShape } from "../shapes";
dotenv.config();

class RecipeService {
  recipeCreator = async ({ body }: Request): Promise<AssertsShape<any>> => {
    const recipe: Recipe = await recipeRepository.save(body);
    return await recipeShape.recipeCreator.validate(recipe, {
      stripUnknown: true,
    });
  };

  recipeLoader = async (req: Request) => {
    const recipes: Recipe[] = await recipeRepository.all();
    return {
      status: 200,
      recipes: recipes,
    };
  };
}

export default new RecipeService();
