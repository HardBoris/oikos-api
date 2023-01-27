import { Request } from "express";
import { sign } from "jsonwebtoken";
import { Purchase, User } from "../entities";
import { userRepository } from "../repositories";
import { AssertsShape } from "yup/lib/object";
import { hash } from "bcrypt";
import * as dotenv from "dotenv";
import { purchaseShape, userShape } from "../shapes";
import purchaseRepository from "../repositories/purchase.repository";
dotenv.config();

interface ILogin {
  status: number;
  message: object;
}

class PurchaseService {
  purchaseUser = async ({ decoded }: Request) =>
    await userRepository.findOne({ userId: decoded.userId });

  purchaseCreator = async (req: Request): Promise<AssertsShape<any>> => {
    const user = await this.purchaseUser(req);

    const body = req.body;

    const purchase: Purchase = await purchaseRepository.save({
      ...body,
      user: user.userId,
    });
    return await purchaseShape.purchaseCreator.validate(purchase, {
      stripUnknown: true,
    });
  };

  purchaseLoader = async (req: Request) => {
    const purchases: Purchase[] = await purchaseRepository.all();
    return {
      status: 200,
      purchases: purchases,
    };
  };
}

export default new PurchaseService();
