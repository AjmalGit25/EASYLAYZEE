import bcrypt from "bcryptjs";
import { z } from "zod";
import jwt from "jsonwebtoken";
import config from "../config.js";
import { Admin } from "../models/admin.model.js";
import { Product } from "../models/product.model.js";

export const signup = async (req, res) => {
  const { firstName, lastName, mobileNumber, email, password, confirmPassword } = req.body;

  const adminSchema = z.object(
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

  const validateData = adminSchema.safeParse(req.body);
  
  if (!validateData.success) {
    return res.status(400).json({ message: validateData.error.issues.map(err => err.message) });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const existingAdmin = await Admin.findOne({ email: email });

    if (existingAdmin) {
      return res.status(400).json({ message: "Admin with this email already exists!" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match!" });
    }

    const adminData = {
      firstName,
      lastName,
      phone: mobileNumber,
      email,
      password: hashedPassword
    }

    const admin = await Admin.create(adminData);

    return res.status(200).json({ message: "Admin created successfully!" });
  } catch (error) {
    console.log("Error in signup", error);
    return res.status(500).json({ message: "Error in signup" });
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email: email });

    if (!admin) {
      console.log("Invalid credentials!");
      return res.status(403).json({ message: "Invalid credentials!" });
    }

    const passwordCheck = await bcrypt.compare(password, admin.password);

    if (!passwordCheck) {
      console.log("Invalid credentials!");
      return res.status(403).json({ message: "Invalid credentials!" });
    }

    // JWT Token generate
    const token = jwt.sign(
      { adminId: admin._id },
      config.JWT_ADMIN_PASSWORD,
      { expiresIn: "6h" }
    );

    // Set the token in a cookie
    res.cookie("admin", token, { 
      httpOnly: true, 
      secure: false, 
      sameSite: "lax",
      maxAge: 6 * 60 * 60 * 1000,
      path: "/"
    });

    return res.status(201).json({ message: "Admin login successful.", admin, token });
  } catch (error) {
    console.log("Error logging in!", error);
    return res.status(500).json({ message: "Error in login" });
  }
}

export const logout = (req, res) => {
  try {
    if (!req.cookies.admin) {
      return res.status(401).json({ message: "Admin! Kindly login first!" });
    }

    // Clear the token cookie
    res.clearCookie("admin");
    return res.status(200).json({ message: "Admin logged out successfully!" });
  } catch (error) {
    console.log("Error in logout.", error);
    return res.status(500).json({ message: "Error in logout" });
  }
}

export const getAdminMe = async (req, res) => {
  const { adminId } = req;

  try {
    const admin = await Admin.findById(adminId).select("-password");

    if (!admin) {
      return res.status(400).json({message: "Admin not found!"});
    }

    console.log("Admin fetched successfully!", admin);

    return res.status(200).json({message: "Admin data fetched successfully!", admin});
    
  } catch (error) {
    console.log("Error fetching admin!", error);

    return res.status(500).json({ message: "Error while fetching admin!" });
  }
}

export const adminProducts = async (req, res) => {
  const { adminId } = req;

  try {
    const products = await Product.find({ creatorId: adminId });
    
    console.log("Products fetched successfully:", products);
    return res.status(200).json({ message: "Products fetched successfully!", products });
  } catch (error) {
    console.log("Error while fetching admin Products", error);
    return res.status(500).json({ message: "Error while fetching admin Products" });
  }
}