import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import '../assets/Login-Register.css';

function Login() {
    return (
        <Form className="auth-form" style={{ marginRight: "5%" }}>
            <h3 className="text-center mb-4">Login</h3>
            <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Username" />
            </Form.Group>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 mt-4">
                Log In
            </Button>
        </Form>
    );
}

function Register() {
    return (
        <Form className="auth-form">
            <h3 className="text-center mb-4">Register Here</h3>
            <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Username" />
            </Form.Group>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Confirm Password" />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 mt-4">
                Register
            </Button>
        </Form>
    );
}

function LoginRegister() {
    return (
        <Container>
            <div className="background d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
                <div style={{ display: "flex", justifyContent: 'space-around' }}>
                    <Login />
                    <Register />
                </div>
            </div>
        </Container>
    );
}

export default LoginRegister;

