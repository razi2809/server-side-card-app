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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRouter = void 0;
const express_1 = require("express");
const models_1 = require("../config/database/model/models");
const validation_1 = require("../middleware/validation");
const user_service_1 = require("../service/user-service");
const isAdmin_1 = require("../middleware/validation/isAdmin");
const isAdminOrtheRegisterUser_1 = require("../middleware/validation/isAdminOrtheRegisterUser");
const error_1 = require("../error/error");
const router = (0, express_1.Router)();
exports.UsersRouter = router;
router.post("/", validation_1.validatUserRegistration, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const saved = yield user_service_1.userService.createUser(req.body);
        const _a = req.body, { password } = _a, rest = __rest(_a, ["password"]);
        res.status(201).json({
            message: "saved successfully",
            user: rest,
        });
    }
    catch (err) {
        return next(err);
    }
}));
router.get("/", isAdmin_1.isAdmin, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield models_1.User.find().lean();
        const usersWithoutPassword = users.map((user) => {
            const { password } = user, rest = __rest(user, ["password"]);
            return rest;
        });
        res.status(200).json({
            message: "users fetched successfully",
            users: usersWithoutPassword,
        });
    }
    catch (err) {
        return next(err);
    }
}));
router.post("/login", validation_1.validatUserLogin, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const { jwt, user } = yield user_service_1.userService.validateUser(body.email, body.password);
        res.status(201).json({ jwt: jwt });
    }
    catch (err) {
        return next(err);
    }
}));
router.get("/:id", isAdminOrtheRegisterUser_1.isAdminOrtheRegisterUser, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (user) {
            const { password } = user, rest = __rest(user, ["password"]);
            res.status(200).json({
                message: "user fetched successfully",
                user: rest,
            });
        }
        else {
            return res.status(400).json({ message: "user not found" });
        }
    }
    catch (err) {
        return next(err);
    }
}));
router.put("/:id", validation_1.validateToUpdateUser, isAdminOrtheRegisterUser_1.isAdminOrtheRegisterUser, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const PrevUserId = req.params.id;
        const user = req.body;
        if (user) {
            const update = yield user_service_1.userService.updateUser(PrevUserId, user);
            if (update) {
                res.status(200).json({ message: "User updated successfully" });
            }
        }
        else
            return res.status(400).json("user not found");
    }
    catch (error) {
        return next(new error_1.myError("could'nt update", 400));
    }
}));
router.delete("/:id", isAdminOrtheRegisterUser_1.isAdminOrtheRegisterUser, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleteUser = yield user_service_1.userService.deleteUser(id);
        if (deleteUser instanceof error_1.myError) {
            throw new Error();
        }
        else if (deleteUser) {
            res.status(200).json({ message: "user deleted successfully" });
        }
    }
    catch (e) {
        return next(new error_1.myError("could'nt delete", 400));
    }
}));
