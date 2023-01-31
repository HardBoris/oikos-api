import { Express } from "express";
import ingredientRouter from "./ingredient.route";
import purchaseRouter from "./purchase.route";
import purchaseDetailRouter from "./purchaseDetail.route";
import userRouter from "./user.route";

const registerRouters = (app: Express): void => {
  app.use(userRouter);
  app.use(purchaseRouter);
  app.use(ingredientRouter);
  app.use(purchaseDetailRouter);
};

export default registerRouters;
