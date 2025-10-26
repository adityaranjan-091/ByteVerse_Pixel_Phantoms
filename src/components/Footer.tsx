"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaYoutube,
  FaTwitter,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

interface SocialLink {
  href: string;
  icon: React.ReactNode;
  label: string;
}

interface FooterLink {
  href: string;
  label: string;
}

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const socialLinks: SocialLink[] = [
    {
      href: "https://instagram.com/",
      icon: <FaInstagram size={18} aria-hidden="true" />,
      label: "Follow us on Instagram",
    },
    {
      href: "https://facebook.com/",
      icon: <FaFacebook size={18} aria-hidden="true" />,
      label: "Like us on Facebook",
    },
    {
      href: "https://twitter.com/",
      icon: <FaTwitter size={18} aria-hidden="true" />,
      label: "Follow us on Twitter",
    },
    {
      href: "https://linkedin.com/",
      icon: <FaLinkedin size={18} aria-hidden="true" />,
      label: "Connect on LinkedIn",
    },
    {
      href: "https://youtube.com/",
      icon: <FaYoutube size={18} aria-hidden="true" />,
      label: "Subscribe on YouTube",
    },
  ];

  const companyLinks: FooterLink[] = [
    { href: "/about", label: "About Us" },
    { href: "/mission", label: "Our Mission" },
    { href: "/team", label: "Our Team" },
    { href: "/impact", label: "Impact Report" },
    { href: "/careers", label: "Careers" },
  ];

  const resourceLinks: FooterLink[] = [
    { href: "/volunteer", label: "Volunteer" },
    { href: "/donate", label: "Donate" },
    { href: "/partners", label: "Our Partners" },
    { href: "/blog", label: "Blog" },
    { href: "/faq", label: "FAQ" },
  ];

  const legalLinks: FooterLink[] = [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/cookie-policy", label: "Cookie Policy" },
  ];

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setSubmitMessage("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      // Replace with your actual newsletter subscription logic
      // Example: await fetch('/api/newsletter', { method: 'POST', body: JSON.stringify({ email }) })
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSubmitMessage("Thank you for subscribing!");
      setEmail("");

      setTimeout(() => setSubmitMessage(""), 3000);
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      setSubmitMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer
      className="bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white relative overflow-hidden"
      role="contentinfo"
    >
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/10 via-transparent to-emerald-900/10 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1 space-y-6">
            <div className="mb-6">
              <div className="inline-block">
                <h2 className="text-4xl font-black tracking-tight">
                  <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                    Sustain
                  </span>
                  <span className="text-white block mt-1">Bite</span>
                </h2>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Rescuing food, feeding communities, and sustaining the planet
              through innovative solutions and compassionate action.
            </p>
            {/* Social Media Links */}
            <div>
              <h3 className="text-xs font-bold text-gray-500 mb-4 uppercase tracking-wider">
                Connect With Us
              </h3>
              <div className="flex items-center gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-2.5 text-gray-400 hover:text-white bg-gray-800/50 hover:bg-emerald-600 rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-emerald-600/20"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Company
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-emerald-400 text-sm transition-colors duration-200 inline-block relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-emerald-400 after:left-0 after:-bottom-1 hover:after:w-full after:transition-all"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Get Involved
            </h3>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-emerald-400 text-sm transition-colors duration-200 inline-block relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-emerald-400 after:left-0 after:-bottom-1 hover:after:w-full after:transition-all"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Newsletter
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Get the latest updates on food rescue efforts and sustainability
              tips.
            </p>

            <form
              onSubmit={handleSubscribe}
              className="space-y-3"
              aria-label="Newsletter subscription"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <div className="relative">
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm"
                  aria-required="true"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-4 py-3 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] shadow-lg shadow-emerald-600/20 text-sm"
                aria-label="Subscribe to newsletter"
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </button>
            </form>

            {submitMessage && (
              <p
                className={`text-sm mt-3 font-medium ${
                  submitMessage.includes("Thank you")
                    ? "text-emerald-400"
                    : "text-red-400"
                }`}
                role="alert"
                aria-live="polite"
              >
                {submitMessage}
              </p>
            )}
          </div>
        </div>

        {/* Contact Information */}
        <div className="py-12 border-t border-gray-800">
          <h3 className="text-xs font-bold text-gray-500 mb-8 uppercase tracking-wider">
            Contact Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group flex items-start space-x-4">
              <div className="flex-shrink-0 p-2.5 bg-gray-800/50 rounded-lg group-hover:bg-emerald-600/10 transition-colors">
                <FaEnvelope
                  className="text-emerald-500"
                  size={16}
                  aria-hidden="true"
                />
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                  Email
                </p>
                <a
                  href="mailto:info@sustainbite.com"
                  className="text-sm text-gray-300 hover:text-emerald-400 transition-colors duration-200"
                >
                  info@sustainbite.com
                </a>
              </div>
            </div>

            <div className="group flex items-start space-x-4">
              <div className="flex-shrink-0 p-2.5 bg-gray-800/50 rounded-lg group-hover:bg-emerald-600/10 transition-colors">
                <FaPhone
                  className="text-emerald-500"
                  size={16}
                  aria-hidden="true"
                />
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                  Phone
                </p>
                <a
                  href="tel:+916125567890"
                  className="text-sm text-gray-300 hover:text-emerald-400 transition-colors duration-200"
                >
                  +91 (0612) 567-890
                </a>
              </div>
            </div>

            <div className="group flex items-start space-x-4">
              <div className="flex-shrink-0 p-2.5 bg-gray-800/50 rounded-lg group-hover:bg-emerald-600/10 transition-colors">
                <FaMapMarkerAlt
                  className="text-emerald-500"
                  size={16}
                  aria-hidden="true"
                />
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                  Address
                </p>
                <p className="text-sm text-gray-300">
                  123 Green Street, Eco City,
                  <br />
                  Patna, Bihar 800001
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-500 text-center md:text-left">
              © {new Date().getFullYear()} SustainBite. All rights reserved.
            </p>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center md:justify-end items-center gap-6">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-gray-500 hover:text-emerald-400 transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
