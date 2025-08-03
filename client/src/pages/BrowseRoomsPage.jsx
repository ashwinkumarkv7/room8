import React, { useState, useEffect } from 'react';
import FilterSidebar from '../components/FilterSidebar/FilterSidebar';
import ResultsGrid from '../components/ResultsGrid/ResultsGrid';
import SearchBar from '../components/SearchBar/SearchBar';

// --- 1. Updated Sample Data with More Properties ---
// We need to add properties like roomType, furnishing, petFriendly, etc., to filter by them.
const DUMMY_LISTINGS = [
  {
    id: 1,
    imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80",
    price: 8500,
    title: "1BHK near Infopark",
    area: "Kakkanad",
    city: "Kochi",
    postedBy: { name: "Anjali", imageUrl: "https://randomuser.me/api/portraits/women/4.jpg", rating: 4.5 },
    features: ["AC", "Wi-Fi", "Attached Bath"],
    roomType: '1bhk',
    furnishing: 'furnished',
    petFriendly: true,
    internet: true,
    verified: true
  },
  {
    id: 2,
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80",
    price: 6000,
    title: "Shared Room for Students",
    area: "Pattoor",
    city: "Thiruvananthapuram",
    postedBy: { name: "Rohan", imageUrl: "https://randomuser.me/api/portraits/men/11.jpg", rating: 5 },
    features: ["Wi-Fi", "Parking"],
    roomType: 'shared',
    furnishing: 'unfurnished',
    petFriendly: false,
    internet: true,
    verified: false
  },
  {
    id: 3,
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80",
    price: 12000,
    title: "Furnished Private Room",
    area: "Panampilly Nagar",
    city: "Kochi",
    postedBy: { name: "Priya", imageUrl: "https://randomuser.me/api/portraits/women/14.jpg", rating: 4 },
    features: ["Furnished", "AC", "Wi-Fi"],
    roomType: 'private',
    furnishing: 'furnished',
    petFriendly: false,
    internet: true,
    verified: true
  },
  {
    id: 4,
    imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80",
    price: 35000,
    title: "Spacious Apartment downtown",
    area: "MG Road",
    city: "Kochi",
    postedBy: { name: "Vikram", imageUrl: "https://randomuser.me/api/portraits/men/18.jpg", rating: 4.8 },
    features: ["Parking", "AC", "Wi-Fi"],
    roomType: '1bhk',
    furnishing: 'furnished',
    petFriendly: true,
    internet: true,
    verified: true
  }
];

export default function BrowseRoomsPage() {
  const [listings, setListings] = useState([]);
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

  // --- 2. Added Filtering Logic ---
  // This useEffect hook runs every time the filters or search query change.
  useEffect(() => {
    let filteredListings = DUMMY_LISTINGS;

    // Filter by Search Query
    if (searchQuery) {
      filteredListings = filteredListings.filter(listing =>
        listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.city.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by Budget
    filteredListings = filteredListings.filter(listing => listing.price <= filters.budget);

    // Filter by Room Type
    if (filters.roomType !== 'any') {
      filteredListings = filteredListings.filter(listing => listing.roomType === filters.roomType);
    }

    // Filter by Furnishing
    if (filters.furnishing !== 'any') {
      filteredListings = filteredListings.filter(listing => listing.furnishing === filters.furnishing);
    }

    // Filter by Options (checkboxes)
    if (filters.petFriendly) {
      filteredListings = filteredListings.filter(listing => listing.petFriendly === true);
    }
    if (filters.internet) {
      filteredListings = filteredListings.filter(listing => listing.internet === true);
    }
    if (filters.verified) {
      filteredListings = filteredListings.filter(listing => listing.verified === true);
    }

    // Update the state with the final filtered list
    setListings(filteredListings);

  }, [filters, searchQuery]); // The dependency array ensures this runs on change

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
            {viewMode === 'grid' ? (
              <ResultsGrid listings={listings} />
            ) : (
              <div className="h-[600px] bg-gray-300 rounded-lg flex items-center justify-center">
                <p className="text-gray-600">Map View Placeholder</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}