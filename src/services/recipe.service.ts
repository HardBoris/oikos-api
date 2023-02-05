import { Request } from "express";
import { Recipe } from "../entities";
import { recipeRepository } from "../repositories";
import { AssertsShape } from "yup/lib/object";
import { recipeShape } from "../shapes";

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
