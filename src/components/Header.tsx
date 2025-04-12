"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import Image from "next/image";

interface NavLink {
  href: string;
  label: string;
  highlight?: boolean;
}

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks: NavLink[] = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/volunteer", label: "Volunteer" },
    { href: "/login", label: "Login", highlight: true },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24">
          {/* Logo with Image */}
          <Link href="/" className="flex items-center space-x-3 cursor-pointer">
            <Image
              src={"/logo.jpg"} // Replace with your logo path
              alt="SustainBite Logo"
              height={80}
              width={80}
              className="h-20 w-20 object-contain"
            />
            <div className="p-2 leading-tight">
              <span className="text-4xl font-bold text-green-600 block">
                Sustain
              </span>
              <span className="text-3xl font-bold text-green-800 block">
                Bite
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <ul className="flex items-center space-x-6 font-medium">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`px-3 py-2 rounded-md text-gray-900 font-medium transition-colors duration-200 ${
                      link.highlight
                        ? "bg-green-100 hover:bg-green-200 hover:text-gray-900"
                        : "hover:text-green-600"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-green-600 p-2"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <ul className="flex flex-col space-y-4 p-4 bg-white border-t border-gray-200">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block px-3 py-2 rounded-md text-gray-900 font-medium ${
                      link.highlight
                        ? "bg-green-100 hover:bg-green-200 hover:text-gray-900"
                        : "hover:text-green-600"
                    }`}
                    onClick={toggleMobileMenu}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
