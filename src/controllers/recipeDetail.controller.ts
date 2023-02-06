import { Request, Response } from "express";
import { rdService } from "../services";

class RDController {
  rdCreator = async (req: Request, res: Response) => {
    const detail = await rdService.rdCreator(req);
    return res.status(201).json(detail);
  };

  rdLoader = async (req: Request, res: Response) => {
    const { status, recipeDetails } = await rdService.rdLoader(req);
    return res.status(status).json(recipeDetails);
  };

  rdEditor = async (req: Request, res: Response) => {
    const detail = await rdService.rdEditor(req);
    return res.status(200).json(detail);
  };
}

export default new RDController();
