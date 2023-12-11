import { ObjectSchema } from "joi";
import { IUser } from "../@types/user";

const validation = (schema: ObjectSchema, userInput: any) => {
  const { error } = schema.validate(userInput, { abortEarly: false });
  if (!error) {
    //no errors
    return null;
  }
  let errorObj: { [key: string]: string } = {}; // Add index signature
  const { details } = error;
  for (let item of details) {
    let key = item.path[0];
    let { message } = item;
    errorObj[key] = message;
  }
  return errorObj;
};
export default validation;
