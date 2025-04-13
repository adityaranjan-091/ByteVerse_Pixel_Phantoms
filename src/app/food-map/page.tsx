"use client";

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS
import { useSession } from "next-auth/react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import L from "leaflet"; // Import Leaflet for custom fixes (e.g., icon issue)

// Fix default Leaflet icon issue (required for Next.js)
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

const FoodMapPage = () => {
  const { data: session, status } = useSession();
  const [foodData, setFoodData] = useState<FoodEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

<<<<<<< HEAD
=======


>>>>>>> 242bd2e33830832eef95959a4091efd95ca86ae2
  const randomPosition: [number, number] = [25.6027981, 85.1584541];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-3xl md:text-4xl font-extrabold text-green-900">
              Leftover Food Map & Inventory
            </h1>
            <div>
              {status === "loading" ? (
                <div className="min-h-screen bg-gradient-to-r from-green-50 to-green-100">
                  <p className="text-lg font-semibold text-green-700 animate-pulse">
                    Loading...
                  </p>
                </div>
              ) : session ? (
                <div className="flex items-center gap-4">
                  <span className="text-gray-700 font-medium text-xl">
                    Hello, {session.user?.name || "User"}
                  </span>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300"
                >
                  Login
                </Link>
              )}
            </div>
          </div>

          {/* Table Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-green-700 mb-4">
              Available Leftover Food
            </h2>
            {error && (
              <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6 text-center">
                {error}
              </div>
            )}
            {loading ? (
              <p className="text-gray-600">Loading...</p>
            ) : foodData.length === 0 ? (
              <p className="text-gray-600">No food donations yet.</p>
            ) : (
              <div className="overflow-x-auto rounded-lg shadow-lg">
                <table className="w-full bg-white rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-green-100 text-green-800">
                      <th className="p-4 text-left">Description</th>
                      <th className="p-4 text-left">Quantity</th>
                      <th className="p-4 text-left">Location</th>
                      <th className="p-4 text-left">Date Added</th>
                      <th className="p-4 text-left">Best Before</th>
                      <th className="p-4 text-left">Contact</th>
                    </tr>
                  </thead>
                  <tbody>
                    {foodData.map((entry) => (
                      <tr
                        key={entry._id}
                        className="border-t hover:bg-gray-50 transition"
                      >
                        <td className="p-4">{entry.description}</td>
                        <td className="p-4">{entry.quantity}</td>
                        <td className="p-4">{entry.location}</td>

                        <td className="p-4">
                          {new Date(entry.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-4">{entry.bestBeforeDate}</td>
                        <td className="p-4">{entry.contact}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Map Section */}
          <div>
            <h2 className="text-2xl font-semibold text-green-700 mb-4">
              Food Donation Map
            </h2>
            <MapContainer
              center={randomPosition}
              zoom={13}
              style={{ height: "400px", width: "100%" }}
              className="rounded-lg shadow-lg"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {foodData.length > 0 &&
                foodData.map((entry) => (
                  <Marker key={entry._id} position={randomPosition}>
                    <Popup>
                      <div>
                        <strong>{entry.description}</strong>
                        <br />
                        Quantity: {entry.quantity}
                        <br />
                        Location: {entry.location}
                        <br />
                        Added: {new Date(entry.createdAt).toLocaleDateString()}
                        <br />
<<<<<<< HEAD
=======
                        
>>>>>>> 242bd2e33830832eef95959a4091efd95ca86ae2
                      </div>
                    </Popup>
                  </Marker>
                ))}
            </MapContainer>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FoodMapPage;
