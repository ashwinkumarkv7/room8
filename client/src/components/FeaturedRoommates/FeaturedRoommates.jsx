import React from 'react';
import { Link } from 'react-router-dom';
import RoommateCard from '../RoommateCard/RoommateCard';

// Sample data for featured roommates
const featuredRoommates = [
  {
    id: 1, name: 'Sameer Singh', age: 25, gender: 'male',
    imageUrl: 'https://randomuser.me/api/portraits/men/34.jpg',
    occupation: 'professional', job: 'Software Engineer',
    location: 'Kochi, Kerala', budget: 15000,
    bio: "I work in tech, mostly from home. I enjoy video games and quiet evenings.",
    preferences: ['Non-smoker', 'Quiet', 'Clean'],
  },
  {
    id: 2, name: 'Neha Sharma', age: 22, gender: 'female',
    imageUrl: 'https://randomuser.me/api/portraits/women/22.jpg',
    occupation: 'student', job: 'M.Tech Student',
    location: 'Thiruvananthapuram, Kerala', budget: 8000,
    bio: "Student at CET. I'm friendly, outgoing, and keep my space tidy.",
    preferences: ['Vegetarian', 'Social', 'Tidy'],
  },
  {
    id: 3, name: 'Arjun Menon', age: 28, gender: 'male',
    imageUrl: 'https://randomuser.me/api/portraits/men/41.jpg',
    occupation: 'professional', job: 'Graphic Designer',
    location: 'Kochi, Kerala', budget: 12000,
    bio: "Creative professional who loves music and art. I have a cat who is very friendly.",
    preferences: ['Pet-friendly', 'Creative', 'Social'],
  },
  {
    id: 4, name: 'Anjali Nair', age: 26, gender: 'female',
    imageUrl: 'https://randomuser.me/api/portraits/women/31.jpg',
    occupation: 'professional', job: 'Marketing Manager',
    location: 'Kochi, Kerala', budget: 18000,
    bio: "Love exploring new places and trying out new food. Looking for a flatmate to explore the city with.",
    preferences: ['Social', 'Foodie', 'Clean'],
  },
];

export default function FeaturedRoommates() {
  return (
    <section>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Find Your Next Roommate</h2>
        <Link to="/browse-roommates" className="text-[#6b2184] font-semibold hover:underline">
          Browse All Roommates →
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {featuredRoommates.map(person => (
          <RoommateCard key={person.id} person={person} />
        ))}
      </div>
    </section>
  );
}
