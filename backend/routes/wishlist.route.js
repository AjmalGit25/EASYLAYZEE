import express from "express";
import userMiddleware from "../middlewares/user.mid.js";

import {
  getWishlist,
  addWishlist
} from "../controllers/wishlist.controller.js";

const router = express.Router();

router.get("/", userMiddleware, getWishlist);
router.post("/:productId", userMiddleware, addWishlist);


export default router;