import express from "express";
import {
  signup,
  login,
  logout,
  adminProducts,
  getAdminMe
} from "../controllers/admin.controller.js";

import adminMiddleware from "../middlewares/admin.mid.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/admin-products", adminMiddleware, adminProducts);
router.get("/me", adminMiddleware, getAdminMe);

export default router;