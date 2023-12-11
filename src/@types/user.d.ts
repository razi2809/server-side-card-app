type IName = {
  firstName: string;
  middleName: string;
  lastName: string;
};
type IAddress = {
  houseNumber: number;
  street: string;
  city: string;
  state?: string;
  contry: string;
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
  isBusniess: boolean;
  createdAt?: Date;
  name: IName;
  address: IAddress;
  image: IImage;
};

export { IUser, IName, IAddress, IImage };
