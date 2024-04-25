import React, { useState } from 'react';
import { Navbar, Form, FormControl } from 'react-bootstrap';
import "../assets/Home.css";
import "../assets/Navbar.css";

function Home() {
    const [credits, setCredits] = useState('');
    const [eth, setEth] = useState('');
    
    const handleCreditsChange = (event) => {
        const val = event.target.value;
        if (/^\d+$/.test(val)) {  // Only non-negative integers are valid
            setCredits(val);
            setEth((val * 0.05).toFixed(3) + ' ETH');
        } else {
            setCredits('');
            if (val === '') {
                setEth('');
            }
            else{
                setEth('Invalid Credits');
            }
        }
    };
    
    return (
        <div>
            <Navbar className={"navbar"}>
                <Navbar.Brand className={"navbar-brand"}>
                    <h1><span>InApp Credit System</span></h1>
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
                    </Form.Group>
                </Form>
                <div className="eth-output">{eth}</div>
            </div>
        </div>
    );
}

export default Home;
