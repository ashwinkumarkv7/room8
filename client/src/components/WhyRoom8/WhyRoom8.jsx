import React from 'react';
// 1. Import Heroicons to replace Font Awesome
import {
  CpuChipIcon,
  MapIcon,
  AdjustmentsHorizontalIcon,
} from '@heroicons/react/24/outline';

// 2. Updated BenefitCard component with new styling and flexbox for symmetry
const BenefitCard = ({ icon: Icon, title, description }) => (
  // Added flexbox to ensure all cards have the same height
  <div className="flex flex-col text-center p-6 rounded-xl bg-gray-50 border border-gray-100 shadow-md hover:shadow-lg transition-shadow duration-300">
    {/* Icon circle styling updated */}
    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 flex-shrink-0">
      {/* Icon uses brand color and is now a Heroicon */}
      <Icon className="h-8 w-8 text-[#6b2184]" />
    </div>
    <div className="flex flex-col flex-grow">
      <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

export default function WhyRoom8() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* 3. Added brand color to the title for consistency */}
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
          Why Choose <span className="text-[#6b2184]">Room8</span>?
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">We're changing the way people find roommates and shared living spaces.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 4. Pass the imported Heroicon components as props */}
          <BenefitCard
            icon={CpuChipIcon}
            title="Smart Matching"
            description="Our algorithm considers lifestyle, habits, and personality to find your ideal roommate match, not just someone who can pay rent."
          />
          <BenefitCard
            icon={MapIcon}
            title="Map-based Discovery"
            description="Find rooms and roommates in your desired neighborhoods with our interactive map interface."
          />
          <BenefitCard
            icon={AdjustmentsHorizontalIcon}
            title="Detailed Filtering"
            description="Filter by cleanliness, sleep schedule, social preferences, and more to find someone who truly matches your lifestyle."
          />
        </div>
      </div>
    </section>
  );
}