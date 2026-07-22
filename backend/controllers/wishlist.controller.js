import config from "../config.js";
import userMiddleware from "../middlewares/user.mid.js";
import mongoose from "mongoose";

import { User } from "../models/user.model.js";
import { Purchase } from "../models/purchase.model.js";
import { Product } from "../models/product.model.js";
import { Wishlist } from "../models/wishlist.model.js";


export const getWishlist = async (req, res) => {
  const { userId } = req;

  try {
    const wishlist = await Wishlist.findOne({ userId }).populate("products");

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist is empty!" });
    }

    return res.status(200).json({ message: "Wishlist fetched succesffully!", wishlist });

  } catch (error) {
    console.log("Error while fetching wishlist!", error);
    return res.status(500).json({ message: "Wishlists fetch failed!" });
  }
}

export const addWishlist = async (req, res) => {
  const { userId } = req;
  const { productId } = req.params;

  try {
    // 1. Verify Product existence 
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    // Find user's wishlist
    let wishlist = await Wishlist.findOne({ userId });

    // 4. If already Wishlist document, only add productId
    if (wishlist) {
      const alreadyExists = wishlist.products.some(id => id.toString() === productId);

      if (alreadyExists) {
        wishlist.products = wishlist.products.filter(
          id => id.toString() !== productId
        );

        await wishlist.save();
        const populated = await wishlist.populate("products");
        return res.status(200).json({ message: "Product removed from wishlist.", wishlist: populated });
      }

      wishlist.products.push(productId);
      await wishlist.save();
      const populated = await wishlist.populate("products");
      return res.status(200).json({ message: "Product added to Wishlist successfully!", wishlist: populated });
    }

    // 5. Create Wishlist document + add productId
    else {
      wishlist = await Wishlist.create({ userId, products: [productId] });
      const populated = await wishlist.populate("products");
      return res.status(200).json({ message: "Wishlist created successfully!", wishlist: populated });
    }
  } catch (error) {
    console.log("Error in wishlist adding:", error.message);
    return res.status(500).json({ message: "Error while adding Wishlist!" });
  }
}