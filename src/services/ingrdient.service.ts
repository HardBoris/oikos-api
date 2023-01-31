import { Request } from "express";
import { Ingredient } from "../entities";
import { ingredientRepository } from "../repositories";
import { AssertsShape } from "yup/lib/object";
import * as dotenv from "dotenv";
import { ingredientShape } from "../shapes";
dotenv.config();

class IngredientService {
  ingredientCreator = async ({ body }: Request): Promise<AssertsShape<any>> => {
    const ingredient: Ingredient = await ingredientRepository.save(body);
    return await ingredientShape.ingredientCreator.validate(ingredient, {
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
