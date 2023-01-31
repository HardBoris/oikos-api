import { Router } from "express";
import { ingredientController, purchaseController } from "../controllers";
import tokenValidator from "../middlewares/tokenValidator.middleware";

const ingredientRouter = Router();

ingredientRouter.post(
  "/ingredients",
  tokenValidator,
  ingredientController.ingredientCreator
);
export default ingredientRouter;
