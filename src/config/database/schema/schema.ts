import { Schema } from "mongoose";
import { IAddress, IImage, IName, IUser } from "../../../@types/user";
import { Icard } from "../../../@types/card";
const nameSchema = new Schema<IName>({
  first: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
    default: "",
  },
  middle: { type: String, required: false,  maxlength: 255 },
  last: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
    default: "",
  },
});
const addressSchema = new Schema<IAddress>({
  houseNumber: { type: Number, required: true },
  street: { type: String, required: true, minlength: 2, maxlength: 255 },
  city: { type: String, required: true, minlength: 2, maxlength: 255 },
  state: { type: String, required: false, maxlength: 255 },
  country: { type: String, required: true, minlength: 2, maxlength: 255 },
  zip: { type: String, required: false,maxlength: 255 },
});
const imageSchema = new Schema<IImage>({
  alt: { type: String, default: "user profile" },
  url: {
    type: String,
    default: "http://www.hotavatars.com/wp-content/uploads/2019/01/I80W1Q0.png",
  },
});
const userSchema = new Schema<IUser>({
  phone: { type: String, required: true, unique: false },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 255,
  },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  isBusiness: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  name: nameSchema,
  address: addressSchema,
  image: imageSchema,
});
const cardSchema = new Schema<Icard>({
  phone: { type: String, required: true, unique: false },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 255,
  },
  description: { type: String, required: true },
  likes: { type: Array },
  web: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  address: addressSchema,
  image: imageSchema,
  user_id: { type: String, required: true },
});
export { userSchema, addressSchema, imageSchema, cardSchema };
