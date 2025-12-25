"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

interface NavLink {
  href: string;
  label: string;
}

const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/volunteer", label: "Volunteer" },
  { href: "/donate", label: "Donate" },
];

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileMenuOpen]);

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

  const handleLogout = async () => {
    try {
      await signOut({ callbackUrl: "/" });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const getLinkClasses = (href: string, isMobile = false) => {
    const isActive = pathname === href;
    const baseClasses =
      "transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 font-semibold text-sm rounded-lg";

    const layoutClasses = isMobile
      ? "block mx-2 px-4 py-3 text-gray-900"
      : "px-4 py-2.5 text-gray-900";

    const stateClasses = isActive
      ? "bg-green-100 text-green-700"
      : "hover:text-green-600 hover:bg-green-50";

    return `${baseClasses} ${layoutClasses} ${stateClasses}`;
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* --- Logo Section --- */}
          <Link
            href="/"
            className="group flex items-center space-x-3 rounded-lg p-1 transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500/20"
            aria-label="SustainBite Home"
          >
            <div className="relative h-16 w-16">
              <Image
                src="/Logo.jpg"
                alt="SustainBite Logo"
                fill
                className="object-contain rounded-lg"
                priority
                sizes="64px"
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

          {/* --- Desktop Navigation --- */}
          <div className="hidden md:flex items-center">
            <ul className="flex items-center space-x-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={getLinkClasses(link.href)}
                    aria-current={pathname === link.href ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}

              {/* User / Auth Section */}
              <li className="ml-6 pl-6 border-l-2 border-gray-200">
                {status === "authenticated" && session?.user ? (
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-3">
                      {/* Avatar */}
                      <div className="h-9 w-9 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white font-bold text-sm shadow-sm ring-2 ring-white">
                        <span>
                          {session.user.name?.charAt(0).toUpperCase() || "U"}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-gray-700 max-w-[150px] truncate">
                        {session.user.name || "User"}
                      </span>
                    </div>

                    <button
                      onClick={handleLogout}
                      className="bg-red-50 text-red-600 border border-red-100 hover:bg-red-600 hover:text-white px-4 py-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 font-semibold text-sm"
                      aria-label="Logout"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="bg-green-600 text-white hover:bg-green-700 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm hover:shadow-green-200"
                  >
                    Login
                  </Link>
                )}
              </li>
            </ul>
          </div>

          {/* --- Mobile Menu Button --- */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-green-600 p-2 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-lg transition-colors duration-200"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <div className="relative w-6 h-6 flex items-center justify-center">
                <FaBars
                  className={`absolute h-6 w-6 transition-all duration-300 transform ${
                    isMobileMenuOpen
                      ? "opacity-0 rotate-90 scale-75"
                      : "opacity-100 rotate-0 scale-100"
                  }`}
                  aria-hidden="true"
                />
                <FaTimes
                  className={`absolute h-6 w-6 transition-all duration-300 transform ${
                    isMobileMenuOpen
                      ? "opacity-100 rotate-0 scale-100"
                      : "opacity-0 -rotate-90 scale-75"
                  }`}
                  aria-hidden="true"
                />
              </div>
            </button>
          </div>
        </div>

        {/* --- Mobile Menu Dropdown --- */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "max-h-screen opacity-100 py-4"
              : "max-h-0 opacity-0"
          }`}
          id="mobile-menu"
        >
          <div className="border-t border-gray-100 pt-2 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={getLinkClasses(link.href, true)}
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile Auth Section */}
            <div className="border-t border-gray-100 mt-4 pt-4 px-2">
              {status === "authenticated" && session?.user ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 px-2">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white font-bold shadow-sm">
                      <span>
                        {session.user.name?.charAt(0).toUpperCase() || "U"}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                        Signed in as
                      </p>
                      <p className="text-sm font-semibold text-gray-900">
                        {session.user.name || "User"}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full bg-red-50 text-red-600 border border-red-100 hover:bg-red-600 hover:text-white px-4 py-3 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 font-semibold text-sm"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center bg-green-600 text-white hover:bg-green-700 px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-200 shadow-sm"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
