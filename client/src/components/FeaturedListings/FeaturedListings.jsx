import React from 'react';
import ListingCard from './ListingCard';

// Sample data - no changes here
const listings = [
  {
    imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80",
    price: 950,
    title: "Sunny Apartment in Downtown",
    location: "Chicago, IL",
    tags: ["Pet-friendly", "Furnished", "Parking"]
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80",
    price: 750,
    title: "Cozy Room Near Campus",
    location: "Austin, TX",
    tags: ["Student-friendly", "Utilities included"]
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80",
    price: 1200,
    title: "Modern Loft in Arts District",
    location: "Los Angeles, CA",
    tags: ["Creative space", "Balcony", "Gym access"]
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80",
    price: 850,
    title: "Quiet House in Suburbs",
    location: "Portland, OR",
    tags: ["Garden", "Parking", "Quiet area"]
  }
];

export default function FeaturedListings() {
  return (
    // 1. Used a light gray background for a clean, modern feel
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Featured Listings</h2>
          {/* 2. Used your brand color for the link */}
          <a href="#" className="text-[#6b2184] font-semibold hover:underline">Browse All Rooms →</a>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {listings.map((listing, index) => (
            <ListingCard key={index} listing={listing} />
          ))}
        </div>
      </div>
    </section>
  );
}