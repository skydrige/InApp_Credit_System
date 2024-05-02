import React, {useEffect, useState} from 'react';
import { Form, Button } from 'react-bootstrap';
import {addWalletListener, getCurrentWalletConnected} from "./Handle";

function Register({ onSwitch }) {
    const [walletAddress, setWalletAddress] = useState('');
    
    useEffect(() => {
        getCurrentWalletConnected().then(address => setWalletAddress(address));
        addWalletListener(setWalletAddress);
    }, []);
    
    return (
        <Form className="auth-form">
            <h3 className="text-center mb-4">Register Here</h3>
            <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Username"/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password"/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Confirm Password"/>
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
