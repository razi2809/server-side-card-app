import { Router } from "express";
import { User } from "../config/database/model/models";
import { ILogin, IUser } from "../@types/user";
import {
  validatUserLogin,
  validatUserRegistration,
  validateToUpdateUser,
} from "../middleware/validation";
import { userService } from "../service/user-service";
import { isAdmin } from "../middleware/validation/isAdmin";
import { isAdminOrtheRegisterUser } from "../middleware/validation/isAdminOrtheRegisterUser";
import { myError } from "../error/error";
import { isUser } from "../middleware/validation/isUser";
const router = Router();
router.post("/", validatUserRegistration, async (req, res, next) => {
  try {
    const saved = await userService.createUser(req.body as IUser);
    const { password, ...rest } = req.body;
    res.status(201).json({
      message: "saved successfully",
      user: rest,
    });
  } catch (err) {
    return next(err);
  }
});
router.get("/", isAdmin, async (req, res, next) => {
  try {
    const users = await User.find().lean();
    const usersWithoutPassword = users.map((user) => {
      const { password, ...rest } = user;
      return rest;
    });
    res.status(200).json({
      message: "users fetched successfully",
      users: usersWithoutPassword,
    });
  } catch (err) {
    return next(err);
  }
});
router.post("/login", validatUserLogin, async (req, res, next) => {
  const body: ILogin = req.body;
  try {
    const { jwt, user } = await userService.validateUser(
      body.email,
      body.password
    );
    res.status(201).json({ jwt: jwt });
  } catch (err) {
    return next(err);
  }
});
router.get("/:id", isAdminOrtheRegisterUser, async (req, res, next) => {
  try {
    const user = req.user as IUser;
    if (user) {
      const { password, ...rest } = user;
      res.status(200).json({
        message: "user fetched successfully",
        user: rest,
      });
    } else {
      return res.status(400).json({ message: "user not found" });
    }
  } catch (err) {
    return next(err);
  }
});
router.put(
  "/:id",
  validateToUpdateUser,
  isAdminOrtheRegisterUser,
  async (req, res, next) => {
    try {
      const PrevUserId = req.params.id;
      const user = req.body;
      if (user) {
        const update = await userService.updateUser(PrevUserId, user);
        if (update) {
          res.status(200).json({ message: "User updated successfully" });
        }
      } else return res.status(400).json("user not found");
    } catch (error) {
      return next(error);
    }
  }
);
router.delete("/:id", isAdminOrtheRegisterUser, async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleteUser = await userService.deleteUser(id);
    if (deleteUser instanceof myError) {
      throw new Error();
    } else if (deleteUser) {
      res.status(200).json({ message: "user deleted successfully" });
    }
  } catch (e) {
    return next(new myError("could'nt delete", 400));
  }
});
export { router as UsersRouter };
