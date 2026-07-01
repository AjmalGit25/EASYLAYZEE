import express from "express";
import {
  signup,
  login,
  logout,
  getMe,
  purchasedProducts
} from "../controllers/user.controller.js";

import userMiddleware from "../middlewares/user.mid.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", userMiddleware, getMe);
router.post("/logout", logout);

router.get("/purchased", userMiddleware, purchasedProducts);

export default router;