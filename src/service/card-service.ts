import { Icard } from "../@types/card";
import { IUser } from "../@types/user";
import { Card, User } from "../config/database/model/models";
import { myError } from "../error/error";
import authService from "./auth-service";
const cardService = {
  createCard: async (cardData: Icard, userId: string) => {
    const card = new Card(cardData);
    card.user_id = userId;
    return card.save();
  },
  likeOrUnlike: async (userId: string, cardId: string) => {
    try {
      const card = await Card.findOne({ _id: cardId }).lean();
      if (card?.likes.includes(userId)) {
        await Card.updateOne({ _id: cardId }, { $pull: { likes: userId } });
        return "unlike seccessful";
      } else {
        // If user hasn't liked the card yet, add their like
        await Card.updateOne({ _id: cardId }, { $addToSet: { likes: userId } });
        return "like seccessful";
      }
    } catch (err) {
      throw err;
    }
  },
  getMycards: async (userId: string) => {
    try {
      const cards = await Card.find({ user_id: userId });
      return cards;
    } catch (err) {
      throw err;
    }
  },
  getCardById: async (cardId: string) => {
    try {
      return await Card.findOne({ _id: cardId });
    } catch (e) {
      throw e;
    }
  },
  updateCard: async (cardId: string, newcard: Icard) => {
    // console.log(cardId, newcard);

    try {
      const prevCard = await Card.findOne({ _id: cardId });
      if (newcard.email === prevCard?.email) {
        delete (newcard as Partial<IUser>).email;
      }
      const updatedCard = await Card.findOneAndUpdate(
        { _id: cardId },
        newcard,
        { new: true }
      );
      if (!updatedCard) {
        return null;
      }
      return updatedCard;
    } catch (error) {
      throw new myError("Update operation failed", 500);
    }
  },
  deleteCard: async (cardId: string) => {
    try {
      const deleteCard = await Card.findOneAndDelete({ _id: cardId });
      if (!deleteCard) {
        throw new myError("card not found", 404);
      }
      return "success";
    } catch (e) {
      throw new myError("delete was unseccessful", 400);
    }
  },
};
export { cardService };
