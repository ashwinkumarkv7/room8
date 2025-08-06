import React from 'react';

// Sample data for recommendations
const recommendations = [
    { id: 1, image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6', title: 'Modern Downtown Loft', location: 'Kochi', price: 12000 },
    { id: 2, image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c', title: 'Cozy Beachside Room', location: 'Thiruvananthapuram', price: 7500 },
    { id: 3, image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45', title: 'Serene Garden View Flat', location: 'Kochi', price: 9000 },
];

const RecommendedCard = ({ room }) => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden">
        <img src={room.image} alt={room.title} className="h-40 w-full object-cover"/>
        <div className="p-4">
            <h3 className="font-bold">{room.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{room.location}</p>
            <div className="flex justify-between items-center mt-4">
                <p className="font-bold text-lg text-[#6b2184]">₹{room.price.toLocaleString('en-IN')}<span className="text-xs font-normal text-gray-500">/mo</span></p>
                <button className="bg-[#6b2184] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:brightness-90 transition-all">
                    Book Now
                </button>
            </div>
        </div>
    </div>
);

export default function RecommendedRooms() {
    return (
        <div className="mt-12">
            <h2 className="text-xl font-bold mb-4">Recommended For You</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {recommendations.map(room => <RecommendedCard key={room.id} room={room} />)}
            </div>
        </div>
    );
}
