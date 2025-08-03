import React from 'react';
import { MagnifyingGlassIcon, MapIcon, ViewColumnsIcon } from '@heroicons/react/24/solid';

export default function SearchBar({ searchQuery, setSearchQuery, viewMode, setViewMode }) {
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between items-center p-4 bg-white rounded-lg shadow-sm">
      <div className="relative w-full md:w-auto md:flex-grow">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute top-1/2 left-3 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search by area, city, or keyword..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#6b2184] focus:outline-none"
        />
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-gray-600">View:</span>
        <button
          onClick={() => setViewMode('grid')}
          className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-[#6b2184] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          title="Grid View"
        >
          <ViewColumnsIcon className="h-5 w-5" />
        </button>
        <button
          onClick={() => setViewMode('map')}
          className={`p-2 rounded-md transition-colors ${viewMode === 'map' ? 'bg-[#6b2184] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          title="Map View"
        >
          <MapIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}