import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose, { Mongoose } from "mongoose";
import { v2 as cloudinary } from 'cloudinary';
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import multer from "multer";

// Routes
import productRoute from "./routes/product.route.js";
import userRoute from "./routes/user.route.js";
import adminRoute from "./routes/admin.route.js";
import cartRoute from "./routes/cart.route.js";
import wishlistRoute from "./routes/wishlist.route.js";
import paymentRoute from "./routes/payment.route.js";
import orderRoute from "./routes/order.route.js";

import cors from "cors";

const PORT = process.env.PORT;
const FRONTEND_URL = process.env.FRONTEND_URL;
const DB_URI = process.env.MONGO_URI;

const app = express();

// Enable CORS for the configured frontend origin and allow credentials (cookies)
app.use(cors({
  origin: [process.env.FRONTEND_URL, "http://localhost:5173"],
  credentials: true,
}));

app.use(cookieParser());      // Middleware to parse cookies
app.use(express.json());      // Middleware to parse JSON bodies

const upload = multer({
  storage: multer.memoryStorage(),
});


app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));

// Connect Database (MongoDB Atlas)
try {
  await mongoose.connect(DB_URI);
  console.log("Connected to MongoDB");
} catch (error) {
  console.log("Error connecting to MongoDB:", error);
}

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});


// Base route
app.use("/api/v1/user", userRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/cart", cartRoute);
app.use("/api/v1/wishlist", wishlistRoute);
app.use("/api/v1/payment", paymentRoute);
app.use("/api/v1/order", orderRoute);

// Setup Server
app.get("/", (req, res) => {
  res.status(200).send("Hello, World! This is Ajmal Hussain's EasyLayzee Server");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});