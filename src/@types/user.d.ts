import { ObjectIdExpression } from "mongoose";

type IName = {
  first: string;
  middle: string;
  last: string;
};
type IAddress = {
  houseNumber: number;
  street: string;
  city: string;
  state?: string;
  country: string;
  zip?: string;
};
type IImage = {
  alt?: string;
  url?: string;
};
type IUser = {
  phone: string;
  email: string;
  password: string;
  isAdmin?: boolean;
  isBusiness: boolean;
  createdAt?: Date;
  name: IName;
  address: IAddress;
  image: IImage;
};
type ILogin = {
  email: string;
  password: string;
};
type JWTpayload = {
  email: string;
  iat?: string;
  userId: TypeExpressionOperatorReturningObjectId;
};

export { IUser, IName, IAddress, IImage, ILogin, JWTpayload };
