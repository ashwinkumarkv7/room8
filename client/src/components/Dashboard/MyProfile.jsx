import React, { useState, useEffect } from 'react';

export default function MyProfile() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (userInfo) {
            // In a real app, you'd fetch the full profile from your API
            // For now, we'll use the data from localStorage
            setUser(userInfo);
        }
    }, []);

    if (!user) {
        return <div>Loading profile...</div>;
    }

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">My Profile</h2>
            <div className="space-y-4">
                <div>
                    <span className="font-semibold">Full Name:</span> {user.fullName}
                </div>
                <div>
                    <span className="font-semibold">Email:</span> {user.email}
                </div>
                {/* Add more profile fields here as needed */}
                <div className="pt-4">
                    <button className="bg-[#6b2184] text-white px-5 py-2 rounded-md hover:brightness-90 transition-all font-semibold">
                        Edit Profile (Coming Soon)
                    </button>
                </div>
            </div>
        </div>
    );
}