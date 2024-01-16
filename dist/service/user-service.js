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
exports.userService = void 0;
const models_1 = require("../config/database/model/models");
const error_1 = require("../error/error");
const auth_service_1 = __importDefault(require("./auth-service"));
const userService = {
    createUser: (userData) => __awaiter(void 0, void 0, void 0, function* () {
        const user = new models_1.User(userData);
        user.password = yield auth_service_1.default.hashPaswword(user.password);
        return user.save();
    }),
    validateUser: (email, password) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield auth_service_1.default.findUserByEmail(email);
        if (!user) {
            throw new error_1.myError("invalid credentials", 401);
        }
        const isValid = yield auth_service_1.default.validatePasswords(password, user.password);
        if (!isValid) {
            throw new error_1.myError("invalid credentials", 401);
        }
        const jwt = auth_service_1.default.generateToken({
            email: user.email,
            userId: user._id,
        });
        return { jwt, user };
    }),
    deleteUser: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const deleteUser = yield models_1.User.findOneAndDelete({ _id: id });
            if (deleteUser) {
                return "success";
            }
            else {
                return new error_1.myError("user not found", 404);
            }
        }
        catch (e) {
            return new error_1.myError("delete was unseccessful", 400);
        }
    }),
    updateUser: (prevUserId, newUser) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const updatedUser = yield models_1.User.findOneAndUpdate({ _id: prevUserId }, newUser, { new: true });
            if (!updatedUser) {
                return null;
            }
            return updatedUser;
        }
        catch (error) {
            throw new error_1.myError("Update operation failed", 500);
        }
    }),
};
exports.userService = userService;
