"use client";

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Link from "next/link";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import {
  LuCalendar,
  LuMapPin,
  LuPackage,
  LuPhone,
  LuArrowRight,
} from "react-icons/lu";

const DefaultIcon = L.icon({
  iconUrl: icon.src,
  shadowUrl: iconShadow.src,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
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

const getOffsetPosition = (
  id: string,
  center: [number, number]
): [number, number] => {
  const hash = id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const offsetLat = ((hash % 100) - 50) / 10000;
  const offsetLng = (((hash * 13) % 100) - 50) / 10000;
  return [center[0] + offsetLat, center[1] + offsetLng];
};

const getUrgencyBadge = (bestBefore: string) => {
  const diffDays = Math.ceil(
    (new Date(bestBefore).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24)
  );

  const styles = {
    expired: "bg-red-50 text-red-700 ring-red-600/20",
    urgent: "bg-amber-50 text-amber-700 ring-amber-600/20",
    soon: "bg-blue-50 text-blue-700 ring-blue-600/20",
    fresh: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  };

  let status: "expired" | "urgent" | "soon" | "fresh" = "fresh";
  let label = "Fresh";

  if (diffDays < 0) {
    status = "expired";
    label = "Expired";
  } else if (diffDays <= 2) {
    status = "urgent";
    label = diffDays === 0 ? "Today" : "Urgent";
  } else if (diffDays <= 5) {
    status = "soon";
    label = "Soon";
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-md ring-1 ring-inset ${styles[status]}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
          status === "expired" || status === "urgent" ? "animate-pulse" : ""
        } bg-current`}
      ></span>
      {label}
    </span>
  );
};

const Map: React.FC<MapProps> = ({ foodData }) => {
  const [isMounted, setIsMounted] = useState(false);
  const centerPosition: [number, number] = [25.6027981, 85.1584541]; // Default center

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full h-[400px] sm:h-[500px] md:h-[600px] bg-gray-100 rounded-2xl flex items-center justify-center">
        <span className="text-gray-400 font-medium animate-pulse">
          Loading Map...
        </span>
      </div>
    );
  }

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-gray-900/5 bg-white z-0">
      <div className="w-full h-[400px] sm:h-[500px] md:h-[600px] relative z-0">
        <MapContainer
          center={centerPosition}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
          className="z-0"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {foodData.map((entry) => (
            <Marker
              key={entry._id}
              position={getOffsetPosition(entry._id, centerPosition)}
            >
              <Popup className="custom-popup" maxWidth={300}>
                <div className="p-0.5">
                  {/* Header */}
                  <div className="border-b border-gray-100 pb-3 mb-3">
                    <h4 className="font-bold text-gray-900 text-sm leading-tight pr-4">
                      {entry.description}
                    </h4>
                  </div>

                  {/* Details */}
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="p-1.5 bg-blue-50 text-blue-600 rounded-md shrink-0">
                        <LuPackage size={14} />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                          Quantity
                        </p>
                        <p className="text-sm font-medium text-gray-900">
                          {entry.quantity}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-1.5 bg-emerald-50 text-emerald-600 rounded-md shrink-0">
                        <LuMapPin size={14} />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                          Location
                        </p>
                        <p className="text-sm font-medium text-gray-900 leading-snug">
                          {entry.location}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-1.5 bg-orange-50 text-orange-600 rounded-md shrink-0">
                        <LuCalendar size={14} />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                          Best Before
                        </p>
                        <p className="text-sm font-medium text-gray-900">
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

                    <div className="flex items-start gap-3">
                      <div className="p-1.5 bg-purple-50 text-purple-600 rounded-md shrink-0">
                        <LuPhone size={14} />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                          Contact
                        </p>
                        <p className="text-sm font-medium text-gray-900">
                          {entry.contact}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Footer Stats & Badge */}
                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                    {getUrgencyBadge(entry.bestBeforeDate)}
                  </div>

                  {/* Action Button */}
                  <div className="mt-3">
                    <Link
                      href={`/get-food/${entry._id}`}
                      className="group relative w-full flex items-center justify-center gap-2 bg-gradient-to-br from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      <span className="font-semibold text-xs">Claim Food</span>
                      <LuArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
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
