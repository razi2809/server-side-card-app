import { Router } from "express";
import { myError } from "../error/error";
import { validateCard, validateToUpdateCard } from "../middleware/validation";
import { cardService } from "../service/card-service";
import { extracIdFromToken } from "../middleware/validation/validateToken";
import { Card } from "../config/database/model/models";
import { isAdminOrtheCardCreator } from "../middleware/validation/isAdminOrtheCardCreator";
import { isBusiness } from "../middleware/validation/isBusiness";

const router = Router();
router.post(
  "/",
  validateCard,
  extracIdFromToken,
  isBusiness,
  async (req, res, next) => {
    try {
      const userId = req.JWT?.userId;
      const saved = await cardService.createCard(req.body, userId);
      res.status(201).json({
        message: "saved successfully",
        card: saved,
      });
    } catch (err) {
      return next(err);
    }
  }
);
router.get("/", async (req, res, next) => {
  try {
    const cards = await Card.find().lean();
    res.status(201).json({
      message: "fetch successfully",
      cards,
    });
  } catch (err) {
    return next(err);
  }
});
router.patch("/:id", extracIdFromToken, async (req, res, next) => {
  try {
    const userId = req.JWT?.userId;
    const { id } = req.params;
    const patchCard = await cardService.likeOrUnlike(userId, id);
    res.status(200).json({
      message: patchCard,
    });
  } catch (err) {
    return next(err);
  }
});
router.get("/my-cards", extracIdFromToken, async (req, res, next) => {
  try {
    const userId = req.JWT?.userId;
    const cards = await cardService.getMycards(userId);
    if (cards.length > 0) {
      res.status(200).json({
        message: "user's cards were successfully retrieved",
        cards,
      });
    } else {
      res.status(400).json({
        message: "user has no cards",
      });
    }
  } catch (err) {
    return next(err);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const card = await cardService.getCardById(id);
    if (!card) {
      return res.status(404).json({
        message: "card not found in data base",
      });
    }
    return res.status(200).json({
      message: "card were successfully retrieved",
      card,
    });
  } catch (err) {
    return next(err);
  }
});
router.put(
  "/:id",
  validateToUpdateCard,
  isAdminOrtheCardCreator,
  async (req, res, next) => {
    try {
      const newCard = req.body;
      const { id } = req.params;
      const update = await cardService.updateCard(id, newCard);
      if (update) {
        res.status(200).json({ message: "card was successfully updated" });
      } else {
        res.status(400).json({ message: "card not found in database" });
      }
    } catch (err) {
      return next(err);
    }
  }
);
router.delete("/:id", isAdminOrtheCardCreator, async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleteCard = await cardService.deleteCard(id);
    if (!deleteCard) {
      return res.status(500).json({ message: "card deleted failed" });
    }
    return res.status(200).json({ message: "card deleted successfully" });
  } catch (e) {
    return next(new myError("could'nt delete", 400));
  }
});
/*

router.put("/:id", , async (req, res, next) => {
  try {

  } catch (error) {
    return next(new myError("could'nt update", 400));
  }
});
 */
export { router as CardsRouter };
