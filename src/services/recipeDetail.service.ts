import { Request } from "express";
import { RecipeDetail } from "../entities";
import { recipeDetailRepository, recipeRepository } from "../repositories";
import { AssertsShape } from "yup/lib/object";
import { recipeDetailShape } from "../shapes";
import { ErrorHandler } from "../errors";

class RDService {
  recipe = async ({ params }: Request) =>
    await recipeRepository.findOne({ recipeId: params.id });

  rdCreator = async (req: Request): Promise<AssertsShape<any>> => {
    const myRecipe = await this.recipe(req);

    const body = req.body;

    const detail: RecipeDetail = await recipeDetailRepository.save({
      ...body,
      recipe: myRecipe.recipeId,
    });
    return await recipeDetailShape.recipeDetailCreator.validate(detail, {
      stripUnknown: true,
    });
  };

  rdLoader = async (req: Request) => {
    const details: RecipeDetail[] = await recipeDetailRepository.all();
    return {
      status: 200,
      recipeDetails: details,
    };
  };

  rdEditor = async (req: Request) => {
    const detail: RecipeDetail = await recipeDetailRepository.findOne({
      recipeDetailId: req.params.rdId,
    });

    if (!detail) {
      throw new ErrorHandler(404, "Detail not found");
    }

    Object.keys(req.body).forEach((key) => {
      if (req.body[key] && key !== "recipeDetailId") {
        detail[key] = req.body[key];
      }
    });

    const updatedDetail = await recipeDetailRepository.save(detail);
    return await recipeDetailShape.recipeDetailCreator.validate(updatedDetail, {
      stripUnknown: true,
    });
  };
}

export default new RDService();
