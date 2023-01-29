import { Request } from "express";
import { Ingredient, Purchase } from "../entities";
import { ingredientRepository, userRepository } from "../repositories";
import { AssertsShape } from "yup/lib/object";
import * as dotenv from "dotenv";
import { purchaseShape } from "../shapes";
import { purchaseRepository } from "../repositories";
import ingredientShape from "../shapes/ingredient.shape";
dotenv.config();

class IngredientService {
  ingredientCreator = async ({ body }: Request): Promise<AssertsShape<any>> => {
    const ingredient: Ingredient = await ingredientRepository.save(body);
    return await ingredientShape.ingredient.validate(ingredient, {
      stripUnknown: true,
    });
  };

  ingredientsLoader = async (req: Request) => {
    const ingredients: Ingredient[] = await ingredientRepository.all();
    return {
      status: 200,
      ingredients: ingredients,
    };
  };
}

export default new IngredientService();
