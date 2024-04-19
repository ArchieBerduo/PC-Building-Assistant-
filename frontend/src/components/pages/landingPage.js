import React, {} from 'react'
import Card from 'react-bootstrap/Card';
import '../../stylesheets/landingPage.css'; // Update this path as necessary

const Landingpage = () => {
    
  return (
    <div className="landing-page-container">
        <Card className="landing-card">
            <Card.Body>
                <Card.Title>Welcome to PC Building Assistant</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Don't have an account?</Card.Subtitle>
                <Card.Link href="/signup">Sign Up</Card.Link>
                <Card.Link href="/login">Login</Card.Link>
            </Card.Body>
        </Card>
    </div>
);
}

export default Landingpage