import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from 'axios';
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import getUserInfo from "../../utilities/decodeJwt";
import '../../stylesheets/MainContentLayout.css'; // Import the CSS file

const ChooseConfig = () => {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({});
  const [pcConfigurations, setPcConfigurations] = useState([]);
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.clear();
    navigate("/");
  };


  useEffect(() => {
    displayYourConfigs();
    setUser(getUserInfo());
  }, []);

  const displayYourConfigs = async () => {
    const userInfo = getUserInfo();
    if (!userInfo) {
      console.error("No user info found");
      return;
    }

    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/pcConfiguration`);
      if (!response.data) {
        throw new Error('No PC configurations found');
      }

      const pcConfigurations = response.data.filter(config => config.username === userInfo.username && config.email === userInfo.email);
      setPcConfigurations(pcConfigurations);
    } catch (error) {
      console.error('Error fetching/displaying PC configurations:', error);
    }
  };

  if (!user) return (<div><h4>Log in to view this page.</h4></div>);
  const { username, email } = user;

 return (
    <div className="main-content">
      <h1 className="profile-heading white-text">Choose which configuration you want to upgrade.</h1>
      <div className="pc-config-container">
        {pcConfigurations.map((config, index) => (
          <Button key={index} className="pc-config-card" style={{ width: '400px', height: '400px' }} onClick={() => navigate("/preference", { state: { selectedConfig: config } })}>
            <Card style={{ backgroundColor: '#2a2a2a', color: '#fff', width: '100%', height: '100%' }}>
              <Card.Body>
                <Card.Title>PC Configuration {index + 1}</Card.Title>
                <Card.Text>
                  <p>CPU: {config.cpu}</p>
                  <p>GPU: {config.gpu}</p>
                  <p>HDD: {config.hdd}</p>
                  <p>SSD: {config.ssd}</p>
                  <p>RAM: {config.ram}</p>
                </Card.Text>
              </Card.Body>
            </Card>
          </Button>
        ))}
      </div>
    </div>
  );
};


export default ChooseConfig;
