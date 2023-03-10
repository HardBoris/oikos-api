import { Request } from "express";
import { sign } from "jsonwebtoken";
import { User } from "../entities";
import { userRepository } from "../repositories";
import { AssertsShape } from "yup/lib/object";
import { hash } from "bcrypt";
import * as dotenv from "dotenv";
import { userShape } from "../shapes";
dotenv.config();

interface ILogin {
  status: number;
  message: object;
}

class UserService {
  userCreator = async ({ validated }: Request): Promise<AssertsShape<any>> => {
    validated.password = await hash(validated.password, 10);
    const user: User = await userRepository.save(validated);
    return await userShape.createdUser.validate(user, {
      stripUnknown: true,
    });
  };

  userLoader = async (req: Request) => {
    const users: User[] = await userRepository.all();
    return {
      status: 200,
      users: users,
    };
  };

  userLoger = async ({ validated }: Request): Promise<ILogin> => {
    const user: User = await userRepository.findOne({
      email: validated.email,
    });

    if (!user) {
      return {
        status: 401,
        message: { message: "Invalid credentials" },
      };
    }

    if (!(await user.comparePwd(validated.password))) {
      return {
        status: 401,
        message: { message: "Invalid credentials" },
      };
    }

    const token: string = sign({ ...user }, process.env.SECRET_KEY, {
      expiresIn: process.env.EXPIRES_IN,
    });

    return {
      status: 200,
      message: { user: user, token },
    };
  };

  updateUser = async ({ validated, decoded }: Request) => {
    const user: User = await userRepository.findOne({
      userId: decoded.userId,
    });

    Object.keys(validated).forEach((key) => {
      if (validated[key] && key !== "password" && key !== "userId") {
        user[key] = validated[key];
      }
    });
    const userUpdate = await userRepository.save(user);
    return await userShape.updatedUser.validate(userUpdate, {
      stripUnknown: true,
    });
  };

  passwordUpdater = async ({ validated }: Request) => {
    const user: User = await userRepository.findOne({
      userId: validated.userId,
    });
    if (validated) {
      user.password = validated.password;
    }

    const userUpdate = await userRepository.save(user);
    return await userShape.updatedUser.validate(userUpdate, {
      stripUnknown: true,
    });
  };

  deleteUser = async ({ validated }: Request) => {
    try {
      const user: User = await userRepository.findOne({
        userId: validated.userId,
      });

      await userRepository.elimina(user);

      return {
        status: 200,
        message: "User deleted",
      };
    } catch (error) {
      return {
        status: 404,
        message: "User not found",
      };
    }
  };
}

export default new UserService();
