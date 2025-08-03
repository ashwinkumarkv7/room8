import React from 'react';
import { StarIcon } from '@heroicons/react/24/solid'; // Using Heroicons

export default function TestimonialCard({ testimonial }) {
  const { quote, name, location, imageUrl, rating } = testimonial;

  return (
    // 1. Using a solid background and flexbox for robustness and symmetry
    <div className="flex flex-col h-full bg-white p-8 rounded-xl shadow-lg">
      <div className="flex mb-4">
        {/* 2. Switched to Heroicons for star rating */}
        {[...Array(5)].map((_, i) => (
          <StarIcon
            key={i}
            className={`h-5 w-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
            aria-hidden="true"
          />
        ))}
      </div>
      
      {/* 3. flex-grow pushes the user info to the bottom, ensuring symmetrical card heights */}
      <p className="italic text-gray-600 flex-grow">"{quote}"</p>
      
      <div className="flex items-center mt-6">
        <div className="w-12 h-12 rounded-full mr-4 overflow-hidden flex-shrink-0">
          <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h4 className="font-bold text-gray-900">{name}</h4>
          {/* 4. Using standard Tailwind gray color for location */}
          <p className="text-gray-500 text-sm">{location}</p>
        </div>
      </div>
    </div>
  );
}