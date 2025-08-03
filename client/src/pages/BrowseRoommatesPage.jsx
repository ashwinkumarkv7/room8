import React, { useState, useEffect } from 'react';
// 1. Import the useLocation hook
import { useLocation } from 'react-router-dom';
import RoommateFilterSidebar from '../components/RoommateFilterSidebar/RoommateFilterSidebar';
import RoommateGrid from '../components/RoommateGrid/RoommateGrid';
import SearchBar from '../components/SearchBar/SearchBar';

// --- Sample Data for potential roommates ---
const DUMMY_ROOMMATES = [
  {
    id: 1, name: 'Sameer Singh', age: 25, gender: 'male',
    imageUrl: 'https://randomuser.me/api/portraits/men/34.jpg',
    occupation: 'professional', job: 'Software Engineer',
    location: 'Kochi, Kerala', budget: 15000,
    bio: "I work in tech, mostly from home. I enjoy video games and quiet evenings. Looking for a clean and respectful roommate.",
    preferences: ['Non-smoker', 'Quiet', 'Clean'],
    vibe: { isSmoker: false, isNightOwl: false, cleanliness: 'clean' }
  },
  {
    id: 2, name: 'Neha Sharma', age: 22, gender: 'female',
    imageUrl: 'https://randomuser.me/api/portraits/women/22.jpg',
    occupation: 'student', job: 'M.Tech Student',
    location: 'Thiruvananthapuram, Kerala', budget: 8000,
    bio: "Student at CET. I'm friendly, outgoing, and keep my space tidy. I love exploring cafes on weekends.",
    preferences: ['Vegetarian', 'Social', 'Tidy'],
    vibe: { isSmoker: false, isNightOwl: true, cleanliness: 'tidy' }
  },
  {
    id: 3, name: 'Arjun Menon', age: 28, gender: 'male',
    imageUrl: 'https://randomuser.me/api/portraits/men/41.jpg',
    occupation: 'professional', job: 'Graphic Designer',
    location: 'Kochi, Kerala', budget: 12000,
    bio: "Creative professional who loves music and art. I have a cat who is very friendly. Looking for a pet-friendly flatmate.",
    preferences: ['Pet-friendly', 'Creative', 'Social'],
    vibe: { isSmoker: true, isNightOwl: true, cleanliness: 'average' }
  },
];

export default function BrowseRoommatesPage() {
  const [roommates, setRoommates] = useState([]);
  const [filters, setFilters] = useState({
    location: '',
    occupation: 'any',
    budget: 20000,
    gender: 'any'
  });
  const [searchQuery, setSearchQuery] = useState('');
  
  // 2. Get the location object from React Router
  const location = useLocation();

  // 3. This new useEffect checks for passed state when the page loads
  useEffect(() => {
    if (location.state && location.state.location) {
      setFilters(prevFilters => ({
        ...prevFilters,
        location: location.state.location
      }));
    }
  }, [location.state]);


  // This useEffect handles all the filtering logic
  useEffect(() => {
    let filteredList = DUMMY_ROOMMATES;

    if (searchQuery) {
      filteredList = filteredList.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.job.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (filters.location) {
        filteredList = filteredList.filter(p => p.location.toLowerCase().includes(filters.location.toLowerCase()));
    }
    if (filters.occupation !== 'any') {
        filteredList = filteredList.filter(p => p.occupation === filters.occupation);
    }
    if (filters.gender !== 'any') {
        filteredList = filteredList.filter(p => p.gender === filters.gender);
    }
    filteredList = filteredList.filter(p => p.budget <= filters.budget);

    setRoommates(filteredList);
  }, [filters, searchQuery]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} viewMode="grid" setViewMode={() => {}} />
        
        <div className="flex flex-col md:flex-row gap-8 mt-6">
          <aside className="w-full md:w-1/4 lg:w-1/5">
            <RoommateFilterSidebar filters={filters} setFilters={setFilters} />
          </aside>
          
          <main className="w-full md:w-3/4 lg:w-4/5">
            <RoommateGrid roommates={roommates} />
          </main>
        </div>
      </div>
    </div>
  );
}