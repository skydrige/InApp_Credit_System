import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import LoginRegister from './components/Login-Register';
import Home from './components/Home';
import ProtectedRoute from './components/ProtectedRoute';
import './assets/Login-Register.css';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={
                        <ProtectedRoute>
                            <Navigate to="/home" />
                        </ProtectedRoute>
                    } />
                    <Route path="/home" element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    } />
                    <Route path="/login-register" element={<LoginRegister />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
