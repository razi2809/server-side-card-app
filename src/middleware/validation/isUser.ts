import { Request, RequestHandler } from "express";
import { myError } from "../../error/error";
import authService from "../../service/auth-service";
import { extractToken } from "./isAdmin";
import { IUser } from "../../@types/user";

const isUser: RequestHandler = async (req, res, next) => {
  const token = extractToken(req);
  const { id } = req.params;
  if (!token) {
    return next(new myError("wrong or missing token", 400));
  } else {
    const tokenType = authService.validateToken(token);
    if (tokenType instanceof myError) {
      return next(tokenType);
    } else {
      const { email } = tokenType;
      const user = await authService.findUserByEmail(email);

      if (user?._id.toString() !== id) {
        return next(
          new myError(
            "You must be the registered user to access this route",
            401
          )
        );
      }

      req.user = user as IUser;
      return next();
    }
  }
};
export { isUser };
