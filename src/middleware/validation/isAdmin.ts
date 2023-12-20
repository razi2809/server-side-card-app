import { Request, RequestHandler } from "express";
import { myError } from "../../error/error";
import authService from "../../service/auth-service";

const extractToken = (req: Request) => {
  const authHeader = req.header("Authorization");
  if (
    authHeader &&
    authHeader.length > 7 &&
    authHeader.toLowerCase().startsWith("bearer")
  ) {
    return authHeader.substring(7);
  }
  return null;
};
const isAdmin: RequestHandler = async (req, res, next) => {
  const token = extractToken(req);

  if (!token) {
    return res.status(401).json({
      message: "missing token",
    });
  } else {
    const tokenType = authService.validateToken(token);
    if (tokenType instanceof myError) {
      return next(tokenType);
    } else {
      const { email } = tokenType;
      const user = await authService.findUserByEmail(email);
      const isAdmin = user?.isAdmin ? true : false;
      if (!isAdmin) {
        return res
          .status(401)
          .json({ message: "must be admin to access this info" });
      }
      next();
    }
  }
};

export { isAdmin, extractToken };
