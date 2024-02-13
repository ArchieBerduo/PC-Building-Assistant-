import React, { useEffect, useState } from "react";
import getUserInfo from '../utilities/decodeJwt';
import { useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import ReactNavbar from 'react-bootstrap/Navbar';
import '../stylesheets/Navbar.css';

// Here, we display our Navbar
export default function Navbar() {
  const [user, setUser] = useState({});
  const location = useLocation(); // Get the current location
  const onHomePage = location.pathname === '/home'; // Check if we're on the home page


   useEffect(() => {
    setUser(getUserInfo());
  }, []);
  
  // if (!user) return null   - for now, let's show the bar even not logged in.
  // we have an issue with getUserInfo() returning null after a few minutes
  // it seems.
  return (
    <ReactNavbar bg="dark" variant="dark" className="vertical-navbar">
      <Nav className="flex-column">
        {!onHomePage && <Nav.Link href="/">Start</Nav.Link>}
        {!onHomePage && <Nav.Link href="/privateUserProfile">Profile</Nav.Link>}
        {!onHomePage && <Nav.Link href="/upgrade">Upgrade</Nav.Link>}
        {!onHomePage && <Nav.Link href="/preference">Preference</Nav.Link>}
        {/* Always show the Home link */}
        <Nav.Link href="/home">Home</Nav.Link>
      </Nav>
    </ReactNavbar>
  );
}