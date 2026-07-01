import jwt from "jsonwebtoken";
import config from "../config.js";

function adminMiddleware(req, res, next) {
  // const authHeader = req.headers.authorization;
  // console.log("This is the auth header:", authHeader);

  // if (!authHeader || !authHeader.startsWith("Bearer ")) {
  //   return res.status(401).json({ message: "Unauthorized! No token provided." });
  // }

  // const token = authHeader.split(" ")[1];

  const token = req.cookies.admin;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized! No token provided." });
  }

  try {
    const decoded = jwt.verify(
      token,
      config.JWT_ADMIN_PASSWORD
    );

    // This 'adminId' depends on what we stored while creating the token. (in login() function)
    req.adminId = decoded.adminId;

    next();
  } catch (error) {
    console.log("Error while validating admin token!", error);
    return res.status(500).json({ message: "Error while validating token or expired!" });
  }
}

export default adminMiddleware;