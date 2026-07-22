import express from "express";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProductDetails,
  buyProduct
} from "../controllers/product.controller.js";

import userMiddleware from "../middlewares/user.mid.js";
import adminMiddleware from "../middlewares/admin.mid.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:productId", getProductDetails);
router.post("/", adminMiddleware, createProduct);
router.patch("/:productId", adminMiddleware, updateProduct);
router.delete("/:productId", adminMiddleware, deleteProduct);
router.post("/buy/:productId", userMiddleware, buyProduct);

export default router;