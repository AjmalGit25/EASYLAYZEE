import crypto from "crypto";
import { Purchase } from "../models/purchase.model.js";
import { Cart } from "../models/cart.model.js";
import razorpay from "../config/razorpay.js"; // Import the Razorpay instance

export const createOrder = async (req, res) => {
  const { amount } = req.body;  // amount in rupees

  try {
    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100),  // convert to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    console.log("Razorpay order created:", order);

    return res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("Razorpay order creation failed:", error);
    return res.status(500).json({ message: "Failed to create payment order" });
  }
};

export const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, productIds } = req.body;
  const { userId } = req;

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    return res.status(400).json({ success: false, message: "Payment verification failed!" });
  }

  try {
    // Save each product as a purchase
    const purchases = productIds.map((productId) => ({ userId, productId }));
    await Purchase.insertMany(purchases);

    // Clear the cart after successful purchase
    await Cart.findOneAndDelete({ userId });

    return res.status(200).json({ success: true, message: "Payment verified and order placed!" });
  } catch (error) {
    console.error("Error saving purchase:", error);
    return res.status(500).json({ message: "Payment verified but failed to save order" });
  }
};
