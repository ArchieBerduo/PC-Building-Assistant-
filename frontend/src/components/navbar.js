import React, { useEffect, useState } from "react";
import getUserInfo from '../utilities/decodeJwt';
import { useLocation, useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import ReactNavbar from 'react-bootstrap/Navbar';
import '../stylesheets/Navbar.css';

export default function Navbar() {
  const [user, setUser] = useState({});
  const location = useLocation(); // Get the current location
  const onHomePage = location.pathname === '/home'; // Check if we're on the home page

  useEffect(() => {
    setUser(getUserInfo());
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout logic
    navigate('/'); // Redirect to landing page after logout
  };

  return (
    <ReactNavbar bg="dark" variant="dark" className="vertical-navbar custom-navbar">
      <Nav className="flex-column">
        {!onHomePage && <>
          <Nav.Link href="/home">
            <img src='/homeIcon.png' alt="Home" style={{ width: '40px', height: '40px', filter: 'invert(100%)' }} />
          </Nav.Link>
          <Nav.Link href="/privateUserProfile">
            <img src='/profileIcon.png' alt="Profile" style={{ width: '40px', height: '40px', filter: 'invert(100%)' }} />
          </Nav.Link>
          <Nav.Link href="/preference">
            <img src='/upgradeIcon.png' alt="Upgrade Preference" style={{ width: '40px', height: '40px', filter: 'invert(100%)' }} />
          </Nav.Link>
          <div className="spacer"></div> {/* Spacer to push logout to the bottom */}
        </>}
        {!onHomePage && <Nav.Link as="button" onClick={handleLogout} className="mt-auto"> {/* mt-auto will push this link to the bottom */}
          <img src='/logoutIcon.png' alt="Logout" style={{ width: '40px', height: '40px', filter: 'invert(100%)' }} />
        </Nav.Link>}
      </Nav>
    </ReactNavbar>
  );
}
