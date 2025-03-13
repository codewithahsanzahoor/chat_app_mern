import express from "express";
import { app, server } from "../src/lib/socket.js";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();

import cookieParser from "cookie-parser";
app.use(cookieParser());
app.use(express.json());
app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	})
);

import morgan from "morgan";
app.use(morgan("dev"));

import { connectDB } from "./lib/db.js";

import authRouter from "./routes/auth.route.js";
app.use("/api/auth", authRouter);

import messageRouter from "./routes/message.route.js";
app.use("/api/message", messageRouter);

app.get("/", (req, res) => {
	res.send("Hello World!");
});

server.listen(process.env.PORT, () => {
	console.log("Server is running on port 3000");
	connectDB();
});
