import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    useEffect(() => {
        // Initial check for authentication
        const checkAuth = () => {
            const authCookie = Cookies.get('auth');
            setIsAuthenticated(authCookie === 'true');
        };
        
        checkAuth(); // Check on mount
        
        const interval = setInterval(checkAuth, 5000); // Check every 5 seconds
        
        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);
    
    const login = () => {
        setIsAuthenticated(true);
        Cookies.set('auth', 'true', { expires: 1 / 8640 }); // Set cookie to expire in 10 seconds
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
