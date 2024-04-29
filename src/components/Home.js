import React, { useState } from 'react';
import {Navbar, Form, FormControl, Container, Button} from 'react-bootstrap';
import { useAuth } from './AuthContext';
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
    
    return (
        <Container>
            <Navbar className={"navbar"}>
                <Navbar.Brand className={"navbar-brand"}>
                    <h1><span>InApp Credit System</span></h1>
                    {/*<Button variant="primary" className={"logout"} onClick={logout}>Logout</Button>*/}
                </Navbar.Brand>
            </Navbar>
            <div className="credit-form">
                <Form>
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
                <div className="eth-output">{eth}</div>
                <div className={"div-logout"}>
                    <Button variant="primary" className={"logout"} onClick={logout}>Logout</Button>
                </div>
            </div>
        </Container>
    );
}

export default Home;
