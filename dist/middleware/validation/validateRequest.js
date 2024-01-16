"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const validationSchema_1 = __importDefault(require("../../validation-Joi/validationSchema"));
const validateRequest = (schema) => (req, res, next) => {
    const error = (0, validationSchema_1.default)(schema, req.body);
    if (!error)
        return next();
    return res.status(400).json(error);
};
exports.validateRequest = validateRequest;
