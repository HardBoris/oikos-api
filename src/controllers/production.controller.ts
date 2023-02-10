import { Request, Response } from "express";
import { productionService } from "../services";

class ProductionController {
  productionCreator = async (req: Request, res: Response) => {
    const production = await productionService.productionCreator(req);
    return res.status(201).json(production);
  };

  productionLoader = async (req: Request, res: Response) => {
    const { status, productions } = await productionService.productionLoader(
      req
    );
    return res.status(status).json(productions);
  };
}

export default new ProductionController();
