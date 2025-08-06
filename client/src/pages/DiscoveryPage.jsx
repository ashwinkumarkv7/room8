import React from 'react';
import { useAuth } from '../context/AuthContext';
import FeaturedListings from '../components/FeaturedListings/FeaturedListings';
import FeaturedRoommates from '../components/FeaturedRoommates/FeaturedRoommates';

export default function DiscoveryPage() {
  const { userInfo } = useAuth();

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
            <h1 className="text-3xl font-bold text-gray-800">
            Welcome back, {userInfo ? userInfo.fullName.split(' ')[0] : 'Guest'}!
            </h1>
            <p className="mt-2 text-lg text-gray-600">
            Discover rooms and roommates tailored for you.
            </p>
        </div>

        {/* Featured Rooms Section */}
        <FeaturedListings />

        {/* Featured Roommates Section */}
        <div className="mt-16">
          <FeaturedRoommates />
        </div>
      </div>
    </div>
  );
}
