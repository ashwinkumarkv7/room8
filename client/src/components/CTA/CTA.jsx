import React from 'react';
// 1. Import the Heroicon for the checkmarks
import { CheckCircleIcon } from '@heroicons/react/24/solid';

export default function CTA() {
  return (
    // 2. Used a standard light gray background
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        {/* 3. Used a standard dark text color for the heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ready to find your perfect place?</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">Join thousands of happy roommates who found their ideal living situation through Room8.</p>
        
        {/* 4. Applied your brand color to the button and made it fully rounded */}
        <button className="bg-[#6b2184] text-white px-8 py-4 rounded-full text-lg font-medium hover:brightness-90 transition-all shadow-lg hover:shadow-xl">
          Join Room8 Now - It's Free!
        </button>
        
        <div className="mt-6 flex justify-center items-center space-x-8">
          {/* 5. Replaced Font Awesome with Heroicons */}
          <div className="flex items-center text-gray-600">
            <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center text-gray-600">
            <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
            <span>Free forever</span>
          </div>
        </div>
      </div>
    </section>
  );
}