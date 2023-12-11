import { Schema } from "mongoose";
import { IAddress, IImage, IName, IUser } from "../../../@types/user";

const nameSchema = new Schema<IName>({
  firstName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
    default: "",
  },
  middleName: { type: String, required: false, minlength: 2, maxlength: 255 },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
    default: "",
  },
});
const adressSchema = new Schema<IAddress>({
  houseNumber: { type: Number, required: true },
  street: { type: String, required: true, minlength: 2, maxlength: 255 },
  city: { type: String, required: true, minlength: 2, maxlength: 255 },
  state: { type: String, required: false, minlength: 2, maxlength: 255 },
  contry: { type: String, required: true, minlength: 2, maxlength: 255 },
  zip: { type: String, required: false, minlength: 2, maxlength: 255 },
});
const imageSchema = new Schema<IImage>({
  alt: { type: String, default: "user profile" },
  url: {
    type: String,
    default: "http://www.hotavatars.com/wp-content/uploads/2019/01/I80W1Q0.png",
  },
});
const userSchema = new Schema<IUser>({
  phone: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 255,
  },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  isBusniess: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  name: nameSchema,
  address: adressSchema,
  image: imageSchema,
});
export { userSchema, adressSchema, imageSchema };
