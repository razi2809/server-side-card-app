"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCardSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const phonePattern_1 = require("./patterns/phonePattern");
const updateCardSchema = joi_1.default.object({
    email: joi_1.default.string()
        .email({ tlds: { allow: false } })
        .required(),
    title: joi_1.default.string().min(2).max(256).required(),
    subtitle: joi_1.default.string().min(2).max(256).required(),
    description: joi_1.default.string().min(2).max(1024).required(),
    web: joi_1.default.string().min(3).allow(""),
    image: joi_1.default.object({
        url: joi_1.default.string().allow(""),
        alt: joi_1.default.string().allow(""),
    }),
    phone: joi_1.default.string().min(9).max(11).pattern(phonePattern_1.phonePattern).required(),
    address: joi_1.default.object({
        houseNumber: joi_1.default.number().required(),
        street: joi_1.default.string().min(2).max(256).required(),
        city: joi_1.default.string().min(2).max(256).required(),
        state: joi_1.default.string().min(2).max(256).allow(""),
        country: joi_1.default.string().min(2).max(256).required(),
        zip: joi_1.default.number(),
    }),
});
exports.updateCardSchema = updateCardSchema;
