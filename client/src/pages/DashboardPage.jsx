import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DashboardSidebar from '../components/Dashboard/DashboardSidebar';
import { BellIcon, SunIcon, MoonIcon, PlusIcon } from '@heroicons/react/24/outline';

export default function DashboardPage() {
  const { userInfo } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(false); // State for theme toggle

  // In a real app, you would fetch user-specific data here
  const upcomingBookingsCount = 2; // Sample data

  if (!userInfo) {
    return <div>Loading...</div>; // Or a spinner component
  }

  return (
    <div className={`min-h-screen font-sans ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-100 text-gray-800'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {userInfo.fullName.split(' ')[0]} 👋</h1>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              You have {upcomingBookingsCount} upcoming bookings.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
              <BellIcon className="h-6 w-6" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
              {isDarkMode ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
            </button>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar */}
          <aside className="w-full lg:w-1/4 xl:w-1/5">
            <DashboardSidebar />
          </aside>

          {/* Right Content Area */}
          <main className="w-full lg:w-3/4 xl:w-4/5">
            {/* The nested route components (MyProfile, etc.) will be rendered here */}
            <Outlet />
          </main>
        </div>

        {/* Floating Action Button */}
        <button className="fixed bottom-8 right-8 bg-[#6b2184] text-white p-4 rounded-full shadow-lg hover:bg-purple-800 transition-colors">
          <PlusIcon className="h-6 w-6" />
          <span className="sr-only">New Booking</span>
        </button>
      </div>
    </div>
  );
}
