import { Router } from "express";
import { purchaseController } from "../controllers";
import tokenValidator from "../middlewares/tokenValidator.middleware";

const purchaseDetailRouter = Router();

purchaseDetailRouter.post(
  "/purchases/:id",
  tokenValidator,
  purchaseController.purchaseCreator
);
export default purchaseDetailRouter;
