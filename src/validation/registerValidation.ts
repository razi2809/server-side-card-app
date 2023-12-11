import Joi from "joi";
import validation from "./validation";
import { IAddress, IImage, IName, IUser } from "../@types/user";

const registerSchema = Joi.object<IUser>({
  name: Joi.object<IName>({
    firstName: Joi.string().min(2).max(256).required(),
    middleName: Joi.string().min(2).max(256).allow(""),
    lastName: Joi.string().min(2).max(256).required(),
  }),
  phone: Joi.string()
    .min(9)
    .max(11)
    .pattern(/^\+?(972|0)(\-)?0?(([23489]{1}\d{7})|[5]{1}\d{8})$/)
    .required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .min(5)
    .required(),
  password: Joi.string()
    .pattern(
      new RegExp(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*-])[A-Za-z\d!@#$%^&*-]{6,}$/
      )
    )
    .messages({
      "string.pattern.base": "the password should be...",
      "string.empty":
        "password must be filled with something that you will forget",
    })
    .min(7)
    .max(20)
    .required(),
  isAdmin: Joi.boolean().default(false),
  isBusniess: Joi.boolean().default(false),
  createdAt: Joi.date().default(Date.now),
  address: Joi.object<IAddress>({
    houseNumber: Joi.number().required(),
    street: Joi.string().min(2).max(256).required(),
    city: Joi.string().min(2).max(256).required(),
    state: Joi.string().min(2).max(256).allow(""),
    contry: Joi.string().min(2).max(256).required(),
    zip: Joi.string().min(2).max(256).allow(""),
  }),
  image: Joi.object<IImage>({
    alt: Joi.string().allow(""),
    url: Joi.string().allow(""),
  }),
});

const validateRegister = (inputToCheck: IUser) =>
  validation(registerSchema, inputToCheck);

export { validateRegister };
