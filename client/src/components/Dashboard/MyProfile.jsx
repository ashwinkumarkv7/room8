import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function MyProfile() {
    const { userInfo } = useAuth(); // Get user info from context

    // Determine if it's a mobile device (for dark mode)
    const [isDesktop, setDesktop] = useState(window.innerWidth >= 1024);

    useEffect(() => {
        const updateMedia = () => {
            setDesktop(window.innerWidth >= 1024);
        };
        window.addEventListener('resize', updateMedia);
        return () => window.removeEventListener('resize', updateMedia);
    }, []);

    const isDarkMode = !isDesktop;

    if (!userInfo) {
        return <div>Loading profile...</div>;
    }

    // Define text color classes based on the theme
    const textColorClass = isDarkMode ? 'text-gray-200' : 'text-gray-700';
    const headingColorClass = isDarkMode ? 'text-white' : 'text-gray-800';
    const strongTextColorClass = isDarkMode ? 'text-gray-100' : 'text-gray-900';

    return (
        <div>
            <h2 className={`text-2xl font-bold mb-6 ${headingColorClass}`}>My Profile</h2>
            <div className={`space-y-4 ${textColorClass}`}>
                <div>
                    <span className={`font-semibold ${strongTextColorClass}`}>Full Name:</span> {userInfo.fullName}
                </div>
                <div>
                    <span className={`font-semibold ${strongTextColorClass}`}>Email:</span> {userInfo.email}
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