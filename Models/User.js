import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    validate: [validator.isEmail, "Please enter valid email"],
  },
  password: String,
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

Schema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

Schema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

Schema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};
export const User = mongoose.model("User", Schema);
