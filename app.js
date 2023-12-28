import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middleware/errorMiddleware.js";
import cors from "cors";
const app = express();
export default app;

dotenv.config({ path: "./config/config.env" });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    })
);

import connectDB from "./config/db.js";

connectDB();


app.get("/", (req, res) => {
    res.send(`Server is running`);
});

import user from "./Router/User.js";

app.use("/api/v1", user);

app.use(errorMiddleware);
