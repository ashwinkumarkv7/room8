import React from 'react';

const FilterSection = ({ title, children }) => (
  <div className="py-4 border-b border-gray-200 last:border-b-0">
    <h3 className="font-semibold text-gray-800 mb-3">{title}</h3>
    {children}
  </div>
);

const FilterSelect = ({ name, value, onChange, options }) => (
    <select name={name} value={value} onChange={onChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#6b2184] focus:outline-none">
        {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
    </select>
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
        <input type="range" name="budget" min="5000" max="50000" step="1000" value={filters.budget} onChange={handleChange} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#6b2184]" />
      </FilterSection>

      <FilterSection title="Lifestyle Match">
        <div className="space-y-4">
            <div>
                <label className="text-sm font-medium text-gray-700">Cleanliness</label>
                <FilterSelect name="cleanliness" value={filters.cleanliness} onChange={handleChange} options={[
                    { value: 'any', label: 'Any' }, { value: 'tidy', label: 'Very Tidy' },
                    { value: 'average', label: 'Average' }, { value: 'relaxed', label: 'Relaxed' }
                ]} />
            </div>
            <div>
                <label className="text-sm font-medium text-gray-700">Social Habits</label>
                <FilterSelect name="socialHabits" value={filters.socialHabits} onChange={handleChange} options={[
                    { value: 'any', label: 'Any' }, { value: 'often', label: 'Often Social' },
                    { value: 'occasionally', label: 'Occasionally Social' }, { value: 'rarely', label: 'Mostly Private' }
                ]} />
            </div>
            <div>
                <label className="text-sm font-medium text-gray-700">Sleep Schedule</label>
                <FilterSelect name="sleepSchedule" value={filters.sleepSchedule} onChange={handleChange} options={[
                    { value: 'any', label: 'Any' }, { value: 'early_bird', label: 'Early Bird' },
                    { value: 'night_owl', label: 'Night Owl' }
                ]} />
            </div>
        </div>
      </FilterSection>
    </div>
  );
}
