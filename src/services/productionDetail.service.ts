import { Request } from "express";
import { ProductionDetail } from "../entities";
import {
  proDetRepository,
  productionRepository,
  recipeRepository,
} from "../repositories";
import { AssertsShape } from "yup/lib/object";
import { productionDetailShape } from "../shapes";
import { ErrorHandler } from "../errors";

class ProDetService {
  production = async ({ params }: Request) =>
    await productionRepository.findOne({ productionId: params.id });

  recipe = async ({ body }: Request) =>
    await recipeRepository.findOne({ recipeName: body.recipeName });

  prodetCreator = async (req: Request): Promise<AssertsShape<any>> => {
    const myProduction = await this.production(req);

    const body = req.body;

    let recipe = await this.recipe(req);

    const detail: ProductionDetail = await proDetRepository.save({
      ...body,
      production: myProduction.productionId,
      recipe: recipe.recipeId,
    });
    return await productionDetailShape.productionDetailCreator.validate(
      detail,
      {
        stripUnknown: true,
      }
    );
  };

  prodetLoader = async (req: Request) => {
    const details: ProductionDetail[] = await proDetRepository.all();
    return {
      status: 200,
      productionDetails: details,
    };
  };

  prodetEditor = async (req: Request) => {
    const detail: ProductionDetail = await proDetRepository.findOne({
      productionDetailId: req.params.pdId,
    });

    if (!detail) {
      throw new ErrorHandler(404, "Detail not found");
    }

    Object.keys(req.body).forEach((key) => {
      if (req.body[key] && key !== "productionDetailId") {
        detail[key] = req.body[key];
      }
    });

    const updatedDetail = await proDetRepository.save(detail);
    return await productionDetailShape.productionDetailCreator.validate(
      updatedDetail,
      {
        stripUnknown: true,
      }
    );
  };
}

export default new ProDetService();
