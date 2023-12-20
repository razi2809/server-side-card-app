import Joi from "joi";
import { IAddress, IImage } from "../@types/user";
import { phonePattern } from "./patterns/phonePattern";

const updateCardSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  title: Joi.string().min(2).max(256).required(),
  subtitle: Joi.string().min(2).max(256).required(),
  description: Joi.string().min(2).max(1024).required(),
  web: Joi.string().min(3).allow(""),
  image: Joi.object<IImage>({
    url: Joi.string().allow(""),
    alt: Joi.string().allow(""),
  }),
  phone: Joi.string().min(9).max(11).pattern(phonePattern).required(),
  address: Joi.object<IAddress>({
    houseNumber: Joi.number().required(),
    street: Joi.string().min(2).max(256).required(),
    city: Joi.string().min(2).max(256).required(),
    state: Joi.string().min(2).max(256).allow(""),
    country: Joi.string().min(2).max(256).required(),
    zip: Joi.number(),
  }),
});

export { updateCardSchema };
