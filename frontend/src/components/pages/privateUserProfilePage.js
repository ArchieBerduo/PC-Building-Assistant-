import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from 'axios';
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import getUserInfo from "../../utilities/decodeJwt";
import '../../stylesheets/MainContentLayout.css'; // Import the CSS file

const PrivateUserProfile = () => {
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
      <>
        <h1 className="profile-heading white-text">Profile</h1>
        <div className="left-aligned-text">
          <h3 className="white-text" style={{ marginRight: "20px" }}>Username:
            <span className="username white-text" style={{ marginLeft: "10px" }}>{username}</span>
          </h3>
          <h3 className="white-text" style={{ marginRight: "20px" }}>Email:
            <span className="email white-text" style={{ marginLeft: "10px" }}>{email}</span>
          </h3>
        </div>
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
        <div className="action-buttons-container">
        <Button className="config-button-new" onClick={() => navigate("/configure")}>
    <img src="/plus-sign-icon.png" alt="add" style={{ filter: 'invert(100%)' }} />
    <span>Add more configurations</span>
</Button>
          {/* Add the new navigation button for all recommendations */}
          <Button className="view-recommendations-button" onClick={() => navigate("/AllMyRecommendations")}>
    View All My Recommendations
</Button>
        </div>
      </>
      <Button className="logout-modal-button" onClick={() => setShow(true)}>Log Out</Button>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Log Out</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to Log Out?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleLogout}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PrivateUserProfile;
