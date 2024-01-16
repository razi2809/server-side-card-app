"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const models_1 = require("../config/database/model/models");
const error_1 = require("../error/error");
const authService = {
    findUserByEmail: (email) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield models_1.User.findOne({ email: email }).lean();
        if (!user)
            return null;
        return user;
    }),
    findUserById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield models_1.User.findById(id).lean();
        if (!user)
            return null;
        return user;
    }),
    //bcrypt password
    hashPaswword: (plainTextPassword, rounds = 12) => {
        return bcrypt_1.default.hash(plainTextPassword, rounds);
    },
    //validate password
    validatePasswords: (plainTextPassword, userPassword) => {
        return bcrypt_1.default.compare(plainTextPassword, userPassword);
    },
    //generate token
    generateToken: (payload) => {
        const secret = process.env.JWT_SECRET;
        return jsonwebtoken_1.default.sign(payload, secret);
    },
    //validate token
    validateToken: (token) => {
        const secret = process.env.JWT_SECRET;
        try {
            const payload = jsonwebtoken_1.default.verify(token, secret);
            return payload;
        }
        catch (err) {
            return new error_1.myError("invalid token", 401);
        }
    },
};
exports.default = authService;
