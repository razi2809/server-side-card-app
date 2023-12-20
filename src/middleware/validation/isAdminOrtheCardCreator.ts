import { Request, RequestHandler } from "express";
import { IUser } from "../../@types/user";
import { extractToken } from "./isAdmin";
import authService from "../../service/auth-service";
import { myError } from "../../error/error";
import { cardService } from "../../service/card-service";
import { Icard } from "../../@types/card";

const isAdminOrtheCardCreator: RequestHandler = async (req, res, next) => {
  const token = extractToken(req);
  const { id } = req.params;
  if (!token) {
    return next(new myError("wrong or missing token", 400));
  } else {
    const tokenType = authService.validateToken(token);
    if (tokenType instanceof myError) {
      return next(tokenType);
    } else {
      const { email, userId } = tokenType;
      const user = await authService.findUserByEmail(email);
      const card = await cardService.getCardById(id);
      const isAdmin = user?.isAdmin ? true : false;
      if (!isAdmin) {
        if (card?.user_id.toString() != userId) {
          return next(
            new myError(
              "You must be an admin or the registered user to access this route",
              401
            )
          );
        }
      }
      req.card = card as Icard;
      return next();
    }
  }
};
export { isAdminOrtheCardCreator };
