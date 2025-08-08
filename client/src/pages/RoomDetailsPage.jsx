import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API_URL from '../apiConfig';
import { MapPinIcon, StarIcon, ShieldCheckIcon, WifiIcon, BoltIcon } from '@heroicons/react/24/solid';

// The component code remains the same
function RoomDetailsPage() {
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/api/rooms/${id}`);
        if (!response.ok) {
          throw new Error('Room not found');
        }
        const data = await response.json();
        setRoom(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRoomDetails();
  }, [id]);

  if (loading) return <div className="text-center py-20">Loading room details...</div>;
  if (error) return <div className="text-center py-20 text-red-500">Error: {error}</div>;
  if (!room) return <div className="text-center py-20">Room not found.</div>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Image Gallery */}
        <div className="mb-8">
          <img src={room.imageUrl} alt={room.title} className="w-full h-[500px] object-cover rounded-2xl shadow-lg" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Details */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-2xl shadow-md">
              <h1 className="text-3xl font-bold text-gray-900">{room.title}</h1>
              <p className="text-gray-500 flex items-center mt-2">
                <MapPinIcon className="h-5 w-5 mr-2" />
                {room.area}, {room.city}
              </p>
              <div className="border-t border-gray-200 my-6"></div>
              <h2 className="text-xl font-bold text-gray-800 mb-4">About this space</h2>
              <p className="text-gray-600 leading-relaxed">
                {room.description || "The lister hasn't added a detailed description yet. Contact them for more information about the space and amenities."}
              </p>
              <div className="border-t border-gray-200 my-6"></div>
              <h2 className="text-xl font-bold text-gray-800 mb-4">Amenities</h2>
              <div className="flex flex-wrap gap-4">
                {room.features.map(feature => (
                  <span key={feature} className="bg-purple-100 text-[#6b2184] font-semibold px-4 py-2 rounded-full">{feature}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Booking & Lister Info */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-md sticky top-24">
              <p className="text-3xl font-bold">₹{room.price.toLocaleString('en-IN')} <span className="text-lg font-normal text-gray-500">/ month</span></p>
              <div className="border-t border-gray-200 my-4"></div>
              <div className="flex items-center">
                <img src={room.postedBy.imageUrl} alt={room.postedBy.name} className="h-16 w-16 rounded-full object-cover mr-4" />
                <div>
                  <p className="text-sm text-gray-500">Hosted by</p>
                  <p className="font-bold text-lg">{room.postedBy.name}</p>
                  <div className="flex items-center text-sm">
                    <StarIcon className="h-4 w-4 text-yellow-400 mr-1" />
                    <span>{room.postedBy.rating}</span>
                  </div>
                </div>
              </div>
              <button className="mt-6 w-full bg-[#6b2184] text-white py-3 rounded-lg font-semibold text-lg hover:brightness-90 transition-all">
                Request to Connect
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- This is the missing line that fixes the error ---
export default RoomDetailsPage;
