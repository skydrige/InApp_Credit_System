import React, {useEffect, useState} from 'react';
import {Form, FormControl, Container, Button} from 'react-bootstrap';
import { useAuth } from './AuthContext';
import {getCreditBalance, HandleCredits} from './Handle';
import NavBar from "./Navbar";
import "../assets/Home.css";
import "../assets/Navbar.css";

function Home() {
    const [credits, setCredits] = useState('');
    const [eth, setEth] = useState('0 ETH');
    const [Credit, setCredit] = useState(0);
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
            // setCredit(await getCreditBalance());
            // console.log("Credits updated successfully");
        } else {
            setCredits('');
            setEth('0 ETH');
            console.log("Credits update failed");
        }
    }
    
    useEffect(() => {
        const fetchCreditBalance = async () => {
            const balance = await getCreditBalance();
            setCredit(balance);
        };
        fetchCreditBalance().then(r => console.log("Credits fetched successfully ", r)).catch(e => console.log("Error fetching credits", e));
    }, []);
    
    return (
        <Container key={Credit}>
            <NavBar />
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
                {/*<div className={"eth-exist"}>*/}
                {/*    <h3>Your Current Credits: {Credit}</h3>*/}
                {/*</div>*/}
                <div className={"div-logout"}>
                    <Button variant="primary" className={"logout"} onClick={logout}>Logout</Button>
                </div>
            </div>
        </Container>
    );
}

export default Home;
