import mongoose from "mongoose";

// One Wishlist document belongs to one user, and contains many products.

const wishlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true,
    required: true
  },

  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  }]
});

export const Wishlist = mongoose.model("Wishlist", wishlistSchema);