import React from 'react';
import { Link } from 'react-router-dom';
import { MapPinIcon, StarIcon } from '@heroicons/react/24/solid';

export default function ListingCard({ listing }) {
  // 1. Destructure _id directly from the listing object
  const { _id, imageUrl, price, title, area, city, postedBy, features } = listing;

  return (
    <div className="flex flex-col bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full">
      
      {/* 2. Ensure the Link uses the correct _id */}
      <Link to={`/rooms/${_id}`}>
        <div className="h-48 bg-gray-200 relative flex-shrink-0">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover"
            onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/6b2184/FFFFFF?text=Room8' }}
          />
          <div className="absolute top-4 left-4 bg-[#6b2184] text-white px-3 py-1 rounded-full text-sm font-medium">
            ₹{price ? price.toLocaleString('en-IN') : 'N/A'}/mo
          </div>
        </div>
      </Link>
      
      <div className="flex flex-col flex-grow p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-3 flex items-center">
          <MapPinIcon className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" />
          {area}, {city}
        </p>
        
        {features && features.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
            {features.map((feature) => (
                <span key={feature} className="bg-purple-100 text-[#6b2184] px-3 py-1 rounded-full text-xs font-semibold">{feature}</span>
            ))}
            </div>
        )}

        {postedBy && (
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
                    {/* 3. Ensure this Link also uses the correct _id */}
                    <Link to={`/rooms/${_id}`} className="bg-[#6b2184] text-white px-4 py-2 rounded-md text-sm font-semibold hover:brightness-90 transition-all">
                        View
                    </Link>
                </div>
            </div>
        )}
      </div>
    </div>
  );
}
