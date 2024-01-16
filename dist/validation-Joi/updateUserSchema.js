"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const phonePattern_1 = require("./patterns/phonePattern");
const updateUserSchema = joi_1.default.object({
    name: joi_1.default.object({
        first: joi_1.default.string().min(2).max(256).required(),
        middle: joi_1.default.string().min(2).max(256).allow(""),
        last: joi_1.default.string().min(2).max(256).required(),
    }),
    phone: joi_1.default.string().min(9).max(11).pattern(phonePattern_1.phonePattern).required(),
    createdAt: joi_1.default.date().default(Date.now),
    address: joi_1.default.object({
        houseNumber: joi_1.default.number().required(),
        street: joi_1.default.string().min(2).max(256).required(),
        city: joi_1.default.string().min(2).max(256).required(),
        state: joi_1.default.string().min(2).max(256).allow(""),
        country: joi_1.default.string().min(2).max(256).required(),
        zip: joi_1.default.number(),
    }),
    image: joi_1.default.object({
        alt: joi_1.default.string().allow(""),
        url: joi_1.default.string().allow(""),
    }),
});
exports.updateUserSchema = updateUserSchema;
