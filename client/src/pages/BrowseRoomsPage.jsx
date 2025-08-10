import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FilterSidebar from '../components/FilterSidebar/FilterSidebar';
import SearchBar from '../components/SearchBar/SearchBar';
import ListingCard from '../components/FeaturedListings/ListingCard'; // Using the correct, robust ListingCard
import MapView from '../components/MapView/MapView';
import API_URL from '../apiConfig';

export default function BrowseRoomsPage() {
  const [allListings, setAllListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [filters, setFilters] = useState({
    location: '',
    budget: 50000,
    roomType: 'any',
    furnishing: 'any',
    petFriendly: false,
    internet: false,
    verified: false
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  
  const location = useLocation();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/api/rooms`);
        if (!response.ok) throw new Error('Failed to fetch rooms');
        const data = await response.json();
        setAllListings(data);
        setFilteredListings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  useEffect(() => {
    if (location.state && location.state.location) {
      setFilters(prevFilters => ({
        ...prevFilters,
        location: location.state.location
      }));
    }
  }, [location.state]);

  // --- This is the updated, more robust filtering logic ---
  useEffect(() => {
    let results = allListings;

    // Filter by Search Query (safe check)
    if (searchQuery) {
      results = results.filter(listing =>
        (listing.title && listing.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (listing.area && listing.area.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (listing.city && listing.city.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Filter by Location (safe check)
    if (filters.location) {
      results = results.filter(listing =>
        (listing.city && listing.city.toLowerCase().includes(filters.location.toLowerCase())) ||
        (listing.area && listing.area.toLowerCase().includes(filters.location.toLowerCase()))
      );
    }

    // Filter by Budget (safe check)
    results = results.filter(listing => listing.price ? listing.price <= filters.budget : true);

    // Filter by Room Type (safe check)
    if (filters.roomType !== 'any') {
      results = results.filter(listing => listing.roomType === filters.roomType);
    }

    // Filter by Furnishing (safe check)
    if (filters.furnishing !== 'any') {
      results = results.filter(listing => listing.furnishing === filters.furnishing);
    }

    // Filter by Booleans (safe check)
    if (filters.petFriendly) {
      results = results.filter(listing => listing.petFriendly === true);
    }
    if (filters.internet) {
      results = results.filter(listing => listing.internet === true);
    }
    if (filters.verified) {
      results = results.filter(listing => listing.verified === true);
    }

    setFilteredListings(results);

  }, [filters, searchQuery, allListings]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
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
            {loading ? (
              <p>Loading rooms...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredListings.length > 0 ? (
                  filteredListings.map(listing => (
                    <ListingCard key={listing._id} listing={listing} />
                  ))
                ) : (
                  <p className="col-span-full text-center text-gray-500">No rooms found. Try adjusting your filters.</p>
                )}
              </div>
            ) : (
              <MapView listings={filteredListings} />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
