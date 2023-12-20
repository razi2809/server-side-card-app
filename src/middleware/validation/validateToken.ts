import { Request, RequestHandler } from "express";
import { myError } from "../../error/error";
import authService from "../../service/auth-service";
import { JWTpayload } from "../../@types/user";

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
const validateToken: RequestHandler = (req, res, next) => {
  const token = extractToken(req);

  if (!token) {
    res.status(401).json({
      message: "unauthorized",
    });
  } else {
    const tokenType = authService.validateToken(token);
    if (tokenType instanceof myError) {
      return next(tokenType);
    } else {
      return next();
    }
  }
};
const extracIdFromToken: RequestHandler = async (req, res, next) => {
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
      const JWTpayLoad = tokenType;

      req.JWT = JWTpayLoad as JWTpayload;

      next();
    }
  }
};
export { validateToken, extracIdFromToken };
