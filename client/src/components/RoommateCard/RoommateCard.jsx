import React from 'react';
import { MapPinIcon, BriefcaseIcon, SparklesIcon, UserGroupIcon, ClockIcon, NoSymbolIcon } from '@heroicons/react/24/solid';

// Updated sub-component to include a label
const LifestyleTrait = ({ icon: Icon, label, text }) => (
    <div className="flex items-center space-x-3">
        <Icon className="h-6 w-6 text-gray-400 flex-shrink-0" />
        <div>
            <p className="text-xs text-gray-500">{label}</p>
            <p className="text-sm font-semibold text-gray-800">{text}</p>
        </div>
    </div>
);

export default function RoommateCard({ person }) {
  const {
    fullName,
    profilePic,
    city,
    profession,
    bio,
    hobbies,
    cleanliness,
    socialHabits,
    sleepSchedule,
    smoking,
  } = person;

  // Helper to format text for display
  const formatText = (text) => text ? text.charAt(0).toUpperCase() + text.slice(1) : 'Not set';

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full overflow-hidden">
      {/* --- Header Section --- */}
      <div className="p-5 flex items-center border-b border-gray-200">
        <img
          src={profilePic !== 'default_avatar_url' ? profilePic : `https://ui-avatars.com/api/?name=${fullName}&background=6b2184&color=fff`}
          alt={fullName}
          className="h-20 w-20 rounded-full object-cover mr-4 border-2 border-white shadow-sm"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://ui-avatars.com/api/?name=${fullName}&background=6b2184&color=fff`;
          }}
        />
        <div>
          <h3 className="text-xl font-bold text-gray-900">{fullName}</h3>
          <p className="text-gray-500 text-sm flex items-center mt-1">
            <MapPinIcon className="h-4 w-4 mr-1.5" />
            {city || 'Location not set'}
          </p>
        </div>
      </div>

      {/* --- Body Section --- */}
      <div className="p-5 flex flex-col flex-grow text-sm text-gray-700">
        {profession && (
          <div className="flex items-center text-gray-700 mb-4">
            <BriefcaseIcon className="h-5 w-5 mr-3 text-gray-400" />
            <span className="font-semibold">{profession}</span>
          </div>
        )}

        {/* --- Updated Lifestyle Section --- */}
        <div className="space-y-3 mb-4">
            <LifestyleTrait icon={SparklesIcon} label="Cleanliness" text={formatText(cleanliness)} />
            <LifestyleTrait icon={UserGroupIcon} label="Social Habits" text={formatText(socialHabits)} />
            <LifestyleTrait icon={ClockIcon} label="Sleep Schedule" text={formatText(sleepSchedule)} />
            <LifestyleTrait icon={NoSymbolIcon} label="Smoking" text={smoking === 'no' ? "Non-smoker" : "Smoker"} />
        </div>

        {hobbies && hobbies.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {hobbies.map((hobby) => (
              <span
                key={hobby}
                className="text-xs bg-purple-100 text-[#6b2184] font-semibold px-2 py-1 rounded-full"
              >
                {hobby}
              </span>
            ))}
          </div>
        )}
        
        <p className="text-gray-600 text-sm mb-4 italic flex-grow">"{bio || 'No bio provided.'}"</p>

        <button className="mt-auto w-full bg-[#6b2184] text-white py-2.5 rounded-lg hover:brightness-90 transition-all font-semibold">
          View Profile
        </button>
      </div>
    </div>
  );
}
