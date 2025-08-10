import React, { useState } from 'react'; // 1. Import useState
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindow } from '@react-google-maps/api'; // 2. Import InfoWindow
import { Link } from 'react-router-dom';

const containerStyle = {
  width: '100%',
  height: '600px',
  borderRadius: '0.75rem',
};

const center = {
  lat: 9.9312,
  lng: 76.2673
};

export default function MapView({ listings }) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    // IMPORTANT: Add your Google Maps API key to your client's .env file
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY 
  });

  const [selectedPlace, setSelectedPlace] = useState(null);

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        {listings.map((listing) => (
          // 3. Use the new location.coordinates field from the database
          listing.location?.coordinates?.length === 2 && (
            <MarkerF
              key={listing._id}
              position={{ lat: listing.location.coordinates[1], lng: listing.location.coordinates[0] }}
              onClick={() => setSelectedPlace(listing)}
            />
          )
        ))}

        {selectedPlace && (
            <InfoWindow
                position={{ lat: selectedPlace.location.coordinates[1], lng: selectedPlace.location.coordinates[0] }}
                onCloseClick={() => setSelectedPlace(null)}
            >
                <div className="p-1 max-w-xs">
                    <img src={selectedPlace.imageUrls[0]} alt={selectedPlace.title} className="w-full h-24 object-cover rounded-md mb-2"/>
                    <h3 className="font-bold text-md">{selectedPlace.title}</h3>
                    <p className="text-sm text-gray-600">₹{selectedPlace.price.toLocaleString('en-IN')}/mo</p>
                    <Link to={`/rooms/${selectedPlace.slug}`} className="text-sm font-semibold text-[#6b2184] hover:underline mt-2 inline-block">
                        View Details
                    </Link>
                </div>
            </InfoWindow>
        )}
      </GoogleMap>
  ) : <p>Loading map...</p>
}
