import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import { User } from "../config/database/model/models";
import { IUser, JWTpayload } from "../@types/user";
import { myError } from "../error/error";

const authService = {
  findUserByEmail: async (email: string) => {
    const user = await User.findOne({ email: email }).lean();
    if (!user) return null;

    return user;
  },
  findUserById: async (id: string) => {
    const user = await User.findById(id).lean();
    if (!user) return null;
    return user;
  },
  //bcrypt password
  hashPaswword: (plainTextPassword: string, rounds = 12) => {
    return bcrypt.hash(plainTextPassword, rounds);
  },
  //validate password
  validatePasswords: (plainTextPassword: string, userPassword: string) => {
    return bcrypt.compare(plainTextPassword, userPassword);
  },
  //generate token
  generateToken: (payload: JWTpayload) => {
    const secret = process.env.JWT_SECRET as string;

    return JWT.sign(payload, secret);
  },
  //validate token
  validateToken: (token: string) => {
    const secret = process.env.JWT_SECRET as string;

    try {
      const payload = JWT.verify(token, secret);

      return payload as JWTpayload;
    } catch (err) {
      return new myError("invalid token", 401);
    }
  },
};
export default authService;
