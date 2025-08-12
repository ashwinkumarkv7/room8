import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ListingCard from "./ListingCard";
import ListingCardSkeleton from "../skeletons/ListingCardSkeleton";
import API_URL from "../../apiConfig";

export default function FeaturedListings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedListings = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${API_URL}/api/rooms`);
        if (!response.ok) throw new Error("Failed to fetch listings");
        const data = await response.json();
        setListings((data || []).slice(0, 4));
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedListings();
  }, []);

  return (
    <section className="py-5 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Featured Listings</h2>
          <Link
            to="/browse-rooms"
            className="text-[#6b2184] font-semibold hover:underline"
          >
            Browse All Rooms →
          </Link>
        </div>

        {error && (
          <p className="text-red-500 mb-6">
            {error}
          </p>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <ListingCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {listings.map((listing) => (
              <ListingCard key={listing._id} listing={listing} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}