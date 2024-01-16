"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardSchema = exports.imageSchema = exports.addressSchema = exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
const nameSchema = new mongoose_1.Schema({
    first: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255,
        default: "",
    },
    middle: { type: String, required: false, maxlength: 255 },
    last: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255,
        default: "",
    },
});
const addressSchema = new mongoose_1.Schema({
    houseNumber: { type: Number, required: true },
    street: { type: String, required: true, minlength: 2, maxlength: 255 },
    city: { type: String, required: true, minlength: 2, maxlength: 255 },
    state: { type: String, required: false, maxlength: 255 },
    country: { type: String, required: true, minlength: 2, maxlength: 255 },
    zip: { type: String, required: false, maxlength: 255 },
});
exports.addressSchema = addressSchema;
const imageSchema = new mongoose_1.Schema({
    alt: { type: String, default: "user profile" },
    url: {
        type: String,
        default: "http://www.hotavatars.com/wp-content/uploads/2019/01/I80W1Q0.png",
    },
});
exports.imageSchema = imageSchema;
const userSchema = new mongoose_1.Schema({
    phone: { type: String, required: true, unique: false },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 255,
    },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    isBusiness: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    name: nameSchema,
    address: addressSchema,
    image: imageSchema,
});
exports.userSchema = userSchema;
const cardSchema = new mongoose_1.Schema({
    phone: { type: String, required: true, unique: false },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 255,
    },
    description: { type: String, required: true },
    likes: { type: Array },
    web: { type: String, required: true },
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    address: addressSchema,
    image: imageSchema,
    user_id: { type: String, required: true },
});
exports.cardSchema = cardSchema;
