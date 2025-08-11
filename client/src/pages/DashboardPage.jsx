import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DashboardSidebar from '../components/Dashboard/DashboardSidebar';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

export default function DashboardPage() {
  const { userInfo } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(false);

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`min-h-screen font-sans ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-100 text-gray-800'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20 lg:pb-8">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {userInfo.fullName.split(' ')[0]} 👋</h1>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Manage your profile and connections.
            </p>
          </div>
          <div className="flex items-center space-x-4">
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
            <div className={`p-8 rounded-2xl shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <Outlet />
            </div>
          </main>
        </div>

        {/* Floating Action Button has been removed from here */}
        
      </div>
    </div>
  );
}
