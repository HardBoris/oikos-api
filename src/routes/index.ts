import { Express } from "express";
import purchaseRouter from "./purchase.route";
import userRouter from "./user.route";

const registerRouters = (app: Express): void => {
  app.use(userRouter);
  app.use(purchaseRouter);
};

export default registerRouters;
