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
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBusiness = void 0;
const models_1 = require("../../config/database/model/models");
const error_1 = require("../../error/error");
const isBusiness = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = (_a = req.JWT) === null || _a === void 0 ? void 0 : _a.userId;
        const user = yield models_1.User.findOne({ _id: id });
        if (!user) {
            return next(new error_1.myError("User not found", 401));
        }
        if (user === null || user === void 0 ? void 0 : user.isBusiness) {
            next();
        }
        else
            return next(new error_1.myError("user must be business type user", 403));
    }
    catch (err) {
        return next(err);
    }
});
exports.isBusiness = isBusiness;
