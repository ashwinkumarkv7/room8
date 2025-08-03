import React from 'react';

// A reusable component for each filter section
const FilterSection = ({ title, children }) => (
  <div className="py-4 border-b border-gray-200">
    <h3 className="font-semibold text-gray-800 mb-3">{title}</h3>
    {children}
  </div>
);

export default function FilterSidebar({ filters, setFilters }) {
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4">Filters</h2>
      
      <FilterSection title="Location">
        <input type="text" name="location" placeholder="e.g., Thiruvananthapuram" className="w-full p-2 border border-gray-300 rounded-md" />
      </FilterSection>

      <FilterSection title={`Budget (Max: ₹${filters.budget}/mo)`}>
        <input type="range" name="budget" min="1000" max="50000" step="1000" value={filters.budget} onChange={handleInputChange} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#6b2184]" />
      </FilterSection>

      <FilterSection title="Room Type">
        <select name="roomType" value={filters.roomType} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md">
          <option value="any">Any</option>
          <option value="private">Private Room</option>
          <option value="shared">Shared Room</option>
          <option value="1bhk">1BHK</option>
        </select>
      </FilterSection>

      <FilterSection title="Furnishing">
        {/* Checkbox implementation for Furnishing */}
        <div className="space-y-2">
            <label className="flex items-center"><input type="radio" name="furnishing" value="any" checked={filters.furnishing === 'any'} onChange={handleInputChange} className="mr-2 accent-[#6b2184]" /> Any</label>
            <label className="flex items-center"><input type="radio" name="furnishing" value="furnished" checked={filters.furnishing === 'furnished'} onChange={handleInputChange} className="mr-2 accent-[#6b2184]" /> Furnished</label>
            <label className="flex items-center"><input type="radio" name="furnishing" value="unfurnished" checked={filters.furnishing === 'unfurnished'} onChange={handleInputChange} className="mr-2 accent-[#6b2184]" /> Unfurnished</label>
        </div>
      </FilterSection>

      <FilterSection title="Options">
          <div className="space-y-2">
              <label className="flex items-center"><input type="checkbox" name="petFriendly" checked={filters.petFriendly} onChange={handleInputChange} className="mr-2 h-4 w-4 rounded border-gray-300 text-[#6b2184] focus:ring-[#6b2184]" /> Pet Friendly</label>
              <label className="flex items-center"><input type="checkbox" name="internet" checked={filters.internet} onChange={handleInputChange} className="mr-2 h-4 w-4 rounded border-gray-300 text-[#6b2184] focus:ring-[#6b2184]" /> Internet Included</label>
              <label className="flex items-center"><input type="checkbox" name="verified" checked={filters.verified} onChange={handleInputChange} className="mr-2 h-4 w-4 rounded border-gray-300 text-[#6b2184] focus:ring-[#6b2184]" /> Verified Only</label>
          </div>
      </FilterSection>
    </div>
  );
}