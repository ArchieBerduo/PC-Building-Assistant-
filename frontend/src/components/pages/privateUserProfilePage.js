import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import getUserInfo from "../../utilities/decodeJwt";
import '../../stylesheets/MainContentLayout.css'; // Import the CSS file

const PrivateUserProfile = () => {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    setUser(getUserInfo());
  }, []);

  if (!user) return (<div><h4>Log in to view this page.</h4></div>);
  const { id, email, username, password } = user
  return (
    <div className="main-content"> {/* Apply the new CSS class */}
       <>
       <div class="left-aligned-text">
         <h3 className='white-text'> Username: <span className='username white-text'> @{username}</span> </h3>
         <h3 className='white-text'> userId: <span className='userId white-text'> {id}</span> </h3>
         <h3 className='white-text'> Email <span className='email white-text'> {email}</span> </h3>
      </div>
          
        </>
      <Button className="logout-modal-button" onClick={handleShow}>Log Out</Button>
      <Modal  
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
          <Modal.Header closeButton>
            <Modal.Title>Log Out</Modal.Title>
          </Modal.Header>
        <Modal.Body>Are you sure you want to Log Out?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
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

