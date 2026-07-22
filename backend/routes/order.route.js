import express from "express";
import userMiddleware from "../middlewares/user.mid.js";
import {getOrders, getOrderById} from "../controllers/order.controller.js";

const router = express.Router();

router.get("/", userMiddleware, getOrders);
router.get("/:orderId", userMiddleware, getOrderById);

export default router;