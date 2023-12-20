import { JWTpayload } from "./user";
import { User, Card } from "../config/database/model/models";

declare global {
  namespace Express {
    interface Request {
      user?: User;
      JWT?: JWTpayload;
      card?: Card;
    }
  }
}
