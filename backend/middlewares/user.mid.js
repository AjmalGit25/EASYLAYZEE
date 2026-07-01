import jwt from "jsonwebtoken";
import config from "../config.js";

function userMiddleware(req, res, next) {

  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized! No token provided." });
  }

  try {
    const decoded = jwt.verify(
      token,
      config.JWT_USER_PASSWORD
    );

    // This 'userId' depends on what we stored while creating the token. (in login() function)
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log("Error while validating user token!", error);
    return res.status(500).json({ message: "Error while validating token! (User Middleware)" });
  }
}

export default userMiddleware;