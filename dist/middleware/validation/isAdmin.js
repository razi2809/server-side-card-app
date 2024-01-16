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
exports.extractToken = exports.isAdmin = void 0;
const error_1 = require("../../error/error");
const auth_service_1 = __importDefault(require("../../service/auth-service"));
const extractToken = (req) => {
    const authHeader = req.header("Authorization");
    if (authHeader &&
        authHeader.length > 7 &&
        authHeader.toLowerCase().startsWith("bearer")) {
        return authHeader.substring(7);
    }
    return null;
};
exports.extractToken = extractToken;
const isAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = extractToken(req);
    if (!token) {
        return res.status(401).json({
            message: "missing token",
        });
    }
    else {
        const tokenType = auth_service_1.default.validateToken(token);
        if (tokenType instanceof error_1.myError) {
            return next(tokenType);
        }
        else {
            const { email } = tokenType;
            const user = yield auth_service_1.default.findUserByEmail(email);
            const isAdmin = (user === null || user === void 0 ? void 0 : user.isAdmin) ? true : false;
            if (!isAdmin) {
                return res
                    .status(401)
                    .json({ message: "must be admin to access this info" });
            }
            next();
        }
    }
});
exports.isAdmin = isAdmin;
