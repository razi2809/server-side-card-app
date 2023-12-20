import { RequestHandler } from "express-serve-static-core";
import { User } from "../../config/database/model/models";
import { userService } from "../../service/user-service";
import authService from "../../service/auth-service";
import { myError } from "../../error/error";

const isBusiness: RequestHandler = async (req, res, next) => {
  try {
    const id = req.JWT?.userId;
    const user = await User.findOne({ _id: id });
    if (!user) {
      return next(new myError("User not found", 401));
    }
    if (user?.isBusiness) {
      next();
    } else return next(new myError("user must be business type user", 403));
  } catch (err) {
    return next(err);
  }
};
export { isBusiness };
