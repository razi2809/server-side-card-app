import { RequestHandler } from "express";
import { ObjectSchema } from "joi";
import validation from "../../validation-Joi/validationSchema";

type validateRequest = (schema: ObjectSchema) => RequestHandler;
const validateRequest: validateRequest = (schema) => (req, res, next) => {
  const error = validation(schema, req.body);
  if (!error) return next();
  return res.status(400).json(error);
};
export { validateRequest };
