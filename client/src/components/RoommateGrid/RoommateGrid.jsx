import React from 'react';
import RoommateCard from '../RoommateCard/RoommateCard';

export default function RoommateGrid({ roommates }) {
  if (!roommates || roommates.length === 0) {
    return <p className="text-center text-gray-500 mt-10">No roommates found. Try adjusting your filters.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {roommates.map(person => (
        <RoommateCard key={person.id} person={person} />
      ))}
    </div>
  );
}