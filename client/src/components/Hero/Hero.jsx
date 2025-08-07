import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bannerImage from '../../assets/images/banner.png';

export default function Hero() {
  const [location, setLocation] = useState('');
  const [searchType, setSearchType] = useState('room');
  const navigate = useNavigate();

  const handleSearch = () => {
    const targetPath = searchType === 'room' ? '/browse-rooms' : '/browse-roommates';
    navigate(targetPath, { state: { location: location } });
  };

  return (
    <section 
      style={{ backgroundImage: `url(${bannerImage})` }}
      // --- 1. Updated this line for responsive height ---
      // It's now min-h-[70vh] on mobile and min-h-screen on medium screens and up.
      className="relative bg-cover bg-center min-h-[70vh] md:min-h-screen flex items-center text-white"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-[#6b2184]/70 to-[#6b2184]/50" aria-hidden="true"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Find the Right Room, with the Right Roommate.</h1>
          <p className="text-xl mb-8">Room8 matches you by location, lifestyle, and vibe — not just rent.</p>
          
          <div className="bg-white rounded-lg p-4 shadow-lg">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input 
                  type="text" 
                  placeholder="Enter location (e.g., Kochi)" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b2184] text-gray-900" 
                />
              </div>
              <div className="flex-1">
                <select 
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b2184] text-gray-900"
                >
                  <option value="room">Looking for Room</option>
                  <option value="roommate">Looking for Roommate</option>
                </select>
              </div>
              <button 
                onClick={handleSearch}
                className="bg-[#6b2184] text-white px-6 py-3 rounded-lg hover:brightness-90 transition-all font-medium"
              >
                Start Matching
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
