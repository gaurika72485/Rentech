import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        {/* About Us Section */}
        <div className="footer__section">
          <h3>About GadgetValley</h3>
          <p>We provide a wide range of gadgets for rent, from smartphones to drones. Rent the latest tech at affordable prices, and return it when you're done!</p>
        </div>

        {/* Quick Links Section */}
        <div className="footer__section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/faqs">FAQs</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/terms">Terms of Service</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="footer__section">
          <h3>Contact Us</h3>
          <p><i className="fas fa-phone"></i> 9878451578</p>
          <p><i className="fas fa-envelope"></i> support@gadgetvalley.com</p>
          <p><i className="fas fa-map-marker-alt"></i> Hardcastle Business Park, Nariman Point, Mumbai</p>
        </div>

        {/* Social Media Section */}
        <div className="footer__section">
          <h3>Follow Us</h3>
          <div className="social__icons">
            <ul>
                <li><a href="https://facebook.com"><i className="fab fa-facebook-f"></i>Facebook</a></li>
                <li><a href="https://twitter.com"><i className="fab fa-twitter"></i>Twitter</a></li>
                <li><a href="https://instagram.com"><i className="fab fa-instagram"></i>Instagram</a></li>
                <li><a href="https://linkedin.com"><i className="fab fa-linkedin-in"></i>LinkedIN</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="footer__bottom">
        <p>&copy; 2024 GadgetValley. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
