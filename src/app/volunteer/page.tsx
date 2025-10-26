"use client";
import React, { useState } from "react";
import {
  FaHeart,
  FaTruck,
  FaUsers,
  FaHandHoldingHeart,
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaClock,
  FaMapMarkerAlt,
} from "react-icons/fa";

interface FormData {
  name: string;
  email: string;
  phone: string;
  location: string;
  availability: string;
  interests: string[];
  experience: string;
  message: string;
}

interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface Role {
  title: string;
  description: string;
  commitment: string;
}

const VolunteerPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    location: "",
    availability: "",
    interests: [],
    experience: "",
    message: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const volunteerBenefits: Benefit[] = [
    {
      icon: (
        <FaHeart className="text-3xl text-emerald-600" aria-hidden="true" />
      ),
      title: "Make a Real Impact",
      description: "Help reduce food waste and fight hunger in your community",
    },
    {
      icon: (
        <FaUsers className="text-3xl text-emerald-600" aria-hidden="true" />
      ),
      title: "Join a Community",
      description:
        "Connect with like-minded people passionate about sustainability",
    },
    {
      icon: (
        <FaTruck className="text-3xl text-emerald-600" aria-hidden="true" />
      ),
      title: "Flexible Opportunities",
      description: "Choose roles that fit your schedule and interests",
    },
    {
      icon: (
        <FaHandHoldingHeart
          className="text-3xl text-emerald-600"
          aria-hidden="true"
        />
      ),
      title: "Gain Experience",
      description:
        "Develop valuable skills in logistics, community service, and more",
    },
  ];

  const volunteerRoles: Role[] = [
    {
      title: "Food Collection Volunteer",
      description:
        "Pick up surplus food from restaurants, hotels, and events across your city",
      commitment: "4-8 hours/week",
    },
    {
      title: "Distribution Coordinator",
      description:
        "Help distribute rescued food to NGOs, shelters, and communities in need",
      commitment: "6-10 hours/week",
    },
    {
      title: "Community Outreach",
      description:
        "Spread awareness about food waste reduction in your neighborhood",
      commitment: "Flexible",
    },
    {
      title: "Event Support",
      description:
        "Assist in organizing food rescue drives and awareness campaigns",
      commitment: "Event-based",
    },
  ];

  const volunteerInterests = [
    "Food Collection",
    "Food Distribution",
    "Community Outreach",
    "Event Management",
    "Social Media & Marketing",
    "Photography & Documentation",
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
    setSuccess(false);
  };

  const handleInterestChange = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    // Client-side validation
    if (formData.phone.length < 10) {
      setError("Please enter a valid 10-digit mobile number");
      setLoading(false);
      return;
    }

    if (formData.interests.length === 0) {
      setError("Please select at least one area of interest");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/save-volunteer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to submit application");
      }

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        location: "",
        availability: "",
        interests: [],
        experience: "",
        message: "",
      });

      // Scroll to success message
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Submission error:", err);
        setError(err.message || "Something went wrong. Please try again.");
      } else {
        console.error("Unexpected error:", err);
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 py-24 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
            Become a Food Rescue Hero
          </h1>
          <p className="text-lg md:text-xl text-emerald-100 max-w-3xl mx-auto leading-relaxed mb-10">
            Join thousands of volunteers across India who are rescuing surplus
            food and feeding communities in need. Every meal saved is a step
            towards a hunger-free, sustainable future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 px-8 py-5 rounded-2xl hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
              <div className="text-4xl font-bold text-white">5,000+</div>
              <div className="text-sm text-emerald-200 font-medium mt-1">
                Active Volunteers
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 px-8 py-5 rounded-2xl hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
              <div className="text-4xl font-bold text-white">50+ Cities</div>
              <div className="text-sm text-emerald-200 font-medium mt-1">
                Across India
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 px-8 py-5 rounded-2xl hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
              <div className="text-4xl font-bold text-white">10L+ Meals</div>
              <div className="text-sm text-emerald-200 font-medium mt-1">
                Rescued
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Why Volunteer with SustainBite?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Be part of India&apos;s growing food rescue movement
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {volunteerBenefits.map((benefit, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer Roles Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Volunteer Opportunities
            </h2>
            <p className="text-lg text-gray-600">
              Find the perfect role that matches your interests and schedule
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {volunteerRoles.map((role, index) => (
              <div
                key={index}
                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-emerald-500 to-teal-500 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                  <span className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 text-white rounded-lg flex items-center justify-center text-sm font-bold mr-3">
                    {index + 1}
                  </span>
                  {role.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed pl-11">
                  {role.description}
                </p>
                <div className="flex items-center text-sm pl-11">
                  <div className="flex items-center bg-emerald-50 px-3 py-1.5 rounded-lg">
                    <FaClock
                      className="mr-2 text-emerald-600"
                      aria-hidden="true"
                    />
                    <span className="font-semibold text-emerald-700">
                      Time:
                    </span>
                    <span className="ml-2 text-emerald-600">
                      {role.commitment}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Join Us Today
            </h2>
            <p className="text-lg text-gray-600">
              Fill out the form below and we&apos;ll get in touch with you soon
            </p>
          </div>

          {success && (
            <div
              className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-emerald-500 p-6 rounded-xl mb-8 shadow-md"
              role="alert"
              aria-live="polite"
            >
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-emerald-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-bold text-emerald-900 mb-1">
                    Thank you for volunteering with SustainBite!
                  </h3>
                  <p className="text-emerald-700">
                    We&apos;ve received your application and will contact you
                    within 2-3 business days.
                  </p>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div
              className="bg-red-50 border-l-4 border-red-500 p-6 rounded-xl mb-8 shadow-md"
              role="alert"
              aria-live="polite"
            >
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-red-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="ml-3 text-red-800 font-medium">{error}</span>
              </div>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="bg-white p-10 rounded-2xl shadow-2xl border border-gray-100 space-y-8"
          >
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-bold text-gray-800 mb-2"
              >
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaUserCircle
                    className="text-gray-400 text-lg"
                    aria-hidden="true"
                  />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  disabled={loading}
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-required="true"
                />
              </div>
            </div>

            {/* Email and Phone in Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-bold text-gray-800 mb-2"
                >
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    disabled={loading}
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-required="true"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-bold text-gray-800 mb-2"
                >
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaPhone className="text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="9876543210"
                    required
                    pattern="[0-9]{10}"
                    disabled={loading}
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-required="true"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1.5 pl-1">
                  10-digit mobile number without +91
                </p>
              </div>
            </div>

            {/* Location and Availability */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-bold text-gray-800 mb-2"
                >
                  City <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaMapMarkerAlt
                      className="text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Enter your city"
                    required
                    disabled={loading}
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-required="true"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="availability"
                  className="block text-sm font-bold text-gray-800 mb-2"
                >
                  Availability <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaClock className="text-gray-400" aria-hidden="true" />
                  </div>
                  <select
                    id="availability"
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed appearance-none"
                    aria-required="true"
                  >
                    <option value="">Select your availability</option>
                    <option value="weekends">Weekends Only</option>
                    <option value="weekdays">Weekdays</option>
                    <option value="evenings">Evenings (After 6 PM)</option>
                    <option value="mornings">Mornings (Before 12 PM)</option>
                    <option value="flexible">Flexible / Anytime</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Areas of Interest */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-3">
                Areas of Interest <span className="text-red-500">*</span>
                <span className="text-xs font-normal text-gray-500 ml-2">
                  (Select all that apply)
                </span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {volunteerInterests.map((interest) => (
                  <label
                    key={interest}
                    className="group relative flex items-center p-4 bg-gray-50 border-2 border-gray-200 rounded-xl cursor-pointer hover:bg-emerald-50 hover:border-emerald-300 transition-all has-[:checked]:bg-gradient-to-r has-[:checked]:from-emerald-50 has-[:checked]:to-teal-50 has-[:checked]:border-emerald-500"
                  >
                    <input
                      type="checkbox"
                      checked={formData.interests.includes(interest)}
                      onChange={() => handleInterestChange(interest)}
                      disabled={loading}
                      className="w-5 h-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500 disabled:cursor-not-allowed"
                    />
                    <span className="ml-3 text-sm font-medium text-gray-700 group-hover:text-gray-900">
                      {interest}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div>
              <label
                htmlFor="experience"
                className="block text-sm font-bold text-gray-800 mb-2"
              >
                Previous Volunteering Experience
                <span className="text-xs font-normal text-gray-500 ml-2">
                  (Optional)
                </span>
              </label>
              <select
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                disabled={loading}
                className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed appearance-none"
              >
                <option value="">Select your experience level</option>
                <option value="none">No previous experience</option>
                <option value="some">Some volunteering experience</option>
                <option value="extensive">
                  Extensive volunteering experience
                </option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-bold text-gray-800 mb-2"
              >
                Why do you want to volunteer with SustainBite?
                <span className="text-xs font-normal text-gray-500 ml-2">
                  (Optional)
                </span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder="Share your motivation and what you hope to contribute..."
                disabled={loading}
                className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Submitting Application...
                  </span>
                ) : (
                  "Submit Application"
                )}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 py-20 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-6">
            Have Questions?
          </h2>
          <p className="text-lg text-emerald-100 mb-10 max-w-2xl mx-auto">
            We&apos;re here to help! Reach out to our volunteer coordination
            team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:volunteer@sustainbite.com"
              className="bg-white text-emerald-700 px-8 py-4 rounded-xl font-bold hover:bg-emerald-50 transition-all duration-300 inline-flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <FaEnvelope className="mr-2" aria-hidden="true" />
              Email Us
            </a>
            <a
              href="tel:+916125567890"
              className="bg-emerald-800/50 backdrop-blur text-white px-8 py-4 rounded-xl font-bold hover:bg-emerald-800/70 transition-all duration-300 inline-flex items-center justify-center border border-white/20 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <FaPhone className="mr-2" aria-hidden="true" />
              Call Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VolunteerPage;
