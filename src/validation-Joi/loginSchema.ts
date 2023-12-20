import Joi from "joi";
import { ILogin } from "../@types/user";
import { passwordPattern } from "./patterns/passwordPattern";

const loginSchema = Joi.object<ILogin>({
  email: Joi.string().email().required(),
  password: Joi.string().required().pattern(passwordPattern),
});
export { loginSchema };
