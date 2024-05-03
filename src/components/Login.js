import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { HandleLogin } from './Handle'; // Adjust the path as necessary
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { getCurrentWalletConnected, addWalletListener, connectWallet } from './Handle';

function Login({ onSwitch }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [walletAddress, setWalletAddress] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();
    const { logout } = useAuth();
    
    useEffect(() => {
        getCurrentWalletConnected().then(address => setWalletAddress(address));
        addWalletListener(setWalletAddress);
    }, []);
    
    const onSubmit = async (e) => {
        e.preventDefault();
        if (walletAddress) {
            const loginResult = await HandleLogin(username, password);
            if (loginResult) {
                login();
                navigate('/home');
            } else {
                // logout();
                onSwitch();
                logout();
            }
        }
    };
    
    return (
        <Form className="auth-form" onSubmit={onSubmit}>
            <h3 className="text-center mb-4">Login</h3>
            <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} disabled={!walletAddress} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} disabled={!walletAddress} />
            </Form.Group>
            <Button type="button" className="w-100 mt-4" onClick={() => connectWallet(setWalletAddress)}>
                {walletAddress ? 'Wallet Connected' : 'Connect Wallet'}
            </Button>
            <Button type="submit" className="w-100 mt-4" disabled={!walletAddress}>
                Log In
            </Button>
            <Button onClick={onSwitch} className="w-100 mt-3">
                Go to Register
            </Button>
        </Form>
    );
}

export default Login;
