"use client";

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface FoodEntry {
  _id: string;
  description: string;
  quantity: string;
  location: string;
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

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this food entry?")) return;

    try {
      const response = await fetch("/api/delete-food", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete food entry");
      }

      setFoodData((prev) => prev.filter((entry) => entry._id !== id));
      alert("Food entry deleted successfully!");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete food entry"
      );
    }
  };

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
                <p>Loading...</p>
              ) : session ? (
                <div className="flex items-center gap-4">
                  <span className="text-gray-700 font-medium">
                    Hello, {session.user?.name}
                  </span>
                  <button
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
                  >
                    Logout
                  </button>
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

          {/* Table Section (Now comes first) */}
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
                      <th className="p-4 text-left">Actions</th>
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
                        <td className="p-4">
                          {session?.user?.id === entry.userId && (
                            <button
                              onClick={() => handleDelete(entry._id)}
                              className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                            >
                              Delete
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Map Section (Moved down) */}
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
              <Marker position={randomPosition}>
                <Popup>Sample Food Donation Location</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FoodMapPage;
