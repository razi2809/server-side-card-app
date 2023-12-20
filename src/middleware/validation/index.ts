import { RequestHandler } from "express";
import { loginSchema } from "../../validation-Joi/loginSchema";
import { registerSchema } from "../../validation-Joi/registerSchema";
import { updateUserSchema } from "../../validation-Joi/updateUserSchema";
import { validateRequest } from "./validateRequest";
import { createCardSchema } from "../../validation-Joi/createCardValidate";
import { updateCardSchema } from "../../validation-Joi/updateCardValidate";

const validatUserRegistration = validateRequest(registerSchema);
const validatUserLogin = validateRequest(loginSchema);
const validateToUpdateUser = validateRequest(updateUserSchema);
const validateCard = validateRequest(createCardSchema);
const validateToUpdateCard = validateRequest(updateCardSchema);

export {
  validateToUpdateUser,
  validatUserRegistration,
  validatUserLogin,
  validateCard,
  validateToUpdateCard,
};
