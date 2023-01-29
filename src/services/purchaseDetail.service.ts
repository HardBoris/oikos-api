import { Request } from "express";
import { PurchaseDetail } from "../entities";
import { purchaseDetailRepository } from "../repositories";
import { AssertsShape } from "yup/lib/object";
import * as dotenv from "dotenv";
import { purchaseDetailShape } from "../shapes";
dotenv.config();

class PDService {
  pdCreator = async ({ body }: Request): Promise<AssertsShape<any>> => {
    const detail: PurchaseDetail = await purchaseDetailRepository.save(body);
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
}

export default new PDService();
