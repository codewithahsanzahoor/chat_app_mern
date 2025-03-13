import Navbar from './components/Navbar';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import SettingsPage from './pages/SettingsPage';
import ProfilePage from './pages/ProfilePage';

import { Loader } from 'lucide-react';

import { useAuthStore } from './store/useAuthStore.js';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useThemeStore } from './store/useThemeStore.js';

function App() {
	const { checkAuth, authUser, isCheckingAuth } = useAuthStore();
	const { theme } = useThemeStore();
	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	// if authUser is null and isCheckingAuth is true, show loader
	if (isCheckingAuth && !authUser) {
		return (
			<div className='flex justify-center items-center h-screen'>
				<Loader className='animate-spin size-10' />
			</div>
		);
	}

	return (
		<>
			<div data-theme={theme}>
				<Toaster />
				<Navbar />
				<Routes>
					<Route
						path='/'
						element={
							authUser ? (
								<HomePage />
							) : (
								<Navigate to='/login' />
							)
						}
					/>
					<Route
						path='/login'
						element={
							!authUser ? (
								<LoginPage />
							) : (
								<Navigate to='/' />
							)
						}
					/>
					<Route
						path='/signup'
						element={
							!authUser ? (
								<SignUpPage />
							) : (
								<Navigate to='/' />
							)
						}
					/>
					<Route
						path='/settings'
						element={<SettingsPage />}
					/>
					<Route
						path='/profile'
						element={
							authUser ? (
								<ProfilePage />
							) : (
								<Navigate to='/login' />
							)
						}
					/>
				</Routes>
			</div>
		</>
	);
}

export default App;
