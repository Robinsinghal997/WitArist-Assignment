import { User } from "../Models/User.js";
import ErrorHandler from "../Utills/ErrorHandler.js";
import Jwt from "jsonwebtoken";

export const isAuthenticate = async (req, res, next) => {
  try {
    const token = req.cookies["token"]
    if (!token) {
      return next(
        new ErrorHandler("Please login to Access this resource", 401)
      );
    }
      const { id } = Jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findOne({ _id: id });
      req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
};

