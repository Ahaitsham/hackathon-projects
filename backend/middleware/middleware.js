import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../controllers/user.controller.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log(token);

    if (!token) {
      return res.status(401).json({
        message: "Please log in first",
        success: false,
      });
    }

    const decoded = jwt.verify(token, SECRET_KEY);

    if (!decoded) {
      return res.status(401).json({
        message: "Unauthorised user",
        success: false,
      });
    }

    req.user = decoded;

    console.log(decoded);

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Something went wrong",
      success: false,
    });
  }
};
