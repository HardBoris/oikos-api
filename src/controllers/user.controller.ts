import { Request, Response } from "express";
import { userService } from "../services";

class UserController {
  userCreator = async (req: Request, res: Response) => {
    const user = await userService.userCreator(req);
    return res.status(201).json(user);
  };

  userLoader = async (req: Request, res: Response) => {
    const { status, users } = await userService.userLoader(req);
    return res.status(status).json(users);
  };
}

export default new UserController();
