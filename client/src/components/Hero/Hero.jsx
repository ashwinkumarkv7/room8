import React from 'react';
// 1. Import your banner image
import bannerImage from '../../assets/images/banner.png';

export default function Hero() {
  return (
    // Changed min-h-[80vh] to min-h-screen to fill the viewport height
    <section 
      style={{ backgroundImage: `url(${bannerImage})` }}
      className="relative bg-cover bg-center min-h-screen flex items-center text-white"
    >
      {/* This div creates the semi-transparent black overlay */}
      <div className="absolute inset-0 bg-black/50" aria-hidden="true"></div>

      {/* Position the content on top of the overlay */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Find the Right Room, with the Right Roommate.</h1>
          <p className="text-xl mb-8">Room8 matches you by location, lifestyle, and vibe — not just rent.</p>
          
          <div className="bg-white rounded-lg p-4 shadow-lg">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input 
                  type="text" 
                  placeholder="Enter location" 
                  // Use the custom hex color for the focus ring
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b2184] text-gray-900" 
                />
              </div>
              <div className="flex-1">
                <select 
                  // Use the custom hex color for the focus ring
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b2184] text-gray-900"
                >
                  <option>Looking for Room</option>
                  <option>Have a Room</option>
                </select>
              </div>
              {/* Use the custom hex color for the button and a brightness filter for hover */}
              <button className="bg-[#6b2184] text-white px-6 py-3 rounded-lg hover:brightness-90 transition-all font-medium">
                Start Matching
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}