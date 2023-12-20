import Joi from "joi";
import { IAddress, IImage, IName, IUser } from "../@types/user";
import { phonePattern } from "./patterns/phonePattern";

const updateUserSchema = Joi.object<IUser>({
  name: Joi.object<IName>({
    first: Joi.string().min(2).max(256).required(),
    middle: Joi.string().min(2).max(256).allow(""),
    last: Joi.string().min(2).max(256).required(),
  }),
  phone: Joi.string().min(9).max(11).pattern(phonePattern).required(),
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

export { updateUserSchema };
