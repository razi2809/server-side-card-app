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
exports.CardsRouter = void 0;
const express_1 = require("express");
const error_1 = require("../error/error");
const validation_1 = require("../middleware/validation");
const card_service_1 = require("../service/card-service");
const validateToken_1 = require("../middleware/validation/validateToken");
const models_1 = require("../config/database/model/models");
const isAdminOrtheCardCreator_1 = require("../middleware/validation/isAdminOrtheCardCreator");
const isBusiness_1 = require("../middleware/validation/isBusiness");
const router = (0, express_1.Router)();
exports.CardsRouter = router;
router.post("/", validation_1.validateCard, validateToken_1.extracIdFromToken, isBusiness_1.isBusiness, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.JWT) === null || _a === void 0 ? void 0 : _a.userId;
        const saved = yield card_service_1.cardService.createCard(req.body, userId);
        res.status(201).json({
            message: "saved successfully",
            card: saved,
        });
    }
    catch (err) {
        return next(err);
    }
}));
router.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cards = yield models_1.Card.find().lean();
        res.status(201).json({
            message: "fetch successfully",
            cards,
        });
    }
    catch (err) {
        return next(err);
    }
}));
router.patch("/:id", validateToken_1.extracIdFromToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const userId = (_b = req.JWT) === null || _b === void 0 ? void 0 : _b.userId;
        const { id } = req.params;
        const patchCard = yield card_service_1.cardService.likeOrUnlike(userId, id);
        res.status(200).json({
            message: patchCard,
        });
    }
    catch (err) {
        return next(err);
    }
}));
router.get("/my-cards", validateToken_1.extracIdFromToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const userId = (_c = req.JWT) === null || _c === void 0 ? void 0 : _c.userId;
        const cards = yield card_service_1.cardService.getMycards(userId);
        if (cards.length > 0) {
            res.status(200).json({
                message: "user's cards were successfully retrieved",
                cards,
            });
        }
        else {
            res.status(400).json({
                message: "user has no cards",
            });
        }
    }
    catch (err) {
        return next(err);
    }
}));
router.get("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const card = yield card_service_1.cardService.getCardById(id);
        if (card) {
            res.status(200).json({
                message: "card were successfully retrieved",
                card,
            });
        }
    }
    catch (err) {
        return next(err);
    }
}));
router.put("/:id", validation_1.validateToUpdateCard, isAdminOrtheCardCreator_1.isAdminOrtheCardCreator, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newCard = req.body;
        const { id } = req.params;
        const update = yield card_service_1.cardService.updateCard(id, newCard);
        if (update) {
            res.status(200).json({ message: "card was successfully updated" });
        }
        else {
            res.status(400).json({ message: "card not found in database" });
        }
    }
    catch (err) {
        return next(err);
    }
}));
router.delete("/:id", isAdminOrtheCardCreator_1.isAdminOrtheCardCreator, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleteCard = yield card_service_1.cardService.deleteCard(id);
        if (deleteCard instanceof error_1.myError) {
            throw new Error();
        }
        else if (deleteCard) {
            res.status(200).json({ message: "card deleted successfully" });
        }
    }
    catch (e) {
        return next(new error_1.myError("could'nt delete", 400));
    }
}));
