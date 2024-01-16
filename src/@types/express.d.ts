import { IUser, JWTpayload } from "./user";
import { User, Card } from "../config/database/model/models";
import { Icard } from "./card";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
      JWT?: JWTpayload;
      card?: Icard;
    }
  }
}
