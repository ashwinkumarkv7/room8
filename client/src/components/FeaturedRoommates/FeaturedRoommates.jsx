import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RoommateCard from '../RoommateCard/RoommateCard';
import API_URL from '../../apiConfig';
// 1. Import the skeleton component
import RoommateCardSkeleton from '../skeletons/RoommateCardSkeleton';

export default function FeaturedRoommates() {
  const [roommates, setRoommates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedRoommates = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/api/users`);
        if (!response.ok) {
          throw new Error('Failed to fetch roommates');
        }
        const data = await response.json();
        // Take only the first 4 roommates for the "featured" section
        setRoommates(data.slice(0, 4));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedRoommates();
  }, []);

  return (
    <section>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Find Your Next Roommate</h2>
        <Link to="/browse-roommates" className="text-[#6b2184] font-semibold hover:underline">
          Browse All Roommates →
        </Link>
      </div>

      {/* 2. Updated loading and error handling logic */}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading ? (
          // If loading, show 4 skeleton cards
          <>
            <RoommateCardSkeleton />
            <RoommateCardSkeleton />
            <RoommateCardSkeleton />
            <RoommateCardSkeleton />
          </>
        ) : (
          // Otherwise, show the actual roommate cards
          roommates.map(person => (
            <RoommateCard key={person._id} person={person} />
          ))
        )}
      </div>
    </section>
  );
}
