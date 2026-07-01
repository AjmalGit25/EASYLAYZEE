import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    price: {
      type: Number,
      required: true
    },

    images: [
      {
        url: {
          type: String,
          required: true,
        },
        public_id: {
          type: String,
          required: true,
        },
      },
    ],

    colors: {
      primary: {
        type: String,
        required: true
      },
      secondary: {
        type: String,
        required: true
      },
    },

    creatorId: {
      type: mongoose.Types.ObjectId,
      ref: "User"
    }
  }
);

// Named export
export const Product = mongoose.model("Product", productSchema);