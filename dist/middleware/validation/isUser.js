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
exports.isUser = void 0;
const error_1 = require("../../error/error");
const auth_service_1 = __importDefault(require("../../service/auth-service"));
const isAdmin_1 = require("./isAdmin");
const isUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = (0, isAdmin_1.extractToken)(req);
    const { id } = req.params;
    if (!token) {
        return next(new error_1.myError("wrong or missing token", 400));
    }
    else {
        const tokenType = auth_service_1.default.validateToken(token);
        if (tokenType instanceof error_1.myError) {
            return next(tokenType);
        }
        else {
            const { email } = tokenType;
            const user = yield auth_service_1.default.findUserByEmail(email);
            if ((user === null || user === void 0 ? void 0 : user._id.toString()) !== id) {
                return next(new error_1.myError("You must be the registered user to access this route", 401));
            }
            req.user = user;
            return next();
        }
    }
});
exports.isUser = isUser;
