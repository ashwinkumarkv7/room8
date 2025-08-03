import React from 'react';
import { StarIcon } from '@heroicons/react/24/solid';

// --- Testimonial Card Component (This part is correct) ---
const TestimonialCard = ({ testimonial }) => {
  const { quote, name, location, imageUrl, rating } = testimonial;

  return (
    <div className="flex flex-col h-full bg-[#8b5cf6] p-8 rounded-2xl shadow-lg">
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <StarIcon 
            key={i} 
            className={`h-5 w-5 ${i < Math.round(rating) ? 'text-yellow-400' : 'text-[#c4b5fd]'}`}
          />
        ))}
      </div>
      <p className="italic text-[#ede9fe] flex-grow">"{quote}"</p>
      <div className="flex items-center mt-6">
        <div className="w-12 h-12 rounded-full mr-4 overflow-hidden flex-shrink-0 border-2 border-[#c4b5fd]">
          <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h4 className="font-bold text-white">{name}</h4>
          <p className="text-[#ddd6fe] text-sm">{location}</p>
        </div>
      </div>
    </div>
  );
};


// --- Main Testimonials Component (Wavy Divider Removed) ---
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
    // 1. Removed 'relative' class and adjusted padding for a simple, straight-edge design.
    <section className="bg-[#6b2184] text-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">What Our Users Say</h2>
        <p className="text-center text-purple-200 max-w-2xl mx-auto mb-12">Don't just take our word for it - hear from people who found their perfect match through Room8.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
      {/* 2. The SectionShapeDivider component has been completely removed. */}
    </section>
  );
}