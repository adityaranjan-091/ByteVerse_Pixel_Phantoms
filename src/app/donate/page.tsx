"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// Types
interface FormData {
  description: string;
  quantity: number | "";
  bestBeforeDate: string;
  location: string;
  contact: string;
}

interface FormErrors {
  [key: string]: string;
}

// Initial form state
const INITIAL_FORM_STATE: FormData = {
  description: "",
  quantity: "",
  bestBeforeDate: "",
  location: "",
  contact: "",
};

const DonateFoodPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // State management
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState<FormErrors>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Authentication redirect
  useEffect(() => {
    if (status === "unauthenticated" || !session) {
      router.push("/login");
    }
  }, [status, router, session]);

  // Form validation
  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.description.trim()) {
      newErrors.description = "Food description is required";
    } else if (formData.description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }

    if (formData.quantity === "") {
      newErrors.quantity = "Quantity is required";
    } else if (
      isNaN(Number(formData.quantity)) ||
      Number(formData.quantity) <= 0
    ) {
      newErrors.quantity = "Please enter a valid quantity";
    }

    if (!formData.bestBeforeDate) {
      newErrors.bestBeforeDate = "Best before date is required";
    } else {
      const selectedDate = new Date(formData.bestBeforeDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        newErrors.bestBeforeDate = "Date cannot be in the past";
      }
    }

    if (!formData.location.trim()) {
      newErrors.location = "Pickup location is required";
    } else if (formData.location.trim().length < 5) {
      newErrors.location = "Please provide a complete address";
    }

    if (!formData.contact.trim()) {
      newErrors.contact = "Contact information is required";
    } else if (!/^[+]?[\d\s-()]+$/.test(formData.contact)) {
      newErrors.contact = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "quantity") {
      setFormData((prev) => ({
        ...prev,
        [name]: value === "" ? "" : Number(value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    setApiError(null);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setApiError(null);

    const payload = {
      ...formData,
      description: formData.description.trim(),
      location: formData.location.trim(),
      contact: formData.contact.trim(),
    };

    try {
      const response = await fetch("/api/save-food", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to save food donation");
      }

      setFormData(INITIAL_FORM_STATE);
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    } catch (err) {
      console.error("Donation submission error:", err);
      setApiError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Get minimum date (today)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  // Loading state
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center">
          <div className="relative">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full">
              <div className="animate-spin rounded-full h-14 w-14 border-3 border-emerald-600 border-t-transparent"></div>
            </div>
          </div>
          <p className="mt-4 text-gray-700 text-lg font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
                Make a Difference Today
              </h2>
              <p className="text-lg md:text-xl text-emerald-100 max-w-3xl mx-auto leading-relaxed">
                Your surplus food can bring joy to someone in need. Join our
                mission to reduce food waste and fight hunger in our community.
              </p>
              <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
                  <div className="text-4xl font-bold text-white">1M+</div>
                  <div className="text-emerald-200 mt-2 text-sm font-medium">
                    Meals Donated
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
                  <div className="text-4xl font-bold text-white">50K+</div>
                  <div className="text-emerald-200 mt-2 text-sm font-medium">
                    Active Donors
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
                  <div className="text-4xl font-bold text-white">100+</div>
                  <div className="text-emerald-200 mt-2 text-sm font-medium">
                    Cities Covered
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-emerald-500 rounded-xl shadow-xl p-6 animate-slide-down">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                  <svg
                    className="h-6 w-6 text-emerald-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-4 flex-1">
                <h3 className="text-lg font-bold text-emerald-900">
                  Donation Successful! 🎉
                </h3>
                <p className="mt-2 text-emerald-700">
                  Thank you for your generous contribution! Your donation will
                  help feed those in need. We&apos;ll contact you shortly for
                  pickup arrangements.
                </p>
              </div>
              <button
                onClick={() => setShowSuccess(false)}
                className="flex-shrink-0 ml-4 text-emerald-500 hover:text-emerald-700 transition-colors"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            {/* How It Works Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center">
                <span className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mr-3">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </span>
                How It Works
              </h3>
              <div className="space-y-4">
                {[
                  {
                    num: "1",
                    title: "Fill the Form",
                    desc: "Provide details about the food you want to donate",
                  },
                  {
                    num: "2",
                    title: "We Verify",
                    desc: "Our team reviews and confirms your donation",
                  },
                  {
                    num: "3",
                    title: "Quick Pickup",
                    desc: "We arrange pickup at your convenience",
                  },
                  {
                    num: "4",
                    title: "Delivered",
                    desc: "Food reaches those who need it most",
                  },
                ].map((step) => (
                  <div key={step.num} className="flex items-start group">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-emerald-100 to-teal-100 text-emerald-700 rounded-lg flex items-center justify-center font-bold mr-3 group-hover:scale-110 transition-transform">
                      {step.num}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{step.title}</h4>
                      <p className="text-sm text-gray-600 mt-0.5">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Guidelines Card */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-lg p-8 border border-orange-100">
              <h3 className="text-xl font-black text-gray-900 mb-5 flex items-center">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                  <svg
                    className="w-5 h-5 text-orange-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                Donation Guidelines
              </h3>
              <ul className="space-y-3 text-sm">
                {[
                  "Food should be fresh and safe to consume",
                  "Properly packaged and sealed items",
                  "Clearly mention expiry/best before date",
                  "Be available for scheduled pickup",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Impact Card */}
            <div className="relative bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl shadow-2xl p-8 text-white overflow-hidden">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
              <h3 className="text-xl font-black mb-3 relative">
                Your Impact Matters
              </h3>
              <p className="text-emerald-100 text-sm leading-relaxed relative">
                Every meal donated helps reduce food waste and feeds someone in
                need. Together, we&apos;re building a hunger-free community.
              </p>
              <div className="mt-6 pt-6 border-t border-white/20 relative">
                <div className="text-3xl font-bold">~500g</div>
                <div className="text-emerald-200 text-sm mt-1">
                  Average CO₂ saved per meal
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Donation Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden ring-1 ring-gray-900/5">
              {/* Form Header */}
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-8">
                <h2 className="text-3xl font-black text-white flex items-center">
                  <div className="w-10 h-10 bg-white/10 backdrop-blur rounded-xl flex items-center justify-center mr-3">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                      />
                    </svg>
                  </div>
                  Donation Form
                </h2>
                <p className="text-emerald-100 mt-2">
                  Fill in the details below to donate your surplus food
                </p>
              </div>

              {/* API Error Message */}
              {apiError && (
                <div className="mx-8 mt-6">
                  <div
                    className="bg-red-50 border-l-4 border-red-500 rounded-xl p-5"
                    role="alert"
                  >
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <svg
                          className="w-6 h-6 text-red-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="ml-3 text-red-800 font-semibold">
                        {apiError}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="p-8 lg:p-10 space-y-6"
                noValidate
              >
                {/* Food Description */}
                <div className="group">
                  <label
                    htmlFor="description"
                    className="flex items-center text-sm font-bold text-gray-800 mb-2"
                  >
                    <div className="w-6 h-6 bg-emerald-100 rounded flex items-center justify-center mr-2">
                      <svg
                        className="w-4 h-4 text-emerald-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                    </div>
                    Food Description
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className={`w-full px-4 py-3.5 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                      errors.description
                        ? "border-red-300 focus:border-red-500 focus:ring-red-200 bg-red-50"
                        : "border-gray-200 focus:border-emerald-500 focus:ring-emerald-200 hover:border-gray-300"
                    }`}
                    placeholder="Describe your food donation in detail (e.g., Freshly cooked vegetarian biryani, packaged snacks, fresh fruits...)"
                    aria-describedby={
                      errors.description ? "description-error" : undefined
                    }
                    aria-invalid={errors.description ? "true" : "false"}
                  />
                  {errors.description && (
                    <p
                      className="mt-2 text-sm text-red-600 flex items-center"
                      id="description-error"
                      role="alert"
                    >
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {errors.description}
                    </p>
                  )}
                </div>

                {/* Quantity and Date Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Quantity */}
                  <div>
                    <label
                      htmlFor="quantity"
                      className="flex items-center text-sm font-bold text-gray-800 mb-2"
                    >
                      <div className="w-6 h-6 bg-emerald-100 rounded flex items-center justify-center mr-2">
                        <svg
                          className="w-4 h-4 text-emerald-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                          />
                        </svg>
                      </div>
                      Quantity
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      className={`w-full px-4 py-3.5 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                        errors.quantity
                          ? "border-red-300 focus:border-red-500 focus:ring-red-200 bg-red-50"
                          : "border-gray-200 focus:border-emerald-500 focus:ring-emerald-200 hover:border-gray-300"
                      }`}
                      placeholder="e.g., 10"
                      aria-describedby={
                        errors.quantity ? "quantity-error" : undefined
                      }
                      aria-invalid={errors.quantity ? "true" : "false"}
                    />
                    {errors.quantity && (
                      <p
                        className="mt-2 text-sm text-red-600 flex items-center"
                        id="quantity-error"
                        role="alert"
                      >
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {errors.quantity}
                      </p>
                    )}
                  </div>

                  {/* Best Before Date */}
                  <div>
                    <label
                      htmlFor="bestBeforeDate"
                      className="flex items-center text-sm font-bold text-gray-800 mb-2"
                    >
                      <div className="w-6 h-6 bg-emerald-100 rounded flex items-center justify-center mr-2">
                        <svg
                          className="w-4 h-4 text-emerald-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      Best Before Date
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="date"
                      id="bestBeforeDate"
                      name="bestBeforeDate"
                      value={formData.bestBeforeDate}
                      onChange={handleChange}
                      min={getMinDate()}
                      className={`w-full px-4 py-3.5 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                        errors.bestBeforeDate
                          ? "border-red-300 focus:border-red-500 focus:ring-red-200 bg-red-50"
                          : "border-gray-200 focus:border-emerald-500 focus:ring-emerald-200 hover:border-gray-300"
                      }`}
                      aria-describedby={
                        errors.bestBeforeDate ? "date-error" : undefined
                      }
                      aria-invalid={errors.bestBeforeDate ? "true" : "false"}
                    />
                    {errors.bestBeforeDate && (
                      <p
                        className="mt-2 text-sm text-red-600 flex items-center"
                        id="date-error"
                        role="alert"
                      >
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {errors.bestBeforeDate}
                      </p>
                    )}
                  </div>
                </div>

                {/* Pickup Location */}
                <div>
                  <label
                    htmlFor="location"
                    className="flex items-center text-sm font-bold text-gray-800 mb-2"
                  >
                    <div className="w-6 h-6 bg-emerald-100 rounded flex items-center justify-center mr-2">
                      <svg
                        className="w-4 h-4 text-emerald-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    Pickup Location
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className={`w-full px-4 py-3.5 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                      errors.location
                        ? "border-red-300 focus:border-red-500 focus:ring-red-200 bg-red-50"
                        : "border-gray-200 focus:border-emerald-500 focus:ring-emerald-200 hover:border-gray-300"
                    }`}
                    placeholder="Full address: Street, Apartment/Building, City, State, ZIP"
                    aria-describedby={
                      errors.location ? "location-error" : undefined
                    }
                    aria-invalid={errors.location ? "true" : "false"}
                  />
                  {errors.location && (
                    <p
                      className="mt-2 text-sm text-red-600 flex items-center"
                      id="location-error"
                      role="alert"
                    >
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {errors.location}
                    </p>
                  )}
                </div>

                {/* Contact Number */}
                <div>
                  <label
                    htmlFor="contact"
                    className="flex items-center text-sm font-bold text-gray-800 mb-2"
                  >
                    <div className="w-6 h-6 bg-emerald-100 rounded flex items-center justify-center mr-2">
                      <svg
                        className="w-4 h-4 text-emerald-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    Contact Number
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="tel"
                    id="contact"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    className={`w-full px-4 py-3.5 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                      errors.contact
                        ? "border-red-300 focus:border-red-500 focus:ring-red-200 bg-red-50"
                        : "border-gray-200 focus:border-emerald-500 focus:ring-emerald-200 hover:border-gray-300"
                    }`}
                    placeholder="+91-123-456-7890"
                    aria-describedby={
                      errors.contact ? "contact-error" : undefined
                    }
                    aria-invalid={errors.contact ? "true" : "false"}
                  />
                  {errors.contact && (
                    <p
                      className="mt-2 text-sm text-red-600 flex items-center"
                      id="contact-error"
                      role="alert"
                    >
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {errors.contact}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform transition-all duration-200 flex items-center justify-center ${
                      loading
                        ? "opacity-60 cursor-not-allowed"
                        : "hover:scale-[1.02] active:scale-[0.98]"
                    }`}
                    aria-busy={loading}
                  >
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-6 w-6 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
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
                        Submitting Your Donation...
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-6 h-6 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                        Submit Donation
                      </>
                    )}
                  </button>
                  <p className="text-center text-sm text-gray-500 mt-4">
                    <span className="text-red-500">*</span> All fields are
                    required
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="bg-white border-t border-gray-200 mt-16 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-600">
              Questions? Contact us at{" "}
              <a
                href="mailto:support@foodrescue.com"
                className="text-emerald-600 hover:text-emerald-700 font-semibold"
              >
                support@sustainbite.com
              </a>
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Together, we can make a difference in fighting hunger and reducing
              food waste
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonateFoodPage;
