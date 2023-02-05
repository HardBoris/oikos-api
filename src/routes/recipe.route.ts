import { Router } from "express";
import { recipeController } from "../controllers";
import tokenValidator from "../middlewares/tokenValidator.middleware";

const recipeRouter = Router();

recipeRouter.post("/recipes", tokenValidator, recipeController.recipeCreator);

recipeRouter.get("/recipes", tokenValidator, recipeController.recipeLoader);
export default recipeRouter;
