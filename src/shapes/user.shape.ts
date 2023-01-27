import * as yup from "yup";

class UserShape {
  userCreator = yup.object().shape({
    userName: yup.string().notRequired(),
    email: yup.string().email().lowercase().required(),
    password: yup.string().required(),
  });

  createdUser = yup.object().shape({
    userId: yup.string().uuid().required(),
    email: yup.string().email().required(),
    userName: yup.string().required(),
    createdAt: yup.string().required(),
  });

  userLoger = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });

  userUpdater = yup.object().shape({
    userId: yup.string().uuid().required(),
    email: yup.string().email().optional(),
    userName: yup.string().optional(),
  });

  updatedUser = yup.object().shape({
    userId: yup.string().uuid().required(),
    email: yup.string().email().required(),
    userName: yup.string().required(),
    updatedAt: yup.string().required(),
  });

  userDeleter = yup.object().shape({
    userId: yup.string().uuid().required(),
  });
}

export default new UserShape();
