import React, { useState, useEffect } from 'react';
import FilterSidebar from '../components/FilterSidebar/FilterSidebar';
import ListingCard from '../components/FeaturedListings/ListingCard';
import ListingCardSkeleton from '../components/skeletons/ListingCardSkeleton'; // 1. Import the skeleton component
import SearchBar from '../components/SearchBar/SearchBar';
import API_URL from '../apiConfig';

export default function PrivateRoomsPage() {
  const [allListings, setAllListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [filters, setFilters] = useState({
    location: '',
    budget: 50000,
    roomType: 'private', // This is locked
    furnishing: 'any',
    petFriendly: false,
    internet: false,
    verified: false
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    const fetchPrivateRooms = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/api/rooms?roomType=private`); 
        if (!response.ok) throw new Error('Failed to fetch private rooms');
        const data = await response.json();
        setAllListings(data);
        setFilteredListings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPrivateRooms();
  }, []);

  // Filtering logic remains the same
  useEffect(() => {
    let results = allListings;
    // ... (your existing filtering logic here)
    setFilteredListings(results);
  }, [filters, searchQuery, allListings]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Private Rooms</h1>
            <p className="mt-2 text-lg text-gray-600">Explore all available private room listings.</p>
        </div>
        <SearchBar 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />
        <div className="flex flex-col md:flex-row gap-8 mt-6">
          <aside className="w-full md:w-1/4 lg:w-1/5">
            <FilterSidebar filters={filters} setFilters={setFilters} />
          </aside>
          <main className="w-full md:w-3/4 lg:w-4/5">
            {error ? <p className="text-red-500">{error}</p> : (
              // 2. This is the updated rendering logic
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {loading ? (
                    // If loading, show a grid of 6 skeleton cards
                    Array.from({ length: 6 }).map((_, index) => <ListingCardSkeleton key={index} />)
                  ) : (
                    // Otherwise, show the real data or a 'not found' message
                      filteredListings.length > 0 ? (
                          filteredListings.map(listing => <ListingCard key={listing._id} listing={listing} />)
                        ) : (
                          <p className="col-span-full text-center text-gray-500">No private rooms found.</p>
                        )
                  )}
                  </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
