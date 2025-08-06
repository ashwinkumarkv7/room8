import React from 'react';
import { MapPinIcon } from '@heroicons/react/24/solid';

// Sample data for bookings
const bookings = [
    { id: 1, roomImage: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267', location: 'Kakkanad, Kochi', checkIn: '2025-08-15', checkOut: '2025-09-15', status: 'Confirmed' },
    { id: 2, roomImage: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb', location: 'Pattoor, Trivandrum', checkIn: '2025-09-01', checkOut: '2025-10-01', status: 'Pending' },
];

const BookingCard = ({ booking }) => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden flex flex-col sm:flex-row">
        <img src={booking.roomImage} alt="Room" className="h-40 w-full sm:w-48 object-cover"/>
        <div className="p-4 flex flex-col justify-between flex-grow">
            <div>
                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 flex items-center"><MapPinIcon className="h-4 w-4 mr-1"/> {booking.location}</p>
                <p className="font-bold mt-1">Check-in: {booking.checkIn}</p>
                <p className="font-bold">Check-out: {booking.checkOut}</p>
            </div>
            <span className={`mt-2 text-xs font-bold px-2 py-1 rounded-full self-start ${booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                {booking.status}
            </span>
        </div>
    </div>
);

export default function UpcomingBookings() {
  return (
    <div>
        <h2 className="text-xl font-bold mb-4">Upcoming Bookings</h2>
        <div className="space-y-4">
            {bookings.map(booking => <BookingCard key={booking.id} booking={booking} />)}
        </div>
    </div>
  );
}
