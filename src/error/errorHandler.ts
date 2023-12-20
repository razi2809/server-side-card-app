import { ErrorRequestHandler } from "express";
import { myError } from "./error";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof myError) {
    return res.status(err.status).json({
      message: err.message,
    });
  }
  if (err.code && err.code == 11000 && err.keyPattern && err.keyValue) {
    return res.status(400).json({
      message: "Duplicate Key - Must be Unique",
      property: err.keyValue,
      index: err.keyPattern,
    });
  }
  if (err instanceof SyntaxError) {
    return res.status(400).json({
      message: "invalid json",
    });
  }
  // if(err.code === 11000 && ){}
  return res.status(500).json({
    message: err.message,
  });
};
export { errorHandler };
