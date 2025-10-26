"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

interface NavLink {
  href: string;
  label: string;
  highlight?: boolean;
}

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const navLinks: NavLink[] = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/volunteer", label: "Volunteer" },
    {
      href: "/donate",
      label: "Donate",
    },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await signOut({ callbackUrl: "/" });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-md sticky top-0 z-50 border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-3 group focus:outline-none focus:ring-2 focus:ring-green-500/20 rounded-lg p-1 transition-transform duration-300 hover:scale-105"
            aria-label="SustainBite Home"
          >
            <div className="relative">
              <Image
                src="/logo.jpg"
                alt="SustainBite Logo"
                height={64}
                width={64}
                className="h-16 w-16 object-contain rounded-lg"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-green-600 leading-tight">
                Sustain
              </span>
              <span className="text-2xl font-bold text-green-800 leading-tight">
                Bite
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <ul className="flex items-center space-x-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`px-4 py-2.5 rounded-lg text-gray-900 font-semibold text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      link.highlight
                        ? "bg-green-100 hover:bg-green-200 hover:text-gray-900"
                        : "hover:text-green-600 hover:bg-green-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}

              {/* User Section */}
              <li className="ml-6 pl-6 border-l-2 border-gray-200">
                {status === "authenticated" ? (
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm">
                        {session?.user?.name?.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm font-semibold text-gray-700 max-w-[120px] truncate">
                        {session?.user?.name}
                      </span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 font-semibold text-sm shadow-sm hover:shadow-md"
                      aria-label="Logout"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="bg-green-100 hover:bg-green-200 text-gray-900 px-4 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm hover:shadow-md"
                  >
                    Login
                  </Link>
                )}
              </li>
            </ul>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-green-600 p-2 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-lg transition-colors duration-200"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <div className="relative w-6 h-6 flex items-center justify-center">
                <FaBars
                  className={`absolute h-6 w-6 transition-all duration-300 ${
                    isMobileMenuOpen
                      ? "opacity-0 rotate-90"
                      : "opacity-100 rotate-0"
                  }`}
                  aria-hidden="true"
                />
                <FaTimes
                  className={`absolute h-6 w-6 transition-all duration-300 ${
                    isMobileMenuOpen
                      ? "opacity-100 rotate-0"
                      : "opacity-0 -rotate-90"
                  }`}
                  aria-hidden="true"
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "max-h-screen opacity-100 visible py-4"
              : "max-h-0 opacity-0 invisible overflow-hidden"
          }`}
        >
          <div id="mobile-menu" className="border-t border-gray-200">
            <ul className="flex flex-col space-y-2 pt-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block mx-2 px-4 py-3 rounded-lg text-gray-900 font-semibold text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      link.highlight
                        ? "bg-green-100 hover:bg-green-200 hover:text-gray-900"
                        : "hover:text-green-600 hover:bg-green-50"
                    }`}
                    onClick={closeMobileMenu}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}

              {/* Mobile User Section */}
              <li className="pt-4 mt-4 mx-2 border-t border-gray-200">
                {status === "authenticated" ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 px-4 py-2">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold shadow-sm">
                        {session?.user?.name?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium">
                          Signed in as
                        </p>
                        <p className="text-sm font-semibold text-gray-900">
                          {session?.user?.name}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        handleLogout();
                        closeMobileMenu();
                      }}
                      className="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 font-semibold text-sm shadow-sm"
                      aria-label="Logout"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="block px-4 py-3 bg-green-100 hover:bg-green-200 text-gray-900 text-center rounded-lg font-semibold text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
                    onClick={closeMobileMenu}
                  >
                    Login
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
