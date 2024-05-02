import React, {useEffect, useState} from 'react';
import { Form, Button } from 'react-bootstrap';
import {addWalletListener, getCurrentWalletConnected, HandleRegister} from "./Handle";

function Register({ onSwitch }) {
    const [walletAddress, setWalletAddress] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    useEffect(() => {
        getCurrentWalletConnected().then(address => setWalletAddress(address));
        addWalletListener(setWalletAddress);
    }, []);
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        const success = await HandleRegister(username, password);
        if (success) {
            onSwitch();
        } else {
            alert("Registration failed");
        }
    }
    
    return (
        <Form className="auth-form" onSubmit={handleSubmit}>
            <h3 className="text-center mb-4">Register Here</h3>
            <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
            </Form.Group>
            <Button type="button" className="w-100 mt-4" disabled={!walletAddress}>
                {walletAddress ? 'Wallet Connected' : 'Connect Wallet'}
            </Button>
            <Button type="submit" className="w-100 mt-4">
                Register
            </Button>
            <Button onClick={onSwitch} className="w-100 mt-3">
                Go to Login
            </Button>
        </Form>
    );
}

export default Register;