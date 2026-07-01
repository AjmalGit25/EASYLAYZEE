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

export const signup = async (req, res) => {
  const { firstName, lastName, mobileNumber, email, password, confirmPassword } = req.body;

  const userSchema = z.object(
    {
      firstName: z.string().min(2, { message: "First Name must be at least 2 characters long" }),
      lastName: z.string().min(3, { message: "Last Name must be at least 3 characters long" }),
      mobileNumber: z.string().length(10, { message: "Phone number must be exactly 10 digits" }),
      email: z.email(),
      password: z
        .string()
        .min(5, { message: "Password must be at least 5 characters long" })
        .regex(/[A-Z]/, {
          message: "Password must contain at least one uppercase letter",
        })
        .regex(/[a-z]/, {
          message: "Password must contain at least one lowercase letter",
        })
        .regex(/[0-9]/, {
          message: "Password must contain at least one number",
        })
        .regex(/[^A-Za-z0-9]/, {
          message: "Password must contain at least one special character",
        }),
    }
  );

  const validateData = userSchema.safeParse(req.body);

  if (!validateData.success) {
    return res.status(400).json({ message: validateData.error.issues.map(err => err.message) });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const existingPhone = await User.findOne({ phone: mobileNumber });

    if (existingPhone) {
      return res.status(400).json({ message: "Phone number already registered." });
    }

    const existingEmail = await User.findOne({ email: email });

    if (existingEmail) {
      return res.status(400).json({ message: "User with this email already exists!" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match!" });
    }

    const userData = {
      firstName,
      lastName,
      phone: mobileNumber,
      email,
      password: hashedPassword
    }

    const user = await User.create(userData);

    return res.status(200).json({ message: "Signup successfull!", user });
  } catch (error) {
    console.log("Error in signup!", error);
    return res.status(500).json({ message: "Error in signup" });
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.log("Invalid credentials!");

      return res.status(403).json({ message: "Invalid credentials!" });
    }

    const correctPassword = await bcrypt.compare(password, user.password);

    if (!correctPassword) {
      console.log("Invalid credentials!");

      return res.status(403).json({ message: "Invalid credentials!" });
    }

    // JWT Token
    const token = jwt.sign(
      { userId: user._id },
      config.JWT_USER_PASSWORD,
      { expiresIn: "6h" }
    );

    // Set the token in a cookie named jwt
    res.cookie("jwt", token, { 
      httpOnly: true, 
      secure: false, 
      sameSite: "lax", 
      maxAge: 6 * 60 * 60 * 1000,
      path: "/" 
    });

    console.log("User login successful!", user);

    return res.status(200).json({ message: "User login successful.", user, token });
  } catch (error) {
    console.log("Backend Error during logging in!", error);
    return res.status(500).json({ message: "Backend: Error in login" });
  }
}

export const getMe = async (req, res) => {
  const { userId } = req;

  try {
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    return res.status(200).json({ message: "User data fetched successfully!", user });

  } catch (error) {
    console.log("Error fetching user!", error);

    return res.status(500).json({ message: "Error while fetching user!" });
  }
}

export const logout = (req, res) => {
  try {
    if (!req.cookies.jwt) {           // req.headers.authorization (for token in header) can also be used instead of cookies.
      return res.status(401).json({ message: "User! Kindly login first!" });
    }

    // Clear the token cookie
    res.clearCookie("jwt");
    return res.status(200).json({ message: "User logged out successfully!" });
  } catch (error) {
    console.log("Error in logout.", error);
    return res.status(500).json({ message: "Error in logout" });
  }
}

export const purchasedProducts = async (req, res) => {
  const { userId } = req;

  try {
    const purchased = await Purchase.find({ userId });

    // let productIds = purchased.map(purchase => purchase.productId);
    // const products = await Product.find({ _id: { $in: productIds } });

    let purchasedProductIds = [];
    for (let i = 0; i < purchased.length; i++) {
      purchasedProductIds.push(purchased[i].productId);
    }

    const productData = await Product.find({ _id: { $in: purchasedProductIds } });

    return res.status(200).json({ message: "Purchased products fetched successfully!", purchased, productData });
  } catch (error) {
    console.log("Error fetching purchased products.", error);
    return res.status(500).json({ message: "Error fetching purchased products." });
  }
}