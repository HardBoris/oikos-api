import { Router } from "express";
import { purchaseController } from "../controllers";
import tokenValidator from "../middlewares/tokenValidator.middleware";

const purchaseRouter = Router();

purchaseRouter.post(
  "/purchases",
  tokenValidator,
  purchaseController.purchaseCreator
);
export default purchaseRouter;
