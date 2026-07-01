import mongoose from "mongoose";

// One cart document belongs to one user, and that cart contains many products.

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true,
    required: true
  },

  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      },

      quantity: {
        type: Number,
        default: 1
      }
    }
  ]
});

// Named export
export const Cart = mongoose.model("Cart", cartSchema);