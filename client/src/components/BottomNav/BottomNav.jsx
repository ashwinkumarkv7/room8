import React from 'react';
import { NavLink } from 'react-router-dom';
import { UserCircleIcon, HeartIcon, Cog6ToothIcon, ChatBubbleOvalLeftEllipsisIcon, HomeIcon } from '@heroicons/react/24/solid';

const BottomNavItem = ({ to, icon: Icon, children }) => (
    <NavLink
        to={to}
        end
        className={({ isActive }) => 
            `flex flex-col items-center justify-center w-full pt-2 pb-1 transition-colors ${
                isActive ? 'text-[#6b2184]' : 'text-gray-500 hover:text-[#6b2184]'
            }`
        }
    >
        <Icon className="h-6 w-6 mb-1" />
        <span className="text-xs">{children}</span>
    </NavLink>
);

export default function BottomNav() {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        {/* Updated to a 5-column grid */}
        <div className="grid h-full max-w-lg grid-cols-5 mx-auto font-medium">
            {/* New Home item added */}
            <BottomNavItem to="/discover" icon={HomeIcon}>Home</BottomNavItem>
            <BottomNavItem to="/dashboard" icon={UserCircleIcon}>Profile</BottomNavItem>
            <BottomNavItem to="/dashboard/messages" icon={ChatBubbleOvalLeftEllipsisIcon}>Messages</BottomNavItem>
            <BottomNavItem to="/dashboard/favorites" icon={HeartIcon}>Favorites</BottomNavItem>
            <BottomNavItem to="/dashboard/settings" icon={Cog6ToothIcon}>Settings</BottomNavItem>
        </div>
    </div>
  );
}
