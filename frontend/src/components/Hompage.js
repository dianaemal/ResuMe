import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './HomePage.css'; // Import the custom CSS for styling

function HomePage() {
  const navigate = useNavigate();

  const handleClick = ()=>{
    navigate('/register')

  }
    
   
  return (
    <div className="home-page">
      <Container>
        <Row className="text-center hero-section">
          <Col>
            <h1 className="title">Build Your Professional Resume</h1>
            <p className="subtitle">
              Create a stunning, professional resume in minutes. Choose from customizable templates and export your resume as PDF.
            </p>
            <Button onClick = {handleClick} variant="primary" size="lg" className="cta-button">
              Get Started
            </Button>
          </Col>
        </Row>
        
        <Row className="features-section text-center">
          <Col md={4} className="feature-box">
            <i className="fas fa-file-alt feature-icon"></i>
            <h3>Easy to Use</h3>
            <p>Create your resume with simple steps, guiding you through the entire process.</p>
          </Col>
          <Col md={4} className="feature-box">
            <i className="fas fa-palette feature-icon"></i>
            <h3>Beautiful Templates</h3>
            <p>Choose from a variety of beautifully designed resume templates.</p>
          </Col>
          <Col md={4} className="feature-box">
            <i className="fas fa-download feature-icon"></i>
            <h3>Download as PDF</h3>
            <p>Once you're done, download your resume as a PDF in one click.</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default HomePage;
