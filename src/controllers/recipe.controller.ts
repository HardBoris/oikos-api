import { Request, Response } from "express";
import { recipeService } from "../services";

class RecipeController {
  recipeCreator = async (req: Request, res: Response) => {
    const recipe = await recipeService.recipeCreator(req);
    return res.status(201).json(recipe);
  };

  recipeLoader = async (req: Request, res: Response) => {
    const { status, recipes } = await recipeService.recipeLoader(req);
    return res.status(status).json(recipes);
  };
}

export default new RecipeController();
