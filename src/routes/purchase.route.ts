import { Router } from "express";
import { purchaseController } from "../controllers";
import tokenValidator from "../middlewares/tokenValidator.middleware";

const purchaseRouter = Router();

purchaseRouter.post(
  "/oikos-api/purchases",
  tokenValidator,
  purchaseController.purchaseCreator
);

purchaseRouter.get(
  "/oikos-api/purchases",
  tokenValidator,
  purchaseController.purchaseLoader
);
export default purchaseRouter;
