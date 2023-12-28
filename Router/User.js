import express from "express";
const router = express.Router();
import {
  Login,
  Logout,
  Profile,
  Register,
  UpdateUser,
  deleteUser,
} from "../Controler/userControler.js";
import { isAuthenticate } from "../middleware/Auth.js";

router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/me").get(isAuthenticate, Profile);
router.route("/logout").get(isAuthenticate, Logout);
router.route("/user/update").patch(isAuthenticate, UpdateUser);
router.route("/delete/profile").delete(isAuthenticate, deleteUser);

export default router;
