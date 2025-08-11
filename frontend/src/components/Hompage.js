import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faPalette, faDownload, faCheckCircle, faUsers, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/dashboard');
  };

  const handleLearnMore = () => {
    // Scroll to features section
    document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
  };
    
  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h1 className="hero-title">
                Create Professional Resumes in Minutes
              </h1>
              <p className="hero-subtitle">
                Build stunning, ATS-friendly resumes with our easy-to-use builder. 
                Choose from professional templates and export to PDF instantly.
              </p>
              <div className="hero-buttons">
                <Button onClick={handleGetStarted} className="btn-primary" >
                  Start Building
                </Button>
                <Button onClick={handleLearnMore} variant="outline-primary" className="btn-secondary">
                  Learn More
                </Button>
              </div>
              <div className="hero-stats" style={{color: '#9eacea'}}>
                <div className="stat">
                  <span className="stat-number" style={{color: 'white'}}>10K+</span>
                  <span className="stat-label"  style={{color: 'white'}}>Resumes Created</span>
                </div>
                <div className="stat">
                  <span className="stat-number"  style={{color: 'white'}}>5</span>
                  <span className="stat-label"  style={{color: 'white'}}>Professional Templates</span>
                </div>
                <div className="stat">
                  <span className="stat-number"  style={{color: 'white'}}>100%</span>
                  <span className="stat-label"  style={{color: 'white'}}>Free to Use</span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <Container>
          <div className="section-header text-center">
            <h2>Everything You Need to Create the Perfect Resume</h2>
            <div className=" text-center">
              Professional tools designed to help you stand out in today's competitive job market
            </div>
          </div>
          
          <Row className="features-grid">
            <Col md={4} className="feature-card">
              <div className="feature-icon">
                <FontAwesomeIcon icon={faFileAlt} />
              </div>
              <h3>Easy Resume Builder</h3>
              <p >Step-by-step guidance through each section. No design skills required - just focus on your content.</p>
            </Col>
            
            <Col md={4} className="feature-card">
              <div className="feature-icon">
                <FontAwesomeIcon icon={faPalette} />
              </div>
              <h3>Professional Templates</h3>
              <p>Choose from 5 carefully crafted templates designed to pass ATS systems and impress hiring managers.</p>
            </Col>
            
            <Col md={4} className="feature-card">
              <div className="feature-icon">
                <FontAwesomeIcon icon={faDownload} />
              </div>
              <h3>Instant PDF Export</h3>
              <p>Download your resume as a high-quality PDF ready to send to employers or upload to job sites.</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="benefits-content">
              <h2>Why Choose ResuMe?</h2>
              <div className="benefits-list">
                <div className="benefit-item">
                  <FontAwesomeIcon icon={faCheckCircle} className="benefit-icon" />
                  <div>
                    <h4>ATS-Optimized</h4>
                    <p>Our templates are designed to pass Applicant Tracking Systems</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <FontAwesomeIcon icon={faCheckCircle} className="benefit-icon" />
                  <div>
                    <h4>Mobile-Friendly</h4>
                    <p>Create and edit your resume on any device, anywhere</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <FontAwesomeIcon icon={faCheckCircle} className="benefit-icon" />
                  <div>
                    <h4>Privacy-First</h4>
                    <p>Your data is secure and never shared with third parties</p>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={6} className="benefits-visual">
              <div className="template-showcase">
                <div className="template-grid">
                  <div className="template-preview template-1"></div>
                  <div className="template-preview template-2"></div>
                  <div className="template-preview template-3"></div>
                  <div className="template-preview template-4"></div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <Container>
          <div className="cta-content text-center">
            <h2>Ready to Create Your Professional Resume?</h2>
            <p>Join thousands of job seekers who have landed their dream jobs with ResuMe</p>
            <Button onClick={handleGetStarted} className="btn-primary btn-large">
              Get Started Now
            </Button>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="homepage-footer">
        <Container>
          <div className="footer-content">
            <div className="footer-brand">
              <h3>ResuMe</h3>
              <p>Professional resume builder for modern job seekers</p>
            </div>
            <div className="footer-links">
              <div className="footer-section">
                <h4>Product</h4>
                <ul>
                  <li><a href="#features">Features</a></li>
                  <li><a href="#templates">Templates</a></li>
                  <li><a href="#pricing">Pricing</a></li>
                </ul>
              </div>
              <div className="footer-section">
                <h4>Support</h4>
                <ul>
                  <li><a href="#help">Help Center</a></li>
                  <li><a href="#contact">Contact Us</a></li>
                  <li><a href="#feedback">Feedback</a></li>
                </ul>
              </div>
              <div className="footer-section">
                <h4>Company</h4>
                <ul>
                  <li><a href="#about">About</a></li>
                  <li><a href="#privacy">Privacy</a></li>
                  <li><a href="#terms">Terms</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 ResuMe. All rights reserved.</p>
          </div>
        </Container>
      </footer>
    </div>
  );
}

export default HomePage;
