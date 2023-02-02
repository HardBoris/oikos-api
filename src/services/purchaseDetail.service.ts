import { Request, Response } from "express";
import { Ingredient, PurchaseDetail } from "../entities";
import {
  ingredientRepository,
  purchaseDetailRepository,
  purchaseRepository,
} from "../repositories";
import { AssertsShape } from "yup/lib/object";
import * as dotenv from "dotenv";
import { purchaseDetailShape } from "../shapes";
dotenv.config();

class PDService {
  purchase = async ({ params }: Request) =>
    await purchaseRepository.findOne({ purchaseId: params.id });

  ingredient = async ({ body }: Request) =>
    await ingredientRepository.findOne({ ingredientName: body.ingredientName });

  pdCreator = async (req: Request): Promise<AssertsShape<any>> => {
    const myPurchase = await this.purchase(req);

    // const myIngredient = await this.ingredient(req);
    const body = req.body;

    let ingrediente = await this.ingredient(req);

    if (!ingrediente) {
      ingrediente = await ingredientRepository.save({
        ingredientName: body.ingredientName,
        measurementUnit: body.measurementUnit,
      });
    }

    const detail: PurchaseDetail = await purchaseDetailRepository.save({
      ...body,
      purchase: myPurchase.purchaseId,
      ingredient: ingrediente.ingredientId,
    });
    return await purchaseDetailShape.purchaseDetailCreator.validate(detail, {
      stripUnknown: true,
    });
  };

  pdLoader = async (req: Request) => {
    const details: PurchaseDetail[] = await purchaseDetailRepository.all();
    return {
      status: 200,
      purchaseDetails: details,
    };
  };

  pdEditor = async (req: Request) => {
    const detail: PurchaseDetail = await purchaseDetailRepository.findOne({
      purchaseDetailId: req.params.pdId,
    });
    console.log(detail);

    Object.keys(req.body).forEach((key) => {
      if (req.body[key] && key !== "purchaseDetailId") {
        detail[key] = req.body[key];
      }
    });

    const updatedDetail = await purchaseDetailRepository.save(detail);
    return await purchaseDetailShape.createdPurchaseDetail.validate(
      updatedDetail,
      {
        stripUnknown: true,
      }
    );
    // return updatedDetail;
  };
}

export default new PDService();
