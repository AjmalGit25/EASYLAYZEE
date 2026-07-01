import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { z } from "zod";
import jwt from "jsonwebtoken";
import JWT_USER_PASSWORD from "../config.js";
import config from "../config.js";
import userMiddleware from "../middlewares/user.mid.js";
import { Purchase } from "../models/purchase.model.js";
import { Product } from "../models/product.model.js";
import { Cart } from "../models/cart.model.js";
import mongoose from "mongoose";


export const getCart = async (req, res) => {
  const { userId } = req;

  try {
    const cartData = await Cart.findOne({ userId }).populate("items.productId");

    if (!cartData) {
      return res.status(404).json({ message: "Cart not found!" });
    }

    console.log("Cart data fetched successfully!", cartData);
    return res.status(200).json({ message: "Carts data fetched succesffully!", cartData });

  } catch (error) {
    console.log("Error while fetching cart data!", error);
    return res.status(500).json({ message: "Carts data fetch failed!" });
  }
}

export const addCart = async (req, res) => {
  const { userId } = req;
  const { productId } = req.params;
  const quantity = Number(req.body.quantity ?? 1);

  try {
    // 1. Verify Product existence 
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    // 2. Validate Quantity too
    if (Number.isNaN(quantity)) {
      return res.status(400).json({ message: "Quantity must be a number!" });
    }

    if (quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    // 3. Find the single cart document for this user
    const cart = await Cart.findOne({ userId });

    // 4. Create if no cart (Entire cart data is empty)
    if (!cart) {
      await Cart.create({ userId, items: [{ productId, quantity }] });
      const cartData = await Cart.findOne({ userId }).populate("items.productId", "title price images");

      return res.status(200).json({ message: "Product added to cart successfully!", cartData });
    }

    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      return res.status(400).json({ message: "Product already in cart!" });
    }

    // 5. New item (Cart exist, but this product is new to cart)
    cart.items.push({ productId, quantity });

    await cart.save();

    await cart.populate("items.productId", "title price images");

    return res.status(200).json({ message: "Product added to cart successfully!", cartData: cart });
  } catch (error) {
    console.log("Error in addCart:", error.message);
    return res.status(500).json({ message: "Error while adding Cart!" });
  }
}

export const updateCart = async (req, res) => {
  const { userId } = req;
  const { productId } = req.params;
  const quantity = Number(req.body.quantity ?? 1);

  try {
    // 1. Verify Product existence 
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    // 2. Validate Quantity too
    if (Number.isNaN(quantity)) {
      return res.status(400).json({ message: "Quantity must be a number!" });
    }

    if (quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    // 3. Find the cart and update the item quantity
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found!" });
    }

    // If cart exists? Check if product already exists
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = quantity;

      await cart.save();
      const updatedCart = await Cart.findOne({ userId }).populate("items.productId", "title price images");

      return res.status(200).json({ message: "Cart updated successfully!", cartData: updatedCart });
    } else {
      return res.status(404).json({ message: "Product not found in cart!" });
    }
  } catch (error) {
    console.log("Error in updateCart:", error);
    return res.status(500).json({ message: "Error while updating cart!" });
  }
}

export const removeCart = async (req, res) => {
  const { userId } = req;
  const { productId } = req.params;

  try {
    // 1. Verify Product existence 
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found!" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items.splice(itemIndex, 1);
      await cart.save();

      const updatedCart = await Cart.findOne({ userId }).populate("items.productId", "title price images");

      return res.status(200).json({ message: "Product removed from cart successfully!", cartData: updatedCart });
    } else {
      return res.status(404).json({ message: "Product not found in cart!" });
    }
  } catch (error) {
    console.log("Error in deleting Cart:", error);
    return res.status(500).json({ message: "Error while deleting from cart!" });
  }
}