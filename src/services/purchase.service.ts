import { Request } from "express";
import { Purchase } from "../entities";
import { userRepository } from "../repositories";
import { AssertsShape } from "yup/lib/object";
import { purchaseShape } from "../shapes";
import { purchaseRepository } from "../repositories";

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

  purchaseEliminator = async (req: Request) => {
    console.log(req.params);
    await purchaseRepository.delete(req.params.id);
    return {
      status: 200,
      message: "item deletado",
    };
  };
}

export default new PurchaseService();
