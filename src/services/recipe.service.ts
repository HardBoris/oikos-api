import { Request } from "express";
import { Recipe } from "../entities";
import { recipeRepository, userRepository } from "../repositories";
import { AssertsShape } from "yup/lib/object";
import { recipeShape } from "../shapes";

class RecipeService {
  recipeUser = async ({ decoded }: Request) =>
    await userRepository.findOne({ userId: decoded.userId });

  recipeCreator = async (req: Request): Promise<AssertsShape<any>> => {
    const user = await this.recipeUser(req);

    const body = req.body;

    const recipe: Recipe = await recipeRepository.save({
      ...body,
      user: user.userId,
    });
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
