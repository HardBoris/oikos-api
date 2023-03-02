import { Router } from "express";
import { userController } from "../controllers";
import validadeSchema from "../middlewares/validateSchema.middleware";
import verifyUserExists from "../middlewares/verifyUserExists.middleware";
import { userShape } from "../shapes";

const userRouter = Router();

userRouter.post(
  "/oikos-api/users/register",
  validadeSchema(userShape.userCreator),
  verifyUserExists,
  userController.userCreator
);

userRouter.get(
  "/oikos-api/users",
  // tokenValidator,
  // ownerValidator,
  userController.userLoader
);

userRouter.post(
  "/oikos-api/users/login",
  validadeSchema(userShape.userLoger),
  // verifyUserNotExists,
  userController.userLoger
);

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
