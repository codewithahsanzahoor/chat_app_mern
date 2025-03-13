import { create } from 'zustand'
import { axiosInstance } from '../lib/axios.js'
import toast from 'react-hot-toast'
import { io } from 'socket.io-client'

export const useAuthStore = create((set, get) => ({
	authUser: null,
	isSigningUp: false,
	isLoggingIn: false,
	isUpdatingProfile: false,
	socket: null,

	isCheckingAuth: true,

	onlineUsers: Array(),

	checkAuth: async () => {
		try {
			const res = await axiosInstance.get('/auth/auth-check')
			set({ authUser: res.data.user })
			toast.success('Auth check successful')
			get().connectSocket()
		} catch (error) {
			toast.error(error.response.data.message)
			console.log('check auth error', error)
			set({ authUser: null })
		} finally {
			set({ isCheckingAuth: false })
		}
	},

	signUp: async (data) => {
		set({ isSigningUp: true })
		try {
			const res = await axiosInstance.post('/auth/signup', data)
			set({ authUser: res.data.user })
			toast.success('Account created successfully')
			get().connectSocket()
		} catch (error) {
			toast.error(error.response.data.message)
			console.log('signup error', error)
		} finally {
			set({ isSigningUp: false })
		}
	},

	login: async (data) => {
		set({ isLoggingIn: true })
		try {
			const res = await axiosInstance.post('/auth/login', data)
			set({ authUser: res.data.user })
			toast.success('Login successful')
			get().connectSocket()
		} catch (error) {
			toast.error(error.response.data.message)
			console.log('login error', error)
		} finally {
			set({ isLoggingIn: false })
		}
	},

	logOut: async () => {
		try {
			await axiosInstance.post('/auth/logout')
			set({ authUser: null })
			toast('Logout successful')
			get().disconnectSocket()
		} catch (error) {
			toast.error(error.response.data.message)
			console.log('logout error', error)
		}
	},

	updateProfile: async (data) => {
		set({ isUpdatingProfile: true })
		try {
			const res = await axiosInstance.put(
				'/auth/update-profile',
				data
			)
			set({ authUser: res.data.user })
			toast.success('Profile updated successfully')
		} catch (error) {
			toast.error(error.response.data.message)
			console.log('update profile error', error)
		} finally {
			set({ isUpdatingProfile: false })
		}
	},

	connectSocket: async () => {
		const { authUser } = get()
		if (!authUser || get().socket?.connected) return

		const socket = io('http://localhost:3000', {
			query: { userId: authUser._id },
		})
		socket.connect()

		set({ socket })

		socket.on('onlineUsers', (onlineUsers) => {
			set({ onlineUsers: onlineUsers })
		})
	},
	disconnectSocket: async () => {
		if (get().socket?.connected) get().socket.disconnect()
	},
}))
