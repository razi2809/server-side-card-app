import { Router } from "express";
import { User } from "../config/database/model/models";
import { validateRegister } from "../validation/registerValidation";

const router = Router();

router.post("/", async (req, res) => {
  //TODO checkbody
  const UserBody = req.body;
  try {
    const Joi = validateRegister(UserBody);
    if (Joi) return res.status(400).json(Joi);
    const NewUser = new User(UserBody);
    const saved = await NewUser.save();
    res.status(201).json({
      message: "saved successfully",
      user: saved,
    });
  } catch (err) {
    res.status(400).json({
      message: "error creating user",
      err,
    });
  }
});
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      message: "users fetched successfully",
      users,
    });
  } catch (err) {
    res.status(500).json({
      message: "server error",
      err,
    });
  }
});

export { router as UsersRouter };
