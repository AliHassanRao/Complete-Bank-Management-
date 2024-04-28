import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaGoogle, FaSkype } from "react-icons/fa";
import { CiInstagram } from "react-icons/ci";
import './styling/Footer.css'
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>About Us</h5>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="col-md-4">
            <h5>Contact Us</h5>
            <p>Email: info@example.com</p>
            <p>Phone: +123 456 7890</p>
          </div>
          <div className="col-md-4">
            <h5>Follow Us</h5>
            <ul className="social-icons">
         
                <Link to="#">
                  <CiInstagram />
                </Link>
          
           
                <Link to="#" style={{marginLeft:"25px"}}>
                  <FaTwitter />
                </Link>
            
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
