import { Request, Response } from "express";
import { purchaseService } from "../services";

class PurchaseController {
  purchaseCreator = async (req: Request, res: Response) => {
    const purchase = await purchaseService.purchaseCreator(req);
    console.log(req.body);
    return res.status(201).json(purchase);
  };

  purchaseLoader = async (req: Request, res: Response) => {
    const { status, purchases } = await purchaseService.purchaseLoader(req);
    return res.status(status).json(purchases);
  };

  purchaseEliminator = async (req: Request, res: Response) => {
    const { status, message } = await purchaseService.purchaseEliminator(req);
    return res.status(status).json(message);
  };
}

export default new PurchaseController();
