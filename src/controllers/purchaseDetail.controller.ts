import { Request, Response } from "express";
import { pdService, purchaseService } from "../services";

class PDController {
  pdCreator = async (req: Request, res: Response) => {
    const detail = await pdService.pdCreator(req);
    return res.status(201).json(detail);
  };

  pdLoader = async (req: Request, res: Response) => {
    const { status, purchaseDetails } = await pdService.pdLoader(req);
    return res.status(status).json(purchaseDetails);
  };
}

export default new PDController();
