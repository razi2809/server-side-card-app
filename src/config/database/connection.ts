import mongoose from "mongoose";
import { configEnv } from "../EnvExtracter";
const connect = async () => {
  
  try {
    if (process.env.DB_CONNECTION_STRING) {
      await mongoose.connect(process.env.DB_CONNECTION_STRING);
      console.log("MongoDB connected");
    } else {
      console.log("connectionString is undefined");
    }
  } catch (error) {
    console.log(error);
  }
};
export { connect };
