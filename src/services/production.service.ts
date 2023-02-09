import { Request } from "express";
import { Production } from "../entities";
import { productionRepository, userRepository } from "../repositories";
import { AssertsShape } from "yup/lib/object";
import { productionShape } from "../shapes";

class ProductionService {
  productionUser = async ({ decoded }: Request) =>
    await userRepository.findOne({ userId: decoded.userId });

  productionCreator = async (req: Request): Promise<AssertsShape<any>> => {
    const user = await this.productionUser(req);

    const body = req.body;

    const production: Production = await productionRepository.save({
      ...body,
      user: user.userId,
    });
    return await productionShape.productionCreator.validate(production, {
      stripUnknown: true,
    });
  };

  productionLoader = async (req: Request) => {
    const productions: Production[] = await productionRepository.all();
    return {
      status: 200,
      productions: productions,
    };
  };
}

export default new ProductionService();
