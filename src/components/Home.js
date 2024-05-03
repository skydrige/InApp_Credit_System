import React, { useState } from 'react';
import {Navbar, Form, FormControl, Container, Button} from 'react-bootstrap';
import { useAuth } from './AuthContext';
import { HandleCredits } from './Handle';
import "../assets/Home.css";
import "../assets/Navbar.css";

function Home() {
    const [credits, setCredits] = useState('');
    const [eth, setEth] = useState('0 ETH');
    
    const { logout } = useAuth();
    
    const handleCreditsChange = (event) => {
        const val = event.target.value;
        if (/^\d+$/.test(val)) {  // Only non-negative integers are valid
            setCredits(val);
            setEth((val * 0.0005).toFixed(3) + ' ETH');
        } else {
            setCredits('');
            if (val === '') {
                setEth('0 ETH');
            }
            else{
                setEth('Invalid Credits');
            }
        }
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const success = await HandleCredits(credits);
        if (success) {
            setCredits('');
            setEth('0 ETH');
            console.log("Credits updated successfully");
        } else {
            setCredits('');
            setEth('0 ETH');
            console.log("Credits update failed");
        }
    }
    
    return (
        <Container>
            <Navbar className={"navbar"}>
                <Navbar.Brand className={"navbar-brand"}>
                    <h1><span>InApp Credit System</span></h1>
                </Navbar.Brand>
            </Navbar>
            <div className="credit-form">
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Enter Credits</Form.Label>
                        <FormControl
                            type="text"
                            value={credits}
                            onChange={handleCreditsChange}
                            placeholder="Number of Credits"
                            className="credits-input"
                        />
                        <Button variant="primary" type={"submit"} className={"submit-button"}>Submit</Button>
                    </Form.Group>
                </Form>
                <div className={"eth-output"}>{eth}</div>
                <div className={"eth-exist"}>
                    {/*<h3>{Credit} Credits</h3>*/}
                </div>
                <div className={"div-logout"}>
                    <Button variant="primary" className={"logout"} onClick={logout}>Logout</Button>
                </div>
            </div>
        </Container>
    );
}

export default Home;
