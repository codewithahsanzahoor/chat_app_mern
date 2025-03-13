import User from '../models/user.model.js';
import Message from '../models/message.model.js';
import cloudinary from '../lib/cloudinary.js';
import { getReceiverSocketId, io } from '../lib/socket.js';

export const getUsersForSidebar = async (req, res) => {
	try {
		const loggedInUserId = req.user._id;
		const filteredUsers = await User.find({
			_id: { $ne: loggedInUserId },
		}).select('-password');

		res.status(200).json({
			success: true,
			message: 'Users fetched successfully',
			users: filteredUsers,
		});
	} catch (error) {
		console.log('get users for sidebar error', error.message);
		res.status(500).json({
			success: false,
			message: `get users for sidebar error ${error.message}`,
		});
	}
};

export const getMessages = async (req, res) => {
	try {
		const { id: userToChatId } = req.params;
		const loggedInUserId = req.user._id;

		const messages = await Message.find({
			$or: [
				{
					senderId: loggedInUserId,
					receiverId: userToChatId,
				},
				{
					senderId: userToChatId,
					receiverId: loggedInUserId,
				},
			],
		});

		res.status(200).json({ success: true, messages });
	} catch (error) {
		console.log('get messages error', error.message);
		res.status(500).json({
			success: false,
			message: `get messages error ${error.message}`,
		});
	}
};

export const sendMessage = async (req, res) => {
	try {
		const { text, image } = req.body;
		const { id: receiverId } = req.params;
		const senderId = req.user._id;

		let imageUrl;

		if (image) {
			const uploadResponse = await cloudinary.uploader.upload(
				image,
				{
					resource_type: 'image',
				}
			);
			imageUrl = uploadResponse.secure_url;
		}

		const newMessage = await Message.create({
			senderId,
			receiverId,
			text,
			image: imageUrl,
		});

		// todo: realtime message functionality with socket.io
		const receiverSocketId = getReceiverSocketId(receiverId);

		if (receiverSocketId) {
			io.to(receiverSocketId).emit('newMessage', newMessage);
		}

		res.json({ success: true, message: newMessage });
	} catch (error) {
		console.log('send message error', error.message);
		res.status(500).json({
			success: false,
			message: `send message error ${error.message}`,
		});
	}
};
