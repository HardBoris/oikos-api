import { Request, Response } from "express";
import { ingredientService, purchaseService } from "../services";

class IngredientController {
  ingredientCreator = async (req: Request, res: Response) => {
    const ingredient = await ingredientService.ingredientCreator(req);
    return res.status(201).json(ingredient);
  };

  ingredientLoader = async (req: Request, res: Response) => {
    const { status, ingredients } = await ingredientService.ingredientsLoader(
      req
    );
    return res.status(status).json(ingredients);
  };
}

export default new IngredientController();
