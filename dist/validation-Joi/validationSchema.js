"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validation = (schema, userInput) => {
    const { error } = schema.validate(userInput);
    if (!error) {
        //no errors
        return null;
    }
    let errorObj = {}; // Add index signature
    const { details } = error;
    for (let item of details) {
        let key = item.path[0];
        let { message } = item;
        errorObj[key] = message;
    }
    return errorObj;
};
exports.default = validation;
