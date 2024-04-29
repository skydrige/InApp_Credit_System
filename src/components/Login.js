import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { HandleLogin } from './Handle'; // Adjust the path as necessary
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function Login({ onSwitch }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();
    
    const onSubmit = (e) => {
        e.preventDefault();
        if (HandleLogin(username, password)) {
            login();
            navigate('/home');
        } else {
            onSwitch();
        }
    };
    
    return (
        <Form className="auth-form" onSubmit={onSubmit}>
            <h3 className="text-center mb-4">Login</h3>
            <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 mt-4">
                Log In
            </Button>
            <Button variant="secondary" onClick={onSwitch} className="w-100 mt-3">
                Go to Register
            </Button>
        </Form>
    );
}

export default Login;