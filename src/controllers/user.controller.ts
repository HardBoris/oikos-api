import { Request, Response } from "express";
import { userService } from "../services";

class UserController {
  userCreator = async (req: Request, res: Response) => {
    const user = await userService.userCreator(req);
    return res.status(201).json(user);
  };
}

export default new UserController();
