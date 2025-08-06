import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function MyProfile() {
    const { userInfo } = useAuth(); // Get user info from context

    if (!userInfo) {
        return <div>Loading profile...</div>;
    }

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">My Profile</h2>
            <div className="space-y-4 text-gray-700">
                <div>
                    <span className="font-semibold text-gray-900">Full Name:</span> {userInfo.fullName}
                </div>
                <div>
                    <span className="font-semibold text-gray-900">Email:</span> {userInfo.email}
                </div>
                {/* In a real app, you would fetch and display the full profile from your API */}
                <div className="pt-4">
                    <button className="bg-[#6b2184] text-white px-5 py-2 rounded-md hover:brightness-90 transition-all font-semibold">
                        Edit Profile (Coming Soon)
                    </button>
                </div>
            </div>
        </div>
    );
}
