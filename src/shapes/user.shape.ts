import * as yup from "yup";

class UserShape {
  toCreateUser = yup.object().shape({
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

  loginUser = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });

  toUpdateUser = yup.object().shape({
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

  deleteUser = yup.object().shape({
    userId: yup.string().uuid().required(),
  });
}

export default new UserShape();
