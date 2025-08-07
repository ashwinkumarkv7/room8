import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import RoommateFilterSidebar from '../components/RoommateFilterSidebar/RoommateFilterSidebar';
import RoommateGrid from '../components/RoommateGrid/RoommateGrid';
import SearchBar from '../components/SearchBar/SearchBar';
import API_URL from '../apiConfig'; // 1. Import the API URL

export default function BrowseRoommatesPage() {
  const [allRoommates, setAllRoommates] = useState([]);
  const [filteredRoommates, setFilteredRoommates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    location: '',
    budget: 25000,
    cleanliness: 'any',
    socialHabits: 'any',
    sleepSchedule: 'any',
  });
  const [searchQuery, setSearchQuery] = useState('');
  
  const location = useLocation();

  // Fetch all user data from the server on initial load
  useEffect(() => {
    const fetchRoommates = async () => {
      try {
        setLoading(true);
        // 2. Use the live server URL from the config file
        const response = await fetch(`${API_URL}/api/users`);
        if (!response.ok) throw new Error('Failed to fetch roommates');
        const data = await response.json();
        setAllRoommates(data);
        setFilteredRoommates(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRoommates();
  }, []);

  // Pre-fill location filter if passed from Hero search
  useEffect(() => {
    if (location.state && location.state.location) {
      setFilters(prevFilters => ({
        ...prevFilters,
        location: location.state.location
      }));
    }
  }, [location.state]);

  // Apply all filters whenever they change
  useEffect(() => {
    let results = allRoommates;

    results = results.filter(p => {
        const searchMatch = !searchQuery || 
            p.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (p.profession && p.profession.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (p.city && p.city.toLowerCase().includes(searchQuery.toLowerCase()));

        const locationMatch = !filters.location || (p.city && p.city.toLowerCase().includes(filters.location.toLowerCase()));
        
        const budgetMatch = !p.budget || p.budget <= filters.budget;

        const cleanlinessMatch = filters.cleanliness === 'any' || p.cleanliness === filters.cleanliness;
        const socialHabitsMatch = filters.socialHabits === 'any' || p.socialHabits === filters.socialHabits;
        const sleepScheduleMatch = filters.sleepSchedule === 'any' || p.sleepSchedule === filters.sleepSchedule;

        return searchMatch && locationMatch && budgetMatch && cleanlinessMatch && socialHabitsMatch && sleepScheduleMatch;
    });

    setFilteredRoommates(results);
  }, [filters, searchQuery, allRoommates]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} viewMode="grid" setViewMode={() => {}} />
        
        <div className="flex flex-col md:flex-row gap-8 mt-6">
          <aside className="w-full md:w-1/4 lg:w-1/5">
            <RoommateFilterSidebar filters={filters} setFilters={setFilters} />
          </aside>
          
          <main className="w-full md:w-3/4 lg:w-4/5">
            {loading ? (
              <p>Loading roommates...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <RoommateGrid roommates={filteredRoommates} />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
