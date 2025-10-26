"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";

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

const FoodDetailsPage = () => {
  const { id } = useParams();
  const { status } = useSession();
  const [foodEntry, setFoodEntry] = useState<FoodEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFoodEntry = async () => {
      if (!id || status !== "authenticated") return;
      try {
        const response = await fetch(`/api/get-food?id=${id}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch food entry");
        }
        const data: FoodEntry = await response.json();
        setFoodEntry(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load food entry"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchFoodEntry();
  }, [id, status]);

  if (loading || status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-green-50 to-teal-50">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-t-4 border-green-600 mx-auto"></div>
          </div>
          <p className="mt-4 text-gray-700 text-lg font-medium">
            Loading food details...
          </p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-red-700 mb-4">Access Denied</h2>
          <p className="text-red-600">You must be logged in to view this page.</p>
          <Link href="/login" className="mt-6 inline-block bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition-colors">
              Log In
          </Link>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-red-700 mb-4">Error</h2>
          <p className="text-red-600">{error}</p>
          <Link href="/get-food" className="mt-6 inline-block bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition-colors">
              Back to list
          </Link>
        </div>
      </div>
    );
  }

  if (!foodEntry) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            Food not found
          </h2>
          <p className="text-gray-600">
            The requested food item could not be found.
          </p>
          <Link href="/get-food" className="mt-6 inline-block bg-gray-600 text-white px-6 py-3 rounded-full hover:bg-gray-700 transition-colors">
              Back to list
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-green-50 to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-teal-600 p-8">
          <h2 className="text-4xl font-bold text-white">
            {foodEntry.description}
          </h2>
          <p className="text-green-100 mt-2">
            Donated on {new Date(foodEntry.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="p-8 space-y-6">
          <div>
            <h3 className="font-bold text-gray-800 text-lg mb-2">Quantity</h3>
            <p className="text-gray-600">{foodEntry.quantity}</p>
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-lg mb-2">
              Best Before
            </h3>
            <p className="text-gray-600">
              {new Date(foodEntry.bestBeforeDate).toLocaleDateString()}
            </p>
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-lg mb-2">Location</h3>
            <p className="text-gray-600">{foodEntry.location}</p>
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-lg mb-2">Contact</h3>
            <p className="text-gray-600">{foodEntry.contact}</p>
          </div>
        </div>
        <div className="p-8 bg-gray-50 text-right">
          <Link
            href="/get-food"
            className="inline-flex items-center bg-gray-200 text-gray-800 px-6 py-3 rounded-full hover:bg-gray-300 transition-all duration-200 font-medium"
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to list
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FoodDetailsPage;
