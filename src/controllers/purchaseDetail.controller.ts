import { Request, Response } from "express";
import { pdService } from "../services";

class PDController {
  pdCreator = async (req: Request, res: Response) => {
    const detail = await pdService.pdCreator(req);
    return res.status(201).json(detail);
  };

  pdLoader = async (req: Request, res: Response) => {
    const { status, purchaseDetails } = await pdService.pdLoader(req);
    return res.status(status).json(purchaseDetails);
  };

  pdEditor = async (req: Request, res: Response) => {
    const detail = await pdService.pdEditor(req);
    return res.status(200).json(detail);
  };

  detailsCreator = async (req: Request, res: Response) => {
    const purchaseDetails = await pdService.detailsCreator(req);
    console.log(purchaseDetails);
    return res.status(200).json(purchaseDetails);
  };
}

export default new PDController();
