import React from 'react';
// Import the necessary icons from Heroicons
import {
  UserPlusIcon,
  MagnifyingGlassIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from '@heroicons/react/24/outline';

// The StepCard component now uses the specific hex color
const StepCard = ({ icon: Icon, title, description }) => (
  <div className="bg-gradient-to-br from-purple-100/50 to-white p-8 rounded-2xl text-center border border-purple-200/80 shadow-lg shadow-purple-200/60 transition-all duration-300 hover:shadow-xl hover:shadow-purple-300/60 hover:-translate-y-1">
    
    {/* 1. Icon background uses the custom hex color */}
    <div className="w-16 h-16 bg-[#6b2184] rounded-full flex items-center justify-center mx-auto mb-6">
      <Icon className="h-8 w-8 text-white" aria-hidden="true" />
    </div>
    
    {/* 2. Card title uses the custom hex color */}
    <h3 className="text-xl font-bold mb-3 text-[#6b2184]">{title}</h3>
    <p className="text-gray-700">{description}</p>
  </div>
);

export default function HowItWorks() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* 3. "Room8" text uses the custom hex color */}
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
          How <span className="text-[#6b2184]">Room8</span> Works
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">Finding your perfect living situation has never been easier with our simple 3-step process.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StepCard
            icon={UserPlusIcon}
            title="Create Your Profile"
            description="Tell us about your lifestyle, habits, and housing preferences to help us find your perfect match."
          />
          <StepCard
            icon={MagnifyingGlassIcon}
            title="Find a Match"
            description="Our algorithm suggests compatible roommates or listings based on your profile and preferences."
          />
          <StepCard
            icon={ChatBubbleOvalLeftEllipsisIcon}
            title="Connect & Move In"
            description="Chat with potential matches, arrange viewings, and finalize your perfect living situation."
          />
        </div>
      </div>
    </section>
  );
}