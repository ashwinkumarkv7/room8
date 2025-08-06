import React from 'react';
import { MapPinIcon, BriefcaseIcon, AcademicCapIcon } from '@heroicons/react/24/solid';

export default function RoommateCard({ person }) {
  // 1. Using all the correct property names from your MongoDB User model
  const { fullName, age, gender, profilePic, occupation, profession, city, bio, hobbies } = person;

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full overflow-hidden">
      <div className="p-5 flex items-center border-b border-gray-200">
        {/* 2. Using 'profilePic' which comes from the database */}
        <img src={profilePic} alt={fullName} className="h-20 w-20 rounded-full object-cover mr-4" />
        <div>
          {/* 3. Using 'fullName' */}
          <h3 className="text-xl font-bold text-gray-800">{fullName}</h3>
          {/* 4. Re-added the age and gender display from your old code */}
          {age && gender && <p className="text-gray-500 text-sm">{age}, {gender.charAt(0).toUpperCase() + gender.slice(1)}</p>}
          <p className="text-gray-500 text-sm flex items-center mt-1">
            <MapPinIcon className="h-4 w-4 mr-1.5" />
            {/* 5. Using 'city' */}
            {city || 'Location not set'}
          </p>
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center text-gray-600 mb-4">
          {/* 6. Checking for 'student' in the profession field */}
          {occupation === 'student' ? <AcademicCapIcon className="h-5 w-5 mr-2" /> : <BriefcaseIcon className="h-5 w-5 mr-2" />}
          <span className="font-semibold">{profession || 'Profession not set'}</span>
        </div>
        
        <p className="text-gray-700 text-sm mb-4 italic">"{bio || 'No bio provided.'}"</p>
        
        {/* 7. Mapping over 'hobbies' */}
        {hobbies && hobbies.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
            {hobbies.map(hobby => (
                <span key={hobby} className="text-xs bg-purple-100 text-[#6b2184] font-semibold px-2 py-1 rounded-full">{hobby}</span>
            ))}
            </div>
        )}
        
        <button className="mt-auto w-full bg-[#6b2184] text-white py-2 rounded-lg hover:brightness-90 transition-all font-semibold">
          View Profile
        </button>
      </div>
    </div>
  );
}
