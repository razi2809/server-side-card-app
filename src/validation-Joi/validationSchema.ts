import Joi from "joi";

const validation = (schema: Joi.ObjectSchema, userInput: any) => {
  const { error } = schema.validate(userInput);
  if (!error) {
    //no errors
    return null;
  }
  let errorObj: Record<string, string> = {}; // Add index signature
  const { details } = error;
  for (let item of details) {
    let key = item.path[0];
    let { message } = item;
    errorObj[key] = message;
  }
  return errorObj;
};
export default validation;
