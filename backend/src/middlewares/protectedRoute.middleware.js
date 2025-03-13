import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectedRoute = async (req, res, next) => {
	try {
		const token = req.cookies.jwt;
		// console.log(token);
		if (!token) {
			return res.status(401).json({
				success: false,
				message: "Unauthorized - No token provided",
			});
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		// console.log(decoded);
		if (!decoded) {
			return res.status(401).json({
				success: false,
				message: "Unauthorized - Invalid token",
			});
		}

		const user = await User.findById(decoded.userId).select("-password");

		// console.log(user);

		if (!user) {
			return res.status(401).json({
				success: false,
				message: "Unauthorized - User not found",
			});
		}

		req.user = user;
		// console.log(req.user);
		next();
	} catch (error) {
		console.log("protectedRoute error =>", error.message);
		res.status(500).json({
			success: false,
			message: `protectedRoute error ${error.message}`,
		});
	}
};
