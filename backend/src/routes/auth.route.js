import express from "express";
import {
	signup,
	login,
	logout,
	updateProfile,
	authCheck,
} from "../controllers/auth.controller.js";
import { protectedRoute } from "../middlewares/protectedRoute.middleware.js";
const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.put("/update-profile", protectedRoute, updateProfile);

router.get("/auth-check", protectedRoute, authCheck);

export default router;
