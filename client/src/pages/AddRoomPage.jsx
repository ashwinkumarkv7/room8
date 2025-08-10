import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API_URL from '../apiConfig';
import { PhotoIcon, XCircleIcon, PlusIcon } from '@heroicons/react/24/solid';

// --- Pre-defined list of common amenities ---
const AMENITY_OPTIONS = [
    'Wi-Fi', 'AC', 'Attached Bathroom', 'Furnished', 'Parking', 
    'Utilities Included', 'Washing Machine', 'Kitchen Access', 'TV'
];

// Reusable form components
const Section = ({ title, description, children }) => (
    <div className="py-8 border-b border-gray-200 last:border-b-0">
        <div>
            <h3 className="text-xl font-bold leading-6 text-gray-900">{title}</h3>
            <p className="mt-1 text-sm text-gray-500">{description}</p>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">{children}</div>
    </div>
);
const FormField = ({ id, label, children, className = "sm:col-span-3" }) => (
    <div className={className}>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
        <div className="mt-1">{children}</div>
    </div>
);
const inputStyles = "block w-full rounded-lg border-2 border-gray-300 shadow-md focus:border-[#6A2083] focus:ring-4 focus:ring-[#6A2083]/20 sm:text-sm p-3 transition-all duration-200";

export default function AddRoomPage() {
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  const [roomData, setRoomData] = useState({
    title: '',
    description: '',
    city: '',
    area: '',
    price: '',
    features: [],
    // roomType has been removed
  });
  const [roomImageFiles, setRoomImageFiles] = useState([]);
  const [roomImagePreviews, setRoomImagePreviews] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRoomData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setRoomImageFiles(prev => [...prev, ...files]);
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setRoomImagePreviews(prev => [...prev, ...newPreviews]);
    }
  };
  
  const removeImage = (indexToRemove) => {
      setRoomImageFiles(prev => prev.filter((_, index) => index !== indexToRemove));
      setRoomImagePreviews(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleFeatureToggle = (feature) => {
    setRoomData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (roomImageFiles.length === 0) {
        throw new Error("Please upload at least one image for the room.");
      }

      const imageFormData = new FormData();
      roomImageFiles.forEach(file => {
          imageFormData.append('roomImages', file);
      });

      const uploadRes = await fetch(`${API_URL}/api/upload/room-images`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${userInfo.token}` },
        body: imageFormData,
      });
      const uploadData = await uploadRes.json();
      if (!uploadRes.ok) throw new Error(uploadData.message || 'Image upload failed');
      
      const finalRoomData = {
        ...roomData,
        imageUrls: uploadData.imageUrls,
      };

      const createRoomRes = await fetch(`${API_URL}/api/rooms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify(finalRoomData),
      });

      const newRoom = await createRoomRes.json();
      if (!createRoomRes.ok) throw new Error(newRoom.message || 'Failed to create room');

      alert('Room listed successfully!');
      navigate(`/rooms/${newRoom.slug}`);

    } catch (err) {
      setError(err.message);
      console.error("Failed to add room:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
          <h1 className="text-3xl font-bold text-gray-900">List Your Room</h1>
          <p className="mt-2 text-gray-600">Fill out the details below to find your next roommate.</p>

          <form onSubmit={handleSubmit} className="mt-8">
            {error && <div className="mb-6 text-center text-sm text-red-600 bg-red-100 p-3 rounded-md">{error}</div>}

            <Section title="Basic Information" description="Start with the essentials.">
              <FormField id="title" label="Listing Title" className="sm:col-span-6">
                <input type="text" name="title" value={roomData.title} onChange={handleInputChange} className={inputStyles} placeholder="e.g., Cozy Private Room in Kakkanad" required />
              </FormField>
              <FormField id="description" label="Description" className="sm:col-span-6">
                <textarea name="description" rows={4} value={roomData.description} onChange={handleInputChange} className={inputStyles} placeholder="Describe your room, the apartment, and the neighborhood." required></textarea>
              </FormField>
            </Section>

            <Section title="Location & Price" description="Where is the room and what is the rent?">
              <FormField id="city" label="City"><input type="text" name="city" value={roomData.city} onChange={handleInputChange} className={inputStyles} required /></FormField>
              <FormField id="area" label="Area / Locality"><input type="text" name="area" value={roomData.area} onChange={handleInputChange} className={inputStyles} required /></FormField>
              <FormField id="price" label="Monthly Rent (₹)" className="sm:col-span-6"><input type="number" name="price" value={roomData.price} onChange={handleInputChange} className={inputStyles} required /></FormField>
            </Section>
            
            <Section title="Amenities" description="Select all the amenities your place offers.">
                <FormField className="sm:col-span-6">
                    <div className="flex flex-wrap gap-3">
                        {AMENITY_OPTIONS.map(feature => (
                            <button 
                                type="button" 
                                key={feature} 
                                onClick={() => handleFeatureToggle(feature)}
                                className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${
                                    roomData.features.includes(feature) 
                                    ? 'bg-[#6b2184] text-white ring-2 ring-offset-2 ring-[#6b2184]' 
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {feature}
                            </button>
                        ))}
                    </div>
                </FormField>
            </Section>

            <Section title="Room Images" description="Upload multiple photos. The first image will be the main cover photo.">
              <FormField label="Upload photos" className="sm:col-span-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {roomImagePreviews.map((previewUrl, index) => (
                    <div key={index} className="relative aspect-square">
                      <img src={previewUrl} alt={`Room preview ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
                      <button type="button" onClick={() => removeImage(index)} className="absolute top-1 right-1 bg-white/70 rounded-full p-0.5 text-gray-700 hover:text-red-600">
                        <XCircleIcon className="h-6 w-6" />
                      </button>
                    </div>
                  ))}
                  <label htmlFor="roomImage" className="flex items-center justify-center w-full aspect-square rounded-lg border-2 border-dashed border-gray-300 text-gray-400 hover:border-[#6b2184] hover:text-[#6b2184] cursor-pointer transition-colors">
                    <div className="text-center">
                      <PlusIcon className="h-8 w-8 mx-auto" />
                      <span className="mt-1 text-sm">Add photos</span>
                    </div>
                    <input id="roomImage" name="roomImage" type="file" accept="image/*" multiple onChange={handleFileChange} className="sr-only" />
                  </label>
                </div>
              </FormField>
            </Section>

            <div className="pt-8 flex justify-end">
              <button type="submit" disabled={loading} className="bg-[#6b2184] text-white px-8 py-3 rounded-lg font-semibold hover:brightness-90 disabled:opacity-50 text-base">
                  {loading ? 'Listing Room...' : 'List My Room'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
