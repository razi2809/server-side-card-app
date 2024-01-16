import { IUser } from "../@types/user";
import { User } from "../config/database/model/models";
import { myError } from "../error/error";
import authService from "./auth-service";
const userService = {
  createUser: async (userData: IUser) => {
    const user = new User(userData);
    user.password = await authService.hashPaswword(user.password);
    return user.save();
  },
  validateUser: async (email: string, password: string) => {
    try {
      const user = await authService.findUserByEmail(email);
      if (!user) {
        throw new myError("invalid credentials", 401);
      }
      const isValid = await authService.validatePasswords(
        password,
        user.password
      );

      if (!isValid) {
        throw new myError("invalid credentials", 401);
      }
      const jwt = authService.generateToken({
        email: user.email,
        userId: user._id,
      });
      return { jwt, user };
    } catch (err) {
      throw err;
    }
  },
  deleteUser: async (id: string) => {
    try {
      const deleteUser = await User.findOneAndDelete({ _id: id });
      if (deleteUser) {
        return "success";
      } else {
        return new myError("user not found", 404);
      }
    } catch (e) {
      return new myError("delete was unseccessful", 400);
    }
  },

  updateUser: async (prevUserId: string, newUser: IUser) => {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: prevUserId },
        newUser,
        { new: true }
      );
      if (!updatedUser) {
        return null;
      }
      return updatedUser;
    } catch (error) {
      throw new myError("Update operation failed", 500);
    }
  },
};
export { userService };
