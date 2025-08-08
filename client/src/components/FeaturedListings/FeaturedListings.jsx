import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Use Link for navigation
import ListingCard from './ListingCard';
import API_URL from '../../apiConfig'; // 1. Import the API URL

export default function FeaturedListings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedListings = async () => {
      try {
        setLoading(true);
        // 2. Use the live server URL from the config file
        const response = await fetch(`${API_URL}/api/rooms`);
        if (!response.ok) {
          throw new Error('Failed to fetch listings');
        }
        const data = await response.json();
        // Take only the first 4 listings for the "featured" section
        setListings(data.slice(0, 4));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedListings();
  }, []); // Empty array ensures this runs only once when the component mounts

  return (
    <section className="py-5 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Featured Listings</h2>
          <Link to="/browse-rooms" className="text-[#6b2184] font-semibold hover:underline">
            Browse All Rooms →
          </Link>
        </div>

        {loading && <p>Loading listings...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {listings.map((listing) => (
              // Use listing._id from MongoDB as the key for better performance
              <ListingCard key={listing._id} listing={listing} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
