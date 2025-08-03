import React from 'react';
import RoomCard from '../RoomCard/RoomCard';

export default function ResultsGrid({ listings }) {
  if (!listings || listings.length === 0) {
    return <p className="text-center text-gray-500">No rooms found. Try adjusting your filters.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {listings.map(listing => (
        <RoomCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
}