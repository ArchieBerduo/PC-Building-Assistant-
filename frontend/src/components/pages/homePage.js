import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import getUserInfo from '../../utilities/decodeJwt'
import '../../stylesheets/HomePage.css';
const HomePage = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Perform logout logic
        navigate('/'); // Redirect to landing page after logout
      };


  
  
      return (
        <div className="home-page-buttons">
          <button onClick={() => navigate('/privateUserProfile')}>
            <img src='/profileIcon.png' alt="Profile" style={{ filter: 'invert(100%)' }} />
            <span>Profile</span>
          </button>
          <button onClick={() => navigate('/upgrade')}>
            <img src='/upgradeIcon.png' alt="Upgrade" style={{ filter: 'invert(100%)' }} />
            <span>Upgrade</span>
          </button>
          <button onClick={handleLogout}>
            <img src='/logoutIcon.png' alt="Logout" style={{ filter: 'invert(100%)' }} />
            <span>Logout</span>
          </button>
        </div>
    );
    
    };

export default HomePage