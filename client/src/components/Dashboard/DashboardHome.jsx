import React from 'react';
import UpcomingBookings from './UpcomingBookings';
import RecommendedRooms from './RecommendedRooms';

export default function DashboardHome() {
  return (
    <div>
      <UpcomingBookings />
      <RecommendedRooms />
    </div>
  );
}