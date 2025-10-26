"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

interface FoodEntry {
  _id: string;
  description: string;
  quantity: string;
  bestBeforeDate: string;
  location: string;
  contact: string;
  createdAt: string;
  userId: string;
}

const FoodMapPage = () => {
  const [foodData, setFoodData] = useState<FoodEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedView, setSelectedView] = useState<"table" | "map">("table");

  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/Map"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );

  useEffect(() => {
    const fetchFoodData = async () => {
      try {
        const response = await fetch("/api/get-food");
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch food data");
        }
        const data: FoodEntry[] = await response.json();
        setFoodData(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load food data"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchFoodData();
  }, []);

  // Calculate days until expiry
  const getDaysUntilExpiry = (bestBefore: string) => {
    const today = new Date();
    const expiryDate = new Date(bestBefore);
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Get urgency badge
  const getUrgencyBadge = (bestBefore: string) => {
    const days = getDaysUntilExpiry(bestBefore);
    if (days < 0) {
      return (
        <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-md bg-red-50 text-red-800 ring-1 ring-inset ring-red-600/20">
          <span className="w-1.5 h-1.5 bg-red-600 rounded-full mr-1.5 animate-pulse"></span>
          Expired
        </span>
      );
    } else if (days === 0) {
      return (
        <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-md bg-orange-50 text-orange-800 ring-1 ring-inset ring-orange-600/20">
          <span className="w-1.5 h-1.5 bg-orange-600 rounded-full mr-1.5 animate-pulse"></span>
          Today
        </span>
      );
    } else if (days <= 2) {
      return (
        <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-md bg-amber-50 text-amber-800 ring-1 ring-inset ring-amber-600/20">
          <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mr-1.5"></span>
          Urgent
        </span>
      );
    } else if (days <= 5) {
      return (
        <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-md bg-blue-50 text-blue-800 ring-1 ring-inset ring-blue-600/20">
          <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-1.5"></span>
          Soon
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-md bg-emerald-50 text-emerald-800 ring-1 ring-inset ring-emerald-600/20">
          <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mr-1.5"></span>
          Fresh
        </span>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
                Food Inventory & Map
              </h2>
              <p className="text-lg md:text-xl text-emerald-100 max-w-3xl mx-auto leading-relaxed">
                Discover available food donations in your area. Together,
                we&apos;re preventing waste and feeding our community.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center justify-center mb-3">
                  <div className="p-3 bg-white/10 rounded-xl">
                    <svg
                      className="w-8 h-8 text-emerald-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                    </svg>
                  </div>
                </div>
                <div className="text-3xl font-bold text-white">
                  {foodData.length}
                </div>
                <div className="text-emerald-200 mt-1 text-sm font-medium">
                  Available Items
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center justify-center mb-3">
                  <div className="p-3 bg-white/10 rounded-xl">
                    <svg
                      className="w-8 h-8 text-emerald-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <div className="text-3xl font-bold text-white">Real-time</div>
                <div className="text-emerald-200 mt-1 text-sm font-medium">
                  Location Tracking
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center justify-center mb-3">
                  <div className="p-3 bg-white/10 rounded-xl">
                    <svg
                      className="w-8 h-8 text-emerald-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <div className="text-3xl font-bold text-white">24/7</div>
                <div className="text-emerald-200 mt-1 text-sm font-medium">
                  Access Available
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* View Toggle */}
        <div className="flex justify-center mb-10">
          <div className="bg-white rounded-2xl p-1.5 shadow-xl ring-1 ring-gray-900/5 inline-flex">
            <button
              onClick={() => setSelectedView("table")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                selectedView === "table"
                  ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg transform scale-105"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <span className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                Table View
              </span>
            </button>
            <button
              onClick={() => setSelectedView("map")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                selectedView === "map"
                  ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg transform scale-105"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <span className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
                Map View
              </span>
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-8 bg-red-50 border-l-4 border-red-500 rounded-xl p-6 shadow-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="w-6 h-6 text-red-500"
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
              <span className="ml-3 text-red-800 font-medium">{error}</span>
            </div>
          </div>
        )}

        {/* Table View */}
        {selectedView === "table" && (
          <div className="bg-white rounded-2xl shadow-xl ring-1 ring-gray-900/5 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-6">
              <h3 className="text-2xl font-bold text-white flex items-center">
                <div className="mr-3 p-2 bg-white/10 rounded-lg">
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
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    />
                  </svg>
                </div>
                Available Food Donations
              </h3>
              <p className="text-emerald-50 mt-2">
                Browse all available food items ready for pickup
              </p>
            </div>

            <div className="p-6">
              {loading ? (
                <div className="text-center py-16">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
                    <div className="animate-spin rounded-full h-10 w-10 border-3 border-emerald-600 border-t-transparent"></div>
                  </div>
                  <p className="text-gray-600 font-medium">
                    Loading food inventory...
                  </p>
                </div>
              ) : foodData.length === 0 ? (
                <div className="text-center py-20">
                  <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                    <svg
                      className="w-12 h-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    No Donations Yet
                  </h3>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    Be the first to donate and make a difference in your
                    community!
                  </p>
                  <Link
                    href="/donate"
                    className="inline-flex items-center bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-3 rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Donate Food
                  </Link>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50/50">
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                          Food Item
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                          Quantity
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                          Location
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                          Best Before
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                          Contact
                        </th>
                        <th className="px-6 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {foodData.map((entry) => {
                        return (
                          <tr
                            key={entry._id}
                            className="hover:bg-emerald-50/30 transition-all duration-200"
                          >
                            <td className="px-6 py-4">
                              <div className="flex items-start">
                                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center mr-3">
                                  <svg
                                    className="w-5 h-5 text-emerald-600"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </div>
                                <div>
                                  <div className="text-sm font-semibold text-gray-900">
                                    {entry.description}
                                  </div>
                                  <div className="text-xs text-gray-500 mt-1">
                                    Added:{" "}
                                    {new Date(
                                      entry.createdAt
                                    ).toLocaleDateString("en-US", {
                                      month: "short",
                                      day: "numeric",
                                      year: "numeric",
                                    })}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                {entry.quantity}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center text-sm">
                                <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-2">
                                  <svg
                                    className="w-4 h-4 text-gray-500"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </div>
                                <span
                                  className="text-gray-700 font-medium truncate max-w-xs"
                                  title={entry.location}
                                >
                                  {entry.location}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div>
                                <div className="text-sm font-semibold text-gray-900">
                                  {new Date(
                                    entry.bestBeforeDate
                                  ).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  })}
                                </div>
                                <div className="text-xs text-gray-500 mt-0.5">
                                  {getDaysUntilExpiry(entry.bestBeforeDate) >= 0
                                    ? `${getDaysUntilExpiry(
                                        entry.bestBeforeDate
                                      )} days left`
                                    : "Expired"}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              {getUrgencyBadge(entry.bestBeforeDate)}
                            </td>
                            <td className="px-6 py-4">
                              <a
                                href={`tel:${entry.contact}`}
                                className="inline-flex items-center text-sm text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
                              >
                                <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center mr-2">
                                  <svg
                                    className="w-4 h-4"
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
                                {entry.contact}
                              </a>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <Link
                                href={`/get-food/${entry._id}`}
                                className="inline-flex items-center bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-5 py-2 rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 font-semibold text-sm shadow-md hover:shadow-lg transform hover:scale-105"
                              >
                                <svg
                                  className="w-4 h-4 mr-1.5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                  />
                                </svg>
                                Get
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Map View */}
        {selectedView === "map" && (
          <div className="bg-white rounded-2xl shadow-xl ring-1 ring-gray-900/5 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-6">
              <h3 className="text-2xl font-bold text-white flex items-center">
                <div className="mr-3 p-2 bg-white/10 rounded-lg">
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
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    />
                  </svg>
                </div>
                Food Donation Map
              </h3>
              <p className="text-emerald-50 mt-2">
                Interactive map showing all food donation locations
              </p>
            </div>

            <div className="p-4 sm:p-6">
              {loading ? (
                <div className="h-96 flex items-center justify-center bg-gray-50 rounded-xl">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
                      <div className="animate-spin rounded-full h-10 w-10 border-3 border-emerald-600 border-t-transparent"></div>
                    </div>
                    <p className="text-gray-600 font-medium">Loading map...</p>
                  </div>
                </div>
              ) : (
                <Map foodData={foodData} />
              )}

              {/* Map Legend */}
              {!loading && foodData.length > 0 && (
                <div className="mt-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-200">
                  <h4 className="font-bold text-gray-800 mb-4 flex items-center">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mr-2 shadow-sm">
                      <svg
                        className="w-5 h-5 text-emerald-600"
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
                    Status Legend
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                    <div className="flex items-center bg-white rounded-lg p-2">
                      <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-md bg-emerald-50 text-emerald-800 ring-1 ring-inset ring-emerald-600/20">
                        <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mr-1.5"></span>
                        Fresh
                      </span>
                      <span className="text-xs text-gray-600 ml-2">
                        5+ days
                      </span>
                    </div>
                    <div className="flex items-center bg-white rounded-lg p-2">
                      <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-md bg-blue-50 text-blue-800 ring-1 ring-inset ring-blue-600/20">
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-1.5"></span>
                        Soon
                      </span>
                      <span className="text-xs text-gray-600 ml-2">
                        3-5 days
                      </span>
                    </div>
                    <div className="flex items-center bg-white rounded-lg p-2">
                      <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-md bg-amber-50 text-amber-800 ring-1 ring-inset ring-amber-600/20">
                        <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mr-1.5"></span>
                        Urgent
                      </span>
                      <span className="text-xs text-gray-600 ml-2">
                        1-2 days
                      </span>
                    </div>
                    <div className="flex items-center bg-white rounded-lg p-2">
                      <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-md bg-orange-50 text-orange-800 ring-1 ring-inset ring-orange-600/20">
                        <span className="w-1.5 h-1.5 bg-orange-600 rounded-full mr-1.5 animate-pulse"></span>
                        Today
                      </span>
                      <span className="text-xs text-gray-600 ml-2">
                        Last day
                      </span>
                    </div>
                    <div className="flex items-center bg-white rounded-lg p-2">
                      <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-md bg-red-50 text-red-800 ring-1 ring-inset ring-red-600/20">
                        <span className="w-1.5 h-1.5 bg-red-600 rounded-full mr-1.5 animate-pulse"></span>
                        Expired
                      </span>
                      <span className="text-xs text-gray-600 ml-2">
                        Past date
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Call to Action */}
        {!loading && foodData.length > 0 && (
          <div className="mt-12 relative overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 rounded-2xl shadow-2xl p-10 text-center text-white">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative">
              <h3 className="text-3xl md:text-4xl font-black mb-4">
                Want to Make a Difference?
              </h3>
              <p className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                Join our community of donors and help reduce food waste while
                feeding those in need.
              </p>
              <Link
                href="/donate"
                className="inline-flex items-center bg-white text-emerald-600 px-8 py-4 rounded-xl hover:bg-emerald-50 transition-all duration-300 font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105"
              >
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
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Donate Food Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodMapPage;
