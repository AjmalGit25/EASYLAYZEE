import express from "express";
import userMiddleware from "../middlewares/user.mid.js";

import {
  getCart,
  addCart,
  updateCart,
  removeCart
} from "../controllers/cart.controller.js";

const router = express.Router();


router.get("/", userMiddleware, getCart);
router.post("/:productId", userMiddleware, addCart);
router.patch("/:productId", userMiddleware, updateCart);
router.delete("/:productId", userMiddleware, removeCart);


export default router;