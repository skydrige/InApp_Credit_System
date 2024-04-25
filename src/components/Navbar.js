import React from 'react';
import { Navbar } from 'react-bootstrap';
import "../assets/Navbar.css"

function NavBar() {
    return (
        <Navbar className={"navbar"}>
            <Navbar.Brand className={"navbar-brand"}>
                <h1><span>InApp Credit System</span></h1>
            </Navbar.Brand>
        </Navbar>
    );
}

export default NavBar;