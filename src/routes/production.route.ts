import { Router } from "express";
import { productionController } from "../controllers";
import tokenValidator from "../middlewares/tokenValidator.middleware";

const productionRouter = Router();

productionRouter.post(
  "/productions",
  tokenValidator,
  productionController.productionCreator
);

productionRouter.get(
  "/productions",
  tokenValidator,
  productionController.productionLoader
);
export default productionRouter;
