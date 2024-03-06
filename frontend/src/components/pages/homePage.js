import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import getUserInfo from '../../utilities/decodeJwt'; // Ensure this path matches the location of your decodeJwt file
import '../../stylesheets/HomePage.css';

const HomePage = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Perform logout logic
        navigate('/'); // Redirect to landing page after logout
    };

    // Function to check PC Configuration and navigate accordingly
    const checkPCConfigurationAndNavigate = async () => {
      const userInfo = getUserInfo();
      if (!userInfo) {
        console.error("No user info found");
        return;
      }
    
      try {
        // Fetch PC configurations from the server
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/pcConfigPull`);

        if (!response.data) {
          throw new Error('No PC configurations found');
        }
    
        const pcConfigurations = response.data;
    
        // Check if any configuration matches the current user's username and email
        const matchingConfig = pcConfigurations.find(config => config.username === userInfo.username && config.email === userInfo.email);
        if (matchingConfig) {
          navigate('/preference');
        } else {
          navigate('/configure');
        }
      } catch (error) {
        console.error('Error checking PC configuration:', error);
      }
    };
    


    return (
        <div className="home-page-buttons">
          <button onClick={() => navigate('/privateUserProfile')}>
            <img src='/profileIcon.png' alt="Profile" style={{ filter: 'invert(100%)' }} />
            <span>Profile</span>
          </button>
          {/* Updated to use the new function for conditional navigation */}
          <button onClick={checkPCConfigurationAndNavigate}>
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

export default HomePage;
