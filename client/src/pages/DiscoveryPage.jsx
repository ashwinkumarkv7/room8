import React from 'react';
import { useAuth } from '../context/AuthContext';
import FeaturedListings from '../components/FeaturedListings/FeaturedListings';
import FeaturedRoommates from '../components/FeaturedRoommates/FeaturedRoommates';

export default function DiscoveryPage() {
  const { userInfo } = useAuth();

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* 1. Reduced vertical padding from py-12 to py-8 */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 2. Reduced bottom margin from mb-8 to mb-6 */}
        <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
            Welcome back, {userInfo ? userInfo.fullName.split(' ')[0] : 'Guest'}!
            </h1>
            <p className="mt-2 text-lg text-gray-600">
            Discover rooms and roommates tailored for you.
            </p>
        </div>

        {/* Featured Rooms Section */}
        <FeaturedListings />

        {/* 3. Reduced top margin from mt-12 to mt-10 */}
        <div className="mt-10">
          <FeaturedRoommates />
        </div>
      </div>
    </div>
  );
}
