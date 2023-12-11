import mongoose from "mongoose";
import { userSchema } from "../schema/schema";

const User = mongoose.model("User", userSchema);

export { User };
