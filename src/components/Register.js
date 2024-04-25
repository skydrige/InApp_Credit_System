import React from 'react';
import { Form, Button } from 'react-bootstrap';

function Register({ onSwitch }) {
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
            <Button variant="primary" type="submit" className="w-100 mt-4">
                Register
            </Button>
            <Button variant="secondary" onClick={onSwitch} className="w-100 mt-3">
                Go to Login
            </Button>
        </Form>
    );
}

export default Register;
