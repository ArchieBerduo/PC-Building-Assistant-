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
            <img src='/profileIcon.png' alt="Profile" />
            <span>Profile</span>
          </button>
          <button onClick={() => navigate('/upgrade')}>
            <img src='/upgradeIcon.png' alt="Upgrade" />
            <span>Upgrade</span>
          </button>
          <button onClick={handleLogout}>
            <img src='/logoutIcon.png' alt="Logout" />
            <span>Logout</span>
          </button>
        </div>
      );
    };

export default HomePage