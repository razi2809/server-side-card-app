import Joi from "joi";
import validation from "./validationSchema";
import { IAddress, IImage, IName, IUser } from "../@types/user";
import { phonePattern } from "./patterns/phonePattern";
import { passwordPattern } from "./patterns/passwordPattern";

const registerSchema = Joi.object<IUser>({
  name: Joi.object<IName>({
    first: Joi.string().min(2).max(256).required(),
    middle: Joi.string().min(2).max(256).allow(""),
    last: Joi.string().min(2).max(256).required(),
  }),
  phone: Joi.string().min(9).max(11).pattern(phonePattern).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .min(5)
    .required(),
  password: Joi.string()
    .pattern(passwordPattern)
    .messages({
      "string.pattern.base": "the password should be...",
      "string.empty":
        "password must be filled with something that you will forget",
    })
    .min(7)
    .max(20)
    .required(),
  isAdmin: Joi.boolean().default(false),
  isBusiness: Joi.boolean().default(false),
  createdAt: Joi.date().default(Date.now),
  address: Joi.object<IAddress>({
    houseNumber: Joi.number().required(),
    street: Joi.string().min(2).max(256).required(),
    city: Joi.string().min(2).max(256).required(),
    state: Joi.string().min(2).max(256).allow(""),
    country: Joi.string().min(2).max(256).required(),
    zip: Joi.number(),
  }),
  image: Joi.object<IImage>({
    alt: Joi.string().allow(""),
    url: Joi.string().allow(""),
  }),
});

export { registerSchema };
