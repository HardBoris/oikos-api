import { Router } from "express";
import { rdController } from "../controllers";
import tokenValidator from "../middlewares/tokenValidator.middleware";
import validadeSchema from "../middlewares/validateSchema.middleware";
import { purchaseDetailShape } from "../shapes";

const recipeDetailRouter = Router();

recipeDetailRouter.post("/recipes/:id", tokenValidator, rdController.rdCreator);

recipeDetailRouter.get("/recipedetails", tokenValidator, rdController.rdLoader);

recipeDetailRouter.patch(
  "/recipedetails/:rdId",
  tokenValidator,
  // validadeSchema(purchaseDetailShape.createdPurchaseDetail),
  rdController.rdEditor
);
export default recipeDetailRouter;
