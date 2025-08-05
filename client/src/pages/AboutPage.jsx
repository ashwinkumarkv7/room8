import React from 'react';
import CTA from '../components/CTA/CTA'; // Reusing the CTA component for the bottom section
import { UsersIcon, LightBulbIcon, HeartIcon } from '@heroicons/react/24/outline';


// --- Team Member Card Component ---
const TeamMemberCard = ({ name, role, imageUrl }) => (
  <div className="text-center">
    <img
      className="mx-auto h-32 w-32 rounded-full object-cover"
      src={imageUrl}
      alt={`Portrait of ${name}`}
    />
    <h3 className="mt-4 text-xl font-bold text-gray-900">{name}</h3>
    <p className="mt-1 text-base text-[#6b2184] font-semibold">{role}</p>
  </div>
);

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* --- Hero Section --- */}
      <div className="relative bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Connecting People, Creating Homes
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Room8 is more than an app; it's a community built on the belief that finding a place to live should be a safe, simple, and enjoyable experience.
          </p>
        </div>
      </div>

      {/* --- Our Story Section --- */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-[#6b2184]">Our Journey</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              How It All Started
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Founded in **August 2025**, Room8 was born from a simple idea between two friends struggling to find a decent flatshare in Thiruvananthapuram. They realized finding a roommate should be about more than just splitting the rent—it should be about finding a compatible person to share a home with. That's why we built a platform focused on lifestyle, habits, and personality.
            </p>
          </div>
        </div>
      </div>

      {/* --- Meet the Team Section --- */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Meet Our Team</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              The passionate individuals dedicated to helping you find your perfect match.
            </p>
          </div>
          <div className="mx-auto mt-20 grid max-w-lg grid-cols-1 gap-x-8 gap-y-20 sm:max-w-2xl sm:grid-cols-2 lg:max-w-4xl lg:grid-cols-3">
            <TeamMemberCard name="Priya Sharma" role="Co-Founder & CEO" imageUrl="https://randomuser.me/api/portraits/women/48.jpg" />
            <TeamMemberCard name="Rahul Varma" role="Co-Founder & CTO" imageUrl="https://randomuser.me/api/portraits/men/46.jpg" />
            <TeamMemberCard name="Anjali Menon" role="Head of Community" imageUrl="https://randomuser.me/api/portraits/women/47.jpg" />
          </div>
        </div>
      </div>

      {/* --- Reusable CTA Section --- */}
      <CTA />

    </div>
  );
}