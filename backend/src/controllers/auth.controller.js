import { generateJwtToken } from "../lib/util.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js"; // Added import for cloudinary

export const signup = async (req, res) => {
	try {
		// check if email and password are provided
		if (!req.body.email || !req.body.password || !req.body.fullName) {
			return res.status(400).json({
				success: false,
				message: "Please provide email and password",
			});
		}

		// check if password is at least 6 characters long
		if (req.body.password.length < 6) {
			return res.status(400).json({
				success: false,
				message: "Password should be at least 6 characters long",
			});
		}

		// check if user already exists
		const user = await User.findOne({ email: req.body.email });

		// if user already exists, return error
		if (user) {
			return res.status(400).json({
				success: false,
				message: "User already exists",
			});
		}

		// create hash for password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(req.body.password, salt);

		// create user
		const newUser = new User({
			fullName: req.body.fullName,
			email: req.body.email,
			password: hashedPassword,
		});

		// save user
		await newUser.save();

		// if new user is created, then return jwt token
		if (newUser) {
			generateJwtToken(newUser._id, res);

			res.status(201).json({
				success: true,
				message: "User created",
				user: {
					_id: newUser._id,
					fullName: newUser.fullName,
					email: newUser.email,
				},
			});
		} else {
			res.status(400).json({
				success: false,
				message: "User not created",
			});
		}
	} catch (error) {
		console.log("signup error", error.message);
		res.status(500).json({
			success: false,
			message: `signup error ${error.message}`,
		});
	}
};

export const login = async (req, res) => {
	try {
		// check if email and password are provided
		if (!req.body.email || !req.body.password) {
			return res.status(400).json({
				success: false,
				message: "Please provide email and password",
			});
		}

		// check if user exists
		const user = await User.findOne({ email: req.body.email });

		// if user does not exist, return error
		if (!user) {
			return res.status(400).json({
				success: false,
				message: "Invalid Credentials",
			});
		}

		// check if password is correct
		const isPasswordCorrect = await bcrypt.compare(
			req.body.password,
			user.password
		);

		// if password is incorrect, return error
		if (!isPasswordCorrect) {
			return res.status(400).json({
				success: false,
				message: "Invalid Credentials",
			});
		}

		generateJwtToken(user._id, res);

		res.status(200).json({
			success: true,
			message: "Login successful",
			user: {
				_id: user._id,
				fullName: user.fullName,
				email: user.email,
			},
		});
	} catch (error) {
		console.log("login error", error.message);
		res.status(500).json({
			success: false,
			message: `login error ${error.message}`,
		});
	}
};

export const logout = async (req, res) => {
	try {
		res.cookie("jwt", "", { maxAge: 1 });
		res.status(200).json({
			success: true,
			message: "Logout successful",
		});
	} catch (error) {
		console.log("logout error", error.message);
		res.status(500).json({
			success: false,
			message: `logout error ${error.message}`,
		});
	}
};

export const updateProfile = async (req, res) => {
	const { profilePic } = req.body; // Ensure profilePic is extracted from request body

	try {
		const { profilePic } = req.body;
		const userId = req.user._id;

		if (!profilePic) {
			return res.status(400).json({
				success: false,
				message: "Please provide profile picture",
			});
		}

		const uploadResponse = await cloudinary.uploader.upload(profilePic, {
			public_id: userId,
			resource_type: "image",
		});

		const updatedUser = await User.findByIdAndUpdate(
			userId,
			{
				profilePic: uploadResponse.secure_url,
			},
			{ new: true }
		);

		res.status(200).json({
			success: true,
			message: "Profile picture updated",
			user: updatedUser,
		});
	} catch (error) {
		console.log("update profile error", error);
		res.status(500).json({
			success: false,
			message: `update profile error ${error}`,
		});
	}
};

export const authCheck = async (req, res) => {
	const userDetails = await User.findById(req.user._id).select("-password");
	// console.log(userDetails);
	try {
		res.status(200).json({
			success: true,
			message: "User is authenticated",
			user: userDetails,
		});
	} catch (error) {
		console.log("auth check error", error.message);
		res.status(500).json({
			success: false,
			message: `auth check error ${error.message}`,
		});
	}
};
