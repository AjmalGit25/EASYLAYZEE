import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";
import { Cart } from "../models/cart.model.js";
import { Purchase } from "../models/purchase.model.js";
import cloudinary from "cloudinary";


export const createProduct = async (req, res) => {
  const { title, description, price, primaryColor, secondaryColor } = req.body;
  const adminId = req.adminId;

  try {
    if (!title || !description || !price || !primaryColor || !secondaryColor) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // File (Image) presence check
    const { images } = req.files;

    if (!images || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const imageFiles = Array.isArray(images) ? images : [images];

    const uploadedImages = [];

    for (const image of imageFiles) {
      // Format check
      const allowedTypes = ["image/png"];

      if (!allowedTypes.includes(image.mimetype)) {
        return res.status(400).json({ message: "Invalid file type. Only PNG allowed." });
      }

      // Upload an image to Cloudinary (one-by-one)
      const uploadResult = await cloudinary.uploader.upload(image.tempFilePath);

      if (!uploadResult || uploadResult.error) {
        return res.status(400).json({ message: "Error uploading image on Cloudinary!" });
      }

      console.log("Cloudinary upload result:", uploadResult);

      uploadedImages.push(
        {
          url: uploadResult.secure_url,
          public_id: uploadResult.public_id
        }
      );
    }

    const productData = {
      title,
      description,
      price,
      colors: {
        primary: primaryColor,
        secondary: secondaryColor
      },
      images: uploadedImages,
      creatorId: adminId
    };

    const product = await Product.create(productData);

    console.log("Product created successfully:", productData);

    return res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error creating product." });
  }
}

export const updateProduct = async (req, res) => {
  const { productId } = req.params;
  const adminId = req.adminId;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Error: Product not found!" });
    }

    const { title, description, price, primaryColor, secondaryColor } = req.body;

    const updateData = {};

    if (title) updateData.title = title;

    if (description) updateData.description = description;

    if (price !== undefined) {
      const parsedPrice = Number(price);

      if (Number.isNaN(parsedPrice) || parsedPrice < 0){
        return res.status(400).json({ message: "Invalid price!" });
      }

      updateData.price = price;
    }

    if (primaryColor || secondaryColor) updateData.colors = {};

    if (primaryColor) updateData.colors.primary = primaryColor;

    if (secondaryColor) updateData.colors.secondary = secondaryColor;

    // File (Image) presence check
    const images = req.files?.images;

    const uploadedImages = [];

    if (images) {
      const imageFiles = Array.isArray(images) ? images : [images];

      for (const image of imageFiles) {
        // Format check
        const allowedTypes = ["image/png"];

        if (!allowedTypes.includes(image.mimetype)) {
          return res.status(400).json({ message: "Invalid file type. Only PNG allowed." });
        }

        // Upload an image to Cloudinary (one-by-one)
        const uploadResult = await cloudinary.uploader.upload(image.tempFilePath);

        if (!uploadResult || uploadResult.error) {
          return res.status(400).json({ message: "Error uploading image on Cloudinary!" });
        }

        console.log("Cloudinary upload result:", uploadResult);

        uploadedImages.push(
          {
            url: uploadResult.secure_url,
            public_id: uploadResult.public_id
          }
        );
      }

      // Delete previous images from Cloudinary
      for (const img of product.images) {
        await cloudinary.uploader.destroy(img.public_id);
      }
    }

    if (uploadedImages.length > 0) {
      updateData.images = uploadedImages;
    }

    const updatedProduct = await Product.findOneAndUpdate({ _id: productId, creatorId: adminId }, updateData, { returnDocument: "after" });

    return res.status(200).json({ message: "Product updated successfully!", updatedProduct });
  } catch (error) {
    console.log("Error in updating Product.", error);
    return res.status(500).json({ message: "Error in updating product!" });
  }
}

export const deleteProduct = async (req, res) => {
  const { productId } = req.params;
  const adminId = req.adminId;

  console.log("Product ID to delete:", productId);

  try {
    // Delete product from Atlas
    const product = await Product.findOneAndDelete({ _id: productId });

    console.log("Deleted product:", product);

    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    // Delete image from Cloudinary
    if (product.images?.length) {
      await Promise.all(                                        // Parallel deletion
        product.images.map((image) =>
          cloudinary.uploader.destroy(image.public_id)
        )
      );
    }


    return res.status(200).json({ message: "Product deleted successfully!" });
  } catch (error) {
    console.log("Error in deleting Product.", error);
    return res.status(500).json({ message: "Error in deleting product!" });
  }
}

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    // console.log("Fetched prods: ", products);

    return res.status(200).json({ message: "Products fetched successfully!", products });
  } catch (error) {
    console.log("Error in getting products!", error);
    res.status(500).json({ message: "Error in getting products." });
  }
}

export const getProductDetails = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById({ _id: productId });

    if (!product) {
      console.log("Product not found!!");
      return res.status(404).json({ message: "Product not found!" });
    }

    console.log("Product Details: ", product);

    return res.status(200).json({ message: "Products fetched successfully!", product });
  } catch (error) {
    console.log("Error in getting products!", error);
    res.status(500).json({ message: "Error in getting products." });
  }
}

export const buyProduct = async (req, res) => {
  const { userId } = req;
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(400).json({ message: "Product not found!" });
    }

    console.log("Product found!");

    const exixtingPurchase = await Purchase.findOne({ userId, productId });

    console.log("Hello World");

    if (exixtingPurchase) {
      return res.status(404).json({ message: "User already purchased this course" });
    }

    const productData = {
      userId,
      productId
    }

    const newPurchase = await Purchase.create(productData);

    return res.status(200).json({ message: "Product purchased successfully!", newPurchase });
  } catch (error) {
    console.log("Error in Product buying", error);
    return res.status(500).json({ message: "Error in Product buying" });
  }
}