import { User } from "../Models/User.js";
import ErrorHandler from "../Utills/ErrorHandler.js";
import { sendToken } from "../Utills/sendToken.js";
import catchAsyncError from "../middleware/catchAsyncError.js";

export const Register = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  let user = await User.findOne({ email });
  if (user) {
    return next(new ErrorHandler("User already exists", 400));
  }
  user = await User.create({
    name,
    email,
    password,
  });

  sendToken(user, 201, res);
});

export const Login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  sendToken(user, 200, res);
});

export const Profile = catchAsyncError((req, res, next) => {
  res.status(200).json({
    success: true,
    profile: req.user,
  });
});

export const Logout = catchAsyncError((req, res, next) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "Logged out Successfully",
    });
});

export const UpdateUser = catchAsyncError(async (req, res, next) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return next(new ErrorHandler("Please enter all fields", 400));
  }

  const user = await User.findById(req.user._id);

  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    return next(new ErrorHandler("Email already exists", 400));
  }
  user.name = name;
  user.email = email;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Profile Updated Successfully",
  });
});
export const deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  await user.deleteOne();
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "Profile Deleted Successfully",
    });
});
