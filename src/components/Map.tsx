"use client";

import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Link from "next/link";

// Fix default Leaflet icon issue
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
const DefaultIcon = L.icon({
  iconUrl: icon.src,
  shadowUrl: iconShadow.src,
});
L.Marker.prototype.options.icon = DefaultIcon;

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

interface MapProps {
  foodData: FoodEntry[];
}

// Get urgency badge
const getUrgencyBadge = (bestBefore: string) => {
  const today = new Date();
  const expiryDate = new Date(bestBefore);
  const diffTime = expiryDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return (
      <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-md bg-red-50 text-red-800 ring-1 ring-inset ring-red-600/20">
        <span className="w-1.5 h-1.5 bg-red-600 rounded-full mr-1.5 animate-pulse"></span>
        Expired
      </span>
    );
  } else if (diffDays === 0) {
    return (
      <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-md bg-orange-50 text-orange-800 ring-1 ring-inset ring-orange-600/20">
        <span className="w-1.5 h-1.5 bg-orange-600 rounded-full mr-1.5 animate-pulse"></span>
        Today
      </span>
    );
  } else if (diffDays <= 2) {
    return (
      <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-md bg-amber-50 text-amber-800 ring-1 ring-inset ring-amber-600/20">
        <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mr-1.5"></span>
        Urgent
      </span>
    );
  } else if (diffDays <= 5) {
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

const Map: React.FC<MapProps> = ({ foodData }) => {
  const randomPosition: [number, number] = [25.6027981, 85.1584541];

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-gray-900/5 bg-white">
     

      {/* Map Container */}
      <div className="w-full h-[400px] sm:h-[500px] md:h-[600px] relative">
        <MapContainer
          center={randomPosition}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
          className="z-0"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {foodData.map((entry) => (
            <Marker key={entry._id} position={randomPosition}>
              <Popup className="custom-popup" maxWidth={320}>
                <div className="p-1">
                  {/* Popup Content Container */}
                  <div className="bg-white rounded-lg">
                    {/* Header */}
                    <div className="border-b border-gray-100 pb-3 mb-3">
                      <h4 className="font-semibold text-gray-900 text-base leading-tight">
                        {entry.description}
                      </h4>
                    </div>

                    {/* Content */}
                    <div className="space-y-2.5">
                      {/* Quantity */}
                      <div className="flex items-center text-sm">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                          <svg
                            className="w-4 h-4 text-blue-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                            Quantity
                          </p>
                          <p className="text-gray-900 font-medium">
                            {entry.quantity}
                          </p>
                        </div>
                      </div>

                      {/* Location */}
                      <div className="flex items-start text-sm">
                        <div className="flex-shrink-0 w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center mr-3">
                          <svg
                            className="w-4 h-4 text-emerald-600"
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
                        <div className="flex-1">
                          <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                            Location
                          </p>
                          <p className="text-gray-900 font-medium leading-snug">
                            {entry.location}
                          </p>
                        </div>
                      </div>

                      {/* Best Before */}
                      <div className="flex items-center text-sm">
                        <div className="flex-shrink-0 w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center mr-3">
                          <svg
                            className="w-4 h-4 text-orange-600"
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
                        <div>
                          <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                            Best Before
                          </p>
                          <p className="text-gray-900 font-medium">
                            {new Date(entry.bestBeforeDate).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </p>
                        </div>
                      </div>

                      {/* Contact */}
                      <div className="flex items-center text-sm">
                        <div className="flex-shrink-0 w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center mr-3">
                          <svg
                            className="w-4 h-4 text-purple-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                            Contact
                          </p>
                          <p className="text-gray-900 font-medium">
                            {entry.contact}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Urgency Badge */}
                    <div className="flex items-center justify-center py-3 mt-3 border-t border-gray-100">
                      {getUrgencyBadge(entry.bestBeforeDate)}
                    </div>

                    {/* Action Button */}
                    <div className="pt-3">
                      <Link
                        href={`/get-food/${entry._id}`}
                        className="group relative w-full flex items-center justify-center bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-2.5 rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 font-semibold text-sm shadow-md hover:shadow-lg transform hover:scale-[1.02]"
                      >
                        <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-200"></span>
                        <span className="relative">Get This Food</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

    </div>
  );
};

export default Map;
