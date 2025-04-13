import React from "react";
import { FaInstagram, FaFacebook, FaLinkedin, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-green-800 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {" "}
          
          {/* Logo and Tagline */}
          <div>
            <div className="logo mb-2">
              {" "}
              
              <span className="text-2xl font-bold text-green-200">Sustain</span>
              <br />
              <span className="text-2xl font-bold text-green-100">Bite</span>
            </div>
            <p className="text-sm text-green-200">
              Rescuing food, feeding communities, and sustaining the planet.
            </p>
          </div>
          {/* Newsletter Signup and Social Icons */}
          <div>
            <h3 className="text-lg font-semibold text-green-100 mb-2">
              {" "}
              
              Stay Connected
            </h3>
            <p className="text-sm text-green-200 mb-2">
              {" "}
              
              Subscribe to our newsletter for updates on food rescue efforts and
              sustainability tips.
            </p>
            <form className="flex flex-col sm:flex-row gap-1 mb-3">
              {" "}
              
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-md text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200"
              >
                Subscribe
              </button>
            </form>

            {/* Social Icons */}
            <div className="flex space-x-3">
              {" "}
              
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-200 hover:text-white transition-colors duration-200"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-200 hover:text-white transition-colors duration-200"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-200 hover:text-white transition-colors duration-200"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-200 hover:text-white transition-colors duration-200"
              >
                <FaYoutube size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-4">
          {" "}
          
          <h3 className="text-lg font-semibold text-green-100 mb-2">
            {" "}
            
            Contact Us
          </h3>
          <p className="text-sm text-green-200">
            Email:{" "}
            <a href="mailto:info@sustainbite.com" className="hover:text-white">
              info@sustainbite.com
            </a>
          </p>
          <p className="text-sm text-green-200">
            Phone:{" "}
            <a href="tel:+1234567890" className="hover:text-white">
              +91 (0612) 567-890
            </a>
          </p>
          <p className="text-sm text-green-200">
            Address: 123 Green Street, Eco City
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-4 pt-4 border-t border-green-700 text-center">
          {" "}
          
          <p className="text-sm text-green-200">
            © {new Date().getFullYear()} SustainBite. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
