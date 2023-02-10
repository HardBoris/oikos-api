import { Router } from "express";
import { proDetController } from "../controllers";
import tokenValidator from "../middlewares/tokenValidator.middleware";

const productionDetailRouter = Router();

productionDetailRouter.post(
  "/productions/:id",
  tokenValidator,
  proDetController.prodetCreator
);

productionDetailRouter.get(
  "/productiondetails",
  tokenValidator,
  proDetController.prodetLoader
);

productionDetailRouter.patch(
  "/productiondetails/:prodetId",
  tokenValidator,
  proDetController.prodetEditor
);
export default productionDetailRouter;
