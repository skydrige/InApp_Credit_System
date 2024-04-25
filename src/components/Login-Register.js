import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import '../assets/Login-Register.css';
import NavBar from "./Navbar";

function Login({ onSwitch }) {
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
            <Button variant="secondary" onClick={onSwitch} className="w-100 mt-3">
                Go to Register
            </Button>
        </Form>
    );
}

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

function LoginRegister() {
    const [showLogin, setShowLogin] = useState(true);
    
    return (
        <Container>
            <NavBar />
            <div className="background" style={{height: "auto"}}>
                <div style={{display: "flex", justifyContent: 'center', width: "auto", alignContent: "center"}}>
                    {showLogin ? <Login onSwitch={() => setShowLogin(false)} /> : <Register onSwitch={() => setShowLogin(true)} />}
                </div>
            </div>
        </Container>    );
}

export default LoginRegister;
