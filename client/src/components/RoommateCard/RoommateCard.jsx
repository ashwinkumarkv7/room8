import React from 'react';
import { MapPinIcon, BriefcaseIcon, AcademicCapIcon } from '@heroicons/react/24/solid';

export default function RoommateCard({ person }) {
  const { name, age, gender, imageUrl, occupation, job, location, bio, preferences } = person;

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full overflow-hidden">
      <div className="p-5 flex items-center border-b border-gray-200">
        <img src={imageUrl} alt={name} className="h-20 w-20 rounded-full object-cover mr-4" />
        <div>
          <h3 className="text-xl font-bold text-gray-800">{name}</h3>
          <p className="text-gray-500 text-sm">{age}, {gender.charAt(0).toUpperCase() + gender.slice(1)}</p>
          <p className="text-gray-500 text-sm flex items-center mt-1">
            <MapPinIcon className="h-4 w-4 mr-1.5" />
            {location}
          </p>
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center text-gray-600 mb-4">
          {occupation === 'student' ? <AcademicCapIcon className="h-5 w-5 mr-2" /> : <BriefcaseIcon className="h-5 w-5 mr-2" />}
          <span className="font-semibold">{job}</span>
        </div>
        
        <p className="text-gray-700 text-sm mb-4 italic">"{bio}"</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {preferences.map(pref => (
            <span key={pref} className="text-xs bg-purple-100 text-[#6b2184] font-semibold px-2 py-1 rounded-full">{pref}</span>
          ))}
        </div>
        
        <button className="mt-auto w-full bg-[#6b2184] text-white py-2 rounded-lg hover:brightness-90 transition-all font-semibold">
          View Profile
        </button>
      </div>
    </div>
  );
}