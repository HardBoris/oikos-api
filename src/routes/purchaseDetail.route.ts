import { Router } from "express";
import { pdController } from "../controllers";
import tokenValidator from "../middlewares/tokenValidator.middleware";
import validadeSchema from "../middlewares/validateSchema.middleware";
import { purchaseDetailShape } from "../shapes";

const purchaseDetailRouter = Router();

purchaseDetailRouter.post(
  "/oikos-api/purchases/:id",
  tokenValidator,
  pdController.pdCreator
);

purchaseDetailRouter.post(
  "/prueba/:id",
  tokenValidator,
  // validadeSchema(purchaseDetailShape.detailsCreator),
  pdController.detailsCreator
);

purchaseDetailRouter.get(
  "/oikos-api/purchases/:id",
  tokenValidator,
  pdController.pdLoader
);

purchaseDetailRouter.patch(
  "/purchasedetails/:pdId",
  tokenValidator,
  // validadeSchema(purchaseDetailShape.createdPurchaseDetail),
  pdController.pdEditor
);
export default purchaseDetailRouter;
