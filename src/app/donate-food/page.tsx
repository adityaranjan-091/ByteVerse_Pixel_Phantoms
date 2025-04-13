"use client";

import React, { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const DonateFoodPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  console.log("Client Session:", session);

  const [formData, setFormData] = useState({
    description: "",
    quantity: "",
    location: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "authenticated") return;
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      description: formData.description,
      quantity: formData.quantity,
      location: formData.location,
      userId: session?.user?.id,
    };

    try {
      const response = await fetch("/api/save-food", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || "Failed to save food data");
      }

      setFormData({ description: "", quantity: "", location: "" });
      alert("Thank you for donating leftover food!");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-r from-green-50 to-green-100 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-green-800">
              Donate Leftover Food
            </h1>
            <div>
              {session ? (
                <div className="flex items-center gap-4">
                  <span className="text-gray-700">
                    Hello, {session.user?.name}
                  </span>
                  <button
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
          <section className="py-12">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl md:text-3xl font-semibold text-green-700 mb-6 text-center">
                Food Donation Form
              </h2>
              {error && (
                <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6 text-center">
                  {error}
                </div>
              )}
              <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg shadow-md space-y-6"
              >
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Food Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="e.g., Cooked rice and vegetables"
                  />
                </div>
                <div>
                  <label
                    htmlFor="quantity"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Quantity (e.g., servings or weight)
                  </label>
                  <input
                    type="text"
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="e.g., 5 servings or 2 kg"
                  />
                </div>
                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Pickup Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="e.g., 123 Main St, City"
                  />
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors duration-300 ${
                      loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {loading ? "Submitting..." : "Submit Donation"}
                  </button>
                </div>
              </form>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DonateFoodPage;
