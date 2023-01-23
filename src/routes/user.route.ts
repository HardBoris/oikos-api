import { Router } from "express";
import { userController } from "../controllers";
import validadeSchema from "../middlewares/validateSchema.middleware";
import verifyUserExists from "../middlewares/verifyUserExists.middleware";
import { userShape } from "../shapes";

const userRouter = Router();

userRouter.post(
  "/users/register",
  validadeSchema(userShape.toCreateUser),
  verifyUserExists,
  userController.userCreator
);

/* userRouter.get(
    "/users",
    tokenValidator,
    ownerValidator,
    userController.loaderUser
  ); */

/* userRouter.post(
    "/users/login",
    validadeSchema(loginUserSchema),
    verifyUserNotExists,
    userController.loginUser
  ); */

/* userRouter.patch(
    "/users/update",
    tokenValidator,
    userValidator,
    validadeSchema(toUpdateUserSchema),
    userController.updateUser
  ); */

/* userRouter.delete(
    "/users/delete",
    validadeSchema(deleteUserSchema),
    userController.deleteUser
  ); */

export default userRouter;
