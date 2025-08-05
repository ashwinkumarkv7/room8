import React from 'react';
import { StarIcon } from '@heroicons/react/24/solid';

// --- Decorative Quote Icon Component ---
const QuoteIcon = () => (
    // Adjusted color for the new card background
  <svg className="absolute top-0 left-0 w-16 h-16 text-white/10 transform -translate-x-4 -translate-y-4" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
    <path d="M9.333 4C4.186 4 0 8.186 0 13.333c0 5.147 4.186 9.333 9.333 9.333.387 0 .76-.026 1.12-.08C11.173 25.64 12.933 28 16 28c0-4.027-3.413-7.28-7.733-7.28-.48 0-.947.053-1.4.16-.32-.533-.533-1.147-.533-1.813 0-2.587 2.093-4.68 4.68-4.68.32 0 .627.027.92.08C11.2 6.48 9.333 4 9.333 4zm13.334 0C17.52 4 13.333 8.186 13.333 13.333c0 5.147 4.187 9.333 9.334 9.333.386 0 .76-.026 1.12-.08 1.493 3.387 3.253 5.72 6.213 5.72 0-4.027-3.413-7.28-7.733-7.28-.48 0-.947.053-1.4.16-.32-.533-.534-1.147-.534-1.813 0-2.587 2.094-4.68 4.68-4.68.32 0 .627.027.92.08C24.533 6.48 22.667 4 22.667 4z" />
  </svg>
);


// --- Redesigned Testimonial Card ---
const TestimonialCard = ({ testimonial }) => {
  const { quote, name, location, imageUrl, rating } = testimonial;

  return (
    // 1. Card now has a lighter, more harmonious shade of purple.
    <div className="relative flex flex-col h-full bg-[#884da9] p-8 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <QuoteIcon />
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex-grow">
          <div className="flex mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                // 2. Unfilled star color adjusted for the new background.
                <StarIcon 
                  key={i} 
                  className={`h-5 w-5 ${i < Math.round(rating) ? 'text-yellow-400' : 'text-[#a57ac0]'}`}
                />
              ))}
            </div>
          </div>
          {/* 3. Text colors updated for readability. */}
          <p className="italic text-[#dfd1e6] flex-grow">"{quote}"</p>
        </div>
        <div className="flex items-center mt-6 pt-6 border-t border-white/20">
          <div className="w-12 h-12 rounded-full mr-4 overflow-hidden flex-shrink-0 border-2 border-white/30">
            <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
          </div>
          <div>
            <h4 className="font-bold text-white">{name}</h4>
            <p className="text-[#c2a3d3] text-sm">{location}</p>
          </div>
        </div>
      </div>
    </div>
  );
};


// --- Main Testimonials Component ---
const testimonialsData = [
  {
    quote: "Room8 matched me with Sarah, who has become not just an amazing roommate but a close friend. We have similar schedules and lifestyles, which makes living together effortless.",
    name: "Jessica T.",
    location: "New York, NY",
    imageUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5
  },
  {
    quote: "As an introvert, I was nervous about finding a roommate. Room8's detailed filtering helped me find someone who respects my need for quiet time while still being friendly.",
    name: "Michael R.",
    location: "Seattle, WA",
    imageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5
  },
  {
    quote: "Found my current apartment through Room8 in just 2 weeks! The map feature made it easy to find places in my preferred neighborhood at my budget.",
    name: "Aisha K.",
    location: "Chicago, IL",
    imageUrl: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 4.5 
  }
];

export default function Testimonials() {
  return (
    // Using your brand's dark purple for the section background
    <section className="bg-[#6b2184] py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-white mb-4">What Our Users Say</h2>
        <p className="text-center text-purple-200 max-w-2xl mx-auto mb-12">Don't just take our word for it - hear from people who found their perfect match through Room8.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
