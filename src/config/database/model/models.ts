import mongoose from "mongoose";
import { cardSchema, userSchema } from "../schema/schema";

const User = mongoose.model("User", userSchema);
const Card = mongoose.model("Card", cardSchema);
export { User, Card };
