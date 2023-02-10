import { Request, Response } from "express";
import { proDetService } from "../services";

class ProDetController {
  prodetCreator = async (req: Request, res: Response) => {
    const detail = await proDetService.prodetCreator(req);
    return res.status(201).json(detail);
  };

  prodetLoader = async (req: Request, res: Response) => {
    const { status, productionDetails } = await proDetService.prodetLoader(req);
    return res.status(status).json(productionDetails);
  };

  prodetEditor = async (req: Request, res: Response) => {
    const detail = await proDetService.prodetEditor(req);
    return res.status(200).json(detail);
  };
}

export default new ProDetController();
