import React from 'react';
import { MapPinIcon } from '@heroicons/react/24/solid';

export default function ListingCard({ listing }) {
  const { imageUrl, price, title, location, tags } = listing;
  
  return (
    // 1. Make the card a flex column to control its children's layout
    <div className="flex flex-col bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
      
      {/* Image container - flex-shrink-0 prevents it from shrinking */}
      <div className="h-48 bg-gray-200 relative flex-shrink-0">
        <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        <div className="absolute top-4 left-4 bg-[#6b2184] text-white px-3 py-1 rounded-full text-sm font-medium">${price}/mo</div>
      </div>
      
      {/* 2. Content area is now also a flex column and will grow to fill available space */}
      <div className="flex flex-col flex-grow p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-3 flex items-center">
          <MapPinIcon className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" />
          {location}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span key={index} className="bg-purple-100 text-[#6b2184] px-3 py-1 rounded-full text-xs font-semibold">{tag}</span>
          ))}
        </div>

        {/* 3. Using mt-auto (margin-top: auto) pushes the button to the bottom of the card */}
        <button className="mt-auto w-full bg-[#6b2184] text-white py-2.5 rounded-lg hover:brightness-90 transition-all font-semibold">View Details</button>
      </div>
    </div>
  );
}