import React from 'react';
import {
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBBtn,
    MDBIcon,
    MDBInput,
    MDBCheckbox
}
    from 'mdb-react-ui-kit';
import './Login-Register.css';

function LoginRegister() {
    return (
        <MDBContainer>
            {/*This is a project that has InAppCreditSystem smart contract having functions Login, Register and UpdateCredits.*/}
            {/*1. Register: This function is used to register a new user with the system. It takes the user's name, password as input and stores the user as key and password as value in the mapping and also stores the user's credits as 0 in format of {user: [password, credits]} in blockchain.*/}
            {/*2. Login: This function is used to login a user with the system. It takes the user's name, password as input and checks if the user is registered or not. If the user is registered, it returns the user's credits which is in Dashboard.*/}
            {/*3. UpdateCredits: This function is used to update the user's credits when user press BuyCredits in Frontend it takes the value of credits and validate the credits in form of ETH like [1 credit = 0.05 ETH] and triggers the metamask to pay the amount and update the user's credits in blockchain.*/}

            <MDBRow>
                <MDBCol md='6'>
                    <MDBRow>
                        <MDBCol md='12'>
                            <h1>Register</h1>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md='12'>
                            <MDBInput label='Name' id='name' type='text' />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md='12'>
                            <MDBInput label='Password' id='password' type='password' />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md='12'>
                            <MDBBtn color='primary'>Register</MDBBtn>
                        </MDBCol>
                    </MDBRow>
                </MDBCol>
                <MDBCol md='6'>
                    <MDBRow>
                        <MDBCol md='12'>
                            <h1>Login</h1>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md='12'>
                            <MDBInput label='Name' id='name' type='text' />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md='12'>
                            <MDBInput label='Password' id='password' type='password' />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md='12'>
                            <MDBBtn color='primary'>Login</MDBBtn>
                        </MDBCol>
                    </MDBRow>
                </MDBCol>
            </MDBRow>

        </MDBContainer>
    );
}

export default LoginRegister;