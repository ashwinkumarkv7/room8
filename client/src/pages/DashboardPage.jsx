import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DashboardSidebar from '../components/Dashboard/DashboardSidebar';

export default function DashboardPage() {
  const { userInfo } = useAuth();
  const location = useLocation();

  // State to track screen size for responsive logic
  const [isDesktop, setDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const updateMedia = () => {
      setDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  }, []);

  const isMessagesPage = location.pathname.includes('/dashboard/messages');
  
  // Dark mode is now determined by screen size: true on mobile, false on desktop.
  const isDarkMode = !isDesktop;

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    // The theme is now based on screen size, not a manual state.
    // The text color for the entire page is set here.
    <div className={`min-h-screen font-sans ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-100 text-gray-800'}`}>
      {/* On mobile messages page, remove padding for edge-to-edge view */}
      <div className={`container mx-auto ${isMessagesPage && isDarkMode ? '' : 'px-4 sm:px-6 lg:px-8 py-8 pb-20 lg:pb-8'}`}>
        
        <header className="hidden lg:flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {userInfo.fullName.split(' ')[0]} 👋</h1>
            {/* This text color is for the desktop header, which is in light mode. */}
            <p className="text-sm text-gray-600">
              Manage your profile and connections.
            </p>
          </div>
          {/* The dark mode toggle button has been removed. */}
        </header>

        {/* This flex container fills the screen height on mobile for messages */}
        <div className={`flex flex-col lg:flex-row gap-8 ${isMessagesPage && isDarkMode ? 'h-full' : ''}`}>
          <aside className="w-full lg:w-1/4 xl:w-1/5">
            {/* The sidebar will inherit the text color from the parent div, which is light on mobile. */}
            <DashboardSidebar />
          </aside>

          <main className="w-full lg:w-3/4 xl:w-4/5 flex flex-col flex-grow">
            {(() => {
              if (isMessagesPage) {
                // On desktop, messages are in a full-height light-mode card
                if (isDesktop) {
                  return (
                    <div className="rounded-2xl shadow-md overflow-hidden h-full bg-white">
                      <Outlet />
                    </div>
                  );
                }
                // On mobile, messages are edge-to-edge in dark mode
                return (
                  <div className="h-full bg-gray-800">
                    <Outlet />
                  </div>
                );
              }
              // Other pages get a standard padded card (dark on mobile, light on desktop)
              return (
                // This is the key change: explicitly adding text-white for dark mode
                <div className={`p-8 rounded-2xl shadow-md ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
                  <Outlet />
                </div>
              );
            })()}
          </main>
        </div>
      </div>
    </div>
  );
}