import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(() => {
		const authCookie = Cookies.get('auth');
		return authCookie !== undefined;
	});
	
	useEffect(() => {
		const interval = setInterval(() => {
			const authCookie = Cookies.get('auth');
			setIsAuthenticated(authCookie !== undefined);
		}, 5000); // Check every 5 seconds
		return () => clearInterval(interval);
	}, []);
	
	const login = () => {
		const randomBytes = new Uint8Array(32);
		window.crypto.getRandomValues(randomBytes);
		const randomString = Array.from(randomBytes, byte => ('0' + (byte & 0xFF).toString(16)).slice(-2)).join('');
		
		setIsAuthenticated(true);
		Cookies.set('auth', randomString, { expires: 7 });
	};
	
	const logout = () => {
		setIsAuthenticated(false);
		Cookies.remove('auth');
	};
	
	return (
		<AuthContext.Provider value={{ isAuthenticated, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
