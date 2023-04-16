import { Request } from "express";
import { Purchase, PurchaseDetail } from "../entities";
import { userRepository } from "../repositories";
import { AssertsShape } from "yup/lib/object";
import { purchaseShape } from "../shapes";
import { purchaseRepository } from "../repositories";

class PurchaseService {
  purchaseUser = async ({ decoded }: Request) =>
    await userRepository.findOne({ userId: decoded.userId });

  sumator = (compra: Purchase) => {
    let purchaseTotal: number;

    let detalles = compra.purchaseDetails;

    if (detalles.length !== 0) {
      purchaseTotal = detalles.reduce((a, b) => a + b.ingredientPrice, 0);
    } else {
      purchaseTotal = 0;
    }

    return { ...compra, purchaseTotal };
  };

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

    const listPurchases = purchases.map((item) => this.sumator(item));

    return {
      status: 200,
      purchases: listPurchases,
    };
  };

  purchaseUnique = async (req: Request) => {
    const unique: Purchase = await purchaseRepository.findOne({
      purchaseId: req.params.id,
    });

    const miCompra = this.sumator(unique);

    return {
      status: 200,
      purchase: miCompra,
    };
  };

  purchaseEliminator = async (req: Request) => {
    await purchaseRepository.delete(req.params.id);
    return {
      status: 200,
      message: "item deletado",
    };
  };
}

export default new PurchaseService();
