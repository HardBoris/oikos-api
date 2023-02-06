import { Express } from "express";
import ingredientRouter from "./ingredient.route";
import purchaseRouter from "./purchase.route";
import purchaseDetailRouter from "./purchaseDetail.route";
import recipeRouter from "./recipe.route";
import recipeDetailRouter from "./recipeDetail.route";
import userRouter from "./user.route";

const registerRouters = (app: Express): void => {
  app.use(userRouter);
  app.use(purchaseRouter);
  app.use(ingredientRouter);
  app.use(purchaseDetailRouter);
  app.use(recipeRouter);
  app.use(recipeDetailRouter);
};

export default registerRouters;
