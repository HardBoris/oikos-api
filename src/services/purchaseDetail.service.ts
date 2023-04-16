import { Request } from "express";
import { Ingredient, PurchaseDetail } from "../entities";
import {
  ingredientRepository,
  purchaseDetailRepository,
  purchaseRepository,
} from "../repositories";
import { AssertsShape } from "yup/lib/object";
import { purchaseDetailShape } from "../shapes";
import { ErrorHandler } from "../errors";
import { TPDetails } from "../types";

class PDService {
  purchase = async ({ params }: Request) =>
    await purchaseRepository.findOne({ purchaseId: params.id });

  ingredient = async ({ body }: Request) =>
    await ingredientRepository.findOne({ ingredientName: body.ingredientName });

  pdCreator = async (req: Request): Promise<AssertsShape<any>> => {
    const myPurchase = await this.purchase(req);

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
    return await purchaseDetailShape.purchaseDetail.validate(detail, {
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

    if (!detail) {
      throw new ErrorHandler(404, "Detail not found");
    }

    Object.keys(req.body).forEach((key) => {
      if (req.body[key] && key !== "purchaseDetailId") {
        detail[key] = req.body[key];
      }
    });

    const updatedDetail = await purchaseDetailRepository.save(detail);
    return await purchaseDetailShape.purchaseDetail.validate(updatedDetail, {
      stripUnknown: true,
    });
  };

  detailsCreator = async (req: Request) => {
    const myPurchase = await this.purchase(req);

    const body = req.validated as TPDetails;

    if (!body.purchaseDetails.length) {
      throw new ErrorHandler(400, "Purchase arrays can not be empty!");
    }

    const otro = body.purchaseDetails.map((item) => ({
      ...item,
      purchase: myPurchase.purchaseId,
    }));

    const purchaseDetails: PurchaseDetail[] =
      await purchaseDetailRepository.saveMany(otro);
    return await purchaseDetailShape.detailsCreator.validate(purchaseDetails, {
      stripUnknown: true,
    });
  };
}

export default new PDService();
