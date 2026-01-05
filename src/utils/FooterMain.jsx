import React from "react";
import "../css/FooterMain.css";
import { Link } from "react-router-dom";

function FooterMain() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Social Media Icons */}
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://plus.google.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-google-plus-g"></i>
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-youtube"></i>
          </a>
        </div>

        {/* Navigation Links */}
        {/* <div className="footer-links">
          <a href="#home">Home</a>
          <a href="#news">News</a>
          <a href="#about">About</a>
          <a href="#contact">Contact Us</a>
          <a href="#team">Our Team</a>
        </div> */}

        {/* Copyright */}
        <div className="footer-copyright">
          <p className="text-white">
            Copyright ©2024; Designed & Developed by <Link to={'https://www.agvac.in/'} className="designer">AgVa Healthcare</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default FooterMain;
