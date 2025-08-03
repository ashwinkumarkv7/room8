import React from 'react';
import { MapPinIcon, UserCircleIcon, StarIcon, WifiIcon, BoltIcon } from '@heroicons/react/24/solid';

export default function RoomCard({ listing }) {
  const { imageUrl, price, title, area, city, postedBy, features } = listing;

  return (
    <div className="flex flex-col bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 h-full">
      <div className="h-48 relative">
        <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        <div className="absolute top-3 right-3 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-bold">
          ₹{price.toLocaleString('en-IN')}/month
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-800 truncate">{title}</h3>
        <p className="text-sm text-gray-500 flex items-center mt-1">
          <MapPinIcon className="h-4 w-4 mr-1.5" />
          {area}, {city}
        </p>

        <div className="flex items-center my-4">
            {features.map(feature => (
                <span key={feature} className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full mr-2">{feature}</span>
            ))}
        </div>

        <div className="border-t border-gray-200 pt-3 mt-auto">
             <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <img src={postedBy.imageUrl} alt={postedBy.name} className="h-10 w-10 rounded-full object-cover mr-3" />
                    <div>
                        <p className="text-sm font-semibold text-gray-700">{postedBy.name}</p>
                        <div className="flex items-center">
                            <StarIcon className="h-4 w-4 text-yellow-400 mr-1" />
                            <span className="text-xs text-gray-500">{postedBy.rating}</span>
                        </div>
                    </div>
                </div>
                 <button className="bg-[#6b2184] text-white px-4 py-2 rounded-md text-sm font-semibold hover:brightness-90 transition-all">
                    View
                 </button>
             </div>
        </div>
      </div>
    </div>
  );
}