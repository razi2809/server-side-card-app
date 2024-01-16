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
exports.isAdminOrtheCardCreator = void 0;
const isAdmin_1 = require("./isAdmin");
const auth_service_1 = __importDefault(require("../../service/auth-service"));
const error_1 = require("../../error/error");
const card_service_1 = require("../../service/card-service");
const isAdminOrtheCardCreator = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
            const { email, userId } = tokenType;
            const user = yield auth_service_1.default.findUserByEmail(email);
            const card = yield card_service_1.cardService.getCardById(id);
            const isAdmin = (user === null || user === void 0 ? void 0 : user.isAdmin) ? true : false;
            if (!isAdmin) {
                if ((card === null || card === void 0 ? void 0 : card.user_id.toString()) != userId) {
                    return next(new error_1.myError("You must be an admin or the registered user to access this route", 401));
                }
            }
            req.card = card;
            return next();
        }
    }
});
exports.isAdminOrtheCardCreator = isAdminOrtheCardCreator;
