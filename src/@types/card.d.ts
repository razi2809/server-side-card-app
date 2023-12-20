import { IAddress, IImage } from "./user";

type Icard = {
  image: IImage;
  address: IAddress;
  web: string;
  email: string;
  description: string;
  phone: string;
  subtitle: string;
  title: string;
  createdAt?: Date;
  likes: Array;
  user_id: string;
};

export { Icard };
