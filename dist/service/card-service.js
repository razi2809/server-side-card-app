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
exports.cardService = void 0;
const models_1 = require("../config/database/model/models");
const error_1 = require("../error/error");
const cardService = {
    createCard: (cardData, userId) => __awaiter(void 0, void 0, void 0, function* () {
        const card = new models_1.Card(cardData);
        card.user_id = userId;
        return card.save();
    }),
    likeOrUnlike: (userId, cardId) => __awaiter(void 0, void 0, void 0, function* () {
        const card = yield models_1.Card.findOne({ _id: cardId }).lean();
        if (card === null || card === void 0 ? void 0 : card.likes.includes(userId)) {
            yield models_1.Card.updateOne({ _id: cardId }, { $pull: { likes: userId } });
            return "unlike seccessful";
        }
        else {
            // If user hasn't liked the card yet, add their like
            yield models_1.Card.updateOne({ _id: cardId }, { $addToSet: { likes: userId } });
            return "like seccessful";
        }
    }),
    getMycards: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const cards = yield models_1.Card.find({ user_id: userId });
        return cards;
    }),
    getCardById: (cardId) => __awaiter(void 0, void 0, void 0, function* () {
        const card = yield models_1.Card.findOne({ _id: cardId });
        return card;
    }),
    updateCard: (cardId, newcard) => __awaiter(void 0, void 0, void 0, function* () {
        // console.log(cardId, newcard);
        try {
            const prevCard = yield models_1.Card.findOne({ _id: cardId });
            if (newcard.email === (prevCard === null || prevCard === void 0 ? void 0 : prevCard.email)) {
                delete newcard.email;
            }
            const updatedCard = yield models_1.Card.findOneAndUpdate({ _id: cardId }, newcard, { new: true });
            if (!updatedCard) {
                return null;
            }
            return updatedCard;
        }
        catch (error) {
            console.log(error);
            throw new error_1.myError("Update operation failed", 500);
        }
    }),
    deleteCard: (cardId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const deleteCard = yield models_1.Card.findOneAndDelete({ _id: cardId });
            if (deleteCard) {
                return "success";
            }
        }
        catch (e) {
            return new error_1.myError("delete was unseccessful", 400);
        }
    }),
};
exports.cardService = cardService;
