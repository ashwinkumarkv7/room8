import React from 'react';

const FilterSection = ({ title, children }) => (
  <div className="py-4 border-b border-gray-200">
    <h3 className="font-semibold text-gray-800 mb-3">{title}</h3>
    {children}
  </div>
);

export default function RoommateFilterSidebar({ filters, setFilters }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4">Find Roommates</h2>
      
      <FilterSection title="Preferred Location">
        <input type="text" name="location" value={filters.location} onChange={handleChange} placeholder="e.g., Kochi" className="w-full p-2 border border-gray-300 rounded-md" />
      </FilterSection>

      <FilterSection title={`Budget (Max: ₹${Number(filters.budget).toLocaleString('en-IN')})`}>
        <input type="range" name="budget" min="5000" max="25000" step="1000" value={filters.budget} onChange={handleChange} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#6b2184]" />
      </FilterSection>

      <FilterSection title="Occupation">
        <select name="occupation" value={filters.occupation} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md">
          <option value="any">Any</option>
          <option value="student">Student</option>
          <option value="professional">Working Professional</option>
        </select>
      </FilterSection>

      <FilterSection title="Preferred Gender">
        <select name="gender" value={filters.gender} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md">
          <option value="any">Any</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </FilterSection>
    </div>
  );
}