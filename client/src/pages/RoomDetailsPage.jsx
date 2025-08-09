import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API_URL from '../apiConfig';
import { MapPinIcon, StarIcon, SparklesIcon, UserGroupIcon, ClockIcon, NoSymbolIcon } from '@heroicons/react/24/solid';

// --- Lister Profile Card for Shared Rooms ---
const ListerProfileCard = ({ lister }) => {
    const formatText = (text) => text ? text.charAt(0).toUpperCase() + text.slice(1) : 'Not set';

    return (
        <div className="mt-8 pt-6 border-t border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4">About Your Potential Roommate</h2>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <div className="flex items-center mb-4">
                    <img 
                        src={lister.profilePic} 
                        alt={lister.fullName} 
                        className="h-16 w-16 rounded-full object-cover mr-4"
                        onError={(e) => { e.target.onerror = null; e.target.src=`https://ui-avatars.com/api/?name=${lister.fullName}&background=6b2184&color=fff` }}
                    />
                    <div>
                        <p className="font-bold text-lg text-gray-900">{lister.fullName}</p>
                        <p className="text-sm text-gray-600">{lister.profession || 'Profession not set'}</p>
                    </div>
                </div>
                <p className="italic text-gray-600 mb-4">"{lister.bio || 'No bio provided.'}"</p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center"><SparklesIcon className="h-5 w-5 mr-2 text-gray-400"/> Cleanliness: <span className="font-semibold ml-1">{formatText(lister.cleanliness)}</span></div>
                    <div className="flex items-center"><UserGroupIcon className="h-5 w-5 mr-2 text-gray-400"/> Social: <span className="font-semibold ml-1">{formatText(lister.socialHabits)}</span></div>
                    <div className="flex items-center"><ClockIcon className="h-5 w-5 mr-2 text-gray-400"/> Schedule: <span className="font-semibold ml-1">{formatText(lister.sleepSchedule)}</span></div>
                    <div className="flex items-center"><NoSymbolIcon className="h-5 w-5 mr-2 text-gray-400"/> Smoking: <span className="font-semibold ml-1">{formatText(lister.smoking)}</span></div>
                </div>

                {lister.hobbies && lister.hobbies.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                         <h4 className="text-sm font-semibold text-gray-800 mb-2">Interests</h4>
                         <div className="flex flex-wrap gap-2">
                            {lister.hobbies.map(hobby => (
                                <span key={hobby} className="text-xs bg-purple-100 text-[#6b2184] font-semibold px-2 py-1 rounded-full">{hobby}</span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};


export default function RoomDetailsPage() {
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { slug } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/api/rooms/${slug}`);
        if (!response.ok) throw new Error('Room not found');
        const data = await response.json();
        setRoom(data);
        
        // --- This is the corrected logic ---
        // It now checks for the new 'imageUrls' array first,
        // then falls back to the old 'imageUrl' string.
        if (data.imageUrls && data.imageUrls.length > 0) {
            setSelectedImage(data.imageUrls[0]);
        } else if (data.imageUrl) {
            setSelectedImage(data.imageUrl);
        }

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (slug) {
        fetchRoomDetails();
    }
  }, [slug]);

  if (loading) return <div className="text-center py-20">Loading room details...</div>;
  if (error) return <div className="text-center py-20 text-red-500">Error: {error}</div>;
  if (!room) return <div className="text-center py-20">Room not found.</div>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="mb-8">
            <img 
                src={selectedImage || 'https://placehold.co/1200x500/6b2184/FFFFFF?text=Image+Not+Available'} 
                alt={room.title} 
                className="w-full h-[500px] object-cover rounded-2xl shadow-lg mb-4" 
            />
            {/* The thumbnail gallery will only show for new listings with multiple images */}
            {room.imageUrls && room.imageUrls.length > 1 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
                    {room.imageUrls.map((url, index) => (
                        <img 
                            key={index}
                            src={url}
                            alt={`Room thumbnail ${index + 1}`}
                            onClick={() => setSelectedImage(url)}
                            className={`w-full h-24 object-cover rounded-lg cursor-pointer transition-all duration-200 ${selectedImage === url ? 'ring-4 ring-[#6b2184]' : 'opacity-70 hover:opacity-100'}`}
                        />
                    ))}
                </div>
            )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-2xl shadow-md">
              <h1 className="text-3xl font-bold text-gray-900">{room.title}</h1>
              <p className="text-gray-500 flex items-center mt-2"><MapPinIcon className="h-5 w-5 mr-2" />{room.area}, {room.city}</p>
              <div className="border-t my-6"></div>
              <h2 className="text-xl font-bold text-gray-800 mb-4">About this space</h2>
              <p className="text-gray-600 leading-relaxed">{room.description || "No detailed description provided."}</p>
              <div className="border-t my-6"></div>
              <h2 className="text-xl font-bold text-gray-800 mb-4">Amenities</h2>
              <div className="flex flex-wrap gap-4">
                {room.features.map(feature => (
                  <span key={feature} className="bg-purple-100 text-[#6b2184] font-semibold px-4 py-2 rounded-full">{feature}</span>
                ))}
              </div>
              {room.roomType === 'shared' && room.postedBy && <ListerProfileCard lister={room.postedBy} />}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-md sticky top-24">
              <p className="text-3xl font-bold">₹{room.price.toLocaleString('en-IN')} <span className="text-lg font-normal text-gray-500">/ month</span></p>
              <div className="border-t my-4"></div>
              {room.postedBy ? (
                <div className="flex items-center">
                    <img 
                        src={room.postedBy.profilePic} 
                        alt={room.postedBy.fullName} 
                        className="h-16 w-16 rounded-full object-cover mr-4"
                        onError={(e) => { e.target.onerror = null; e.target.src=`https://ui-avatars.com/api/?name=${room.postedBy.fullName}&background=6b2184&color=fff` }}
                    />
                    <div>
                        <p className="text-sm text-gray-500">Hosted by</p>
                        <p className="font-bold text-lg">{room.postedBy.fullName}</p>
                    </div>
                </div>
              ) : (
                <p>Lister information not available.</p>
              )}
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
