import express from "express";
import { protectedRoute } from "../middlewares/protectedRoute.middleware.js";
import {
	getMessages,
	getUsersForSidebar,
	sendMessage,
} from "../controllers/message.controller.js";

const router = express.Router();

// get users except (loggedIN) that have an account created for chat
router.get("/users", protectedRoute, getUsersForSidebar);

// get messages between two users rather it will be loggedin user or the params user id is the receiver
router.get("/get-message/:id", protectedRoute, getMessages);

// send message between two users params id user is receiver and the loggedin user
router.post("/send-message/:id", protectedRoute, sendMessage);

export default router;
