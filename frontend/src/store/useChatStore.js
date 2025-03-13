import { create } from 'zustand';
import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/axios';
import { useAuthStore } from './useAuthStore';

export const useChatStore = create((set, get) => ({
	messages: [],
	users: [],
	selectedUser: null,
	isUserLoading: false,
	isMessageLoading: false,

	getUsers: async () => {
		set({ isUserLoading: true });
		try {
			const res = await axiosInstance.get('/message/users');
			set({
				users: Array.isArray(res.data.users)
					? res.data.users
					: [],
			});
		} catch (error) {
			toast.error(error.response.data.message);
			console.log('get users error', error);
		} finally {
			set({ isUserLoading: false });
		}
	},

	getMessages: async (id) => {
		set({ isMessageLoading: true });
		try {
			const res = await axiosInstance.get(
				`/message/get-message/${id}`
			);
			set({ messages: res.data.messages });
		} catch (error) {
			toast.error(error.response.data.message);
			console.log('get messages error', error);
		} finally {
			set({ isMessageLoading: false });
		}
	},

	sendMessage: async (messageData) => {
		const { selectedUser, messages } = get();
		try {
			const res = await axiosInstance.post(
				`/message/send-message/${selectedUser._id}`,
				messageData
			);
			set({ messages: [...messages, res.data.message] });
		} catch (error) {
			toast.error(error.response.data.message);
			console.log('send message error', error);
		}
	},

	subscribeToMessages: () => {
		const { selectedUser } = get();
		if (!selectedUser) return;

		const socket = useAuthStore.getState().socket;

		socket.on('newMessage', (newMessage) => {
			const isMessageSentFromSelectedUser =
				newMessage.senderId === selectedUser._id;
			if (!isMessageSentFromSelectedUser) return;

			set({
				messages: [...get().messages, newMessage],
			});
		});
	},

	unsubscribeFromMessages: () => {
		const socket = useAuthStore.getState().socket;
		socket.off('newMessage');
	},

	setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
