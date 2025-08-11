import React from 'react';
import { NavLink } from 'react-router-dom';
import { UserCircleIcon, HeartIcon, Cog6ToothIcon, ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/solid'; // Using solid icons for better visibility

// --- NavLink for the Desktop Sidebar ---
const DashboardNavLink = ({ to, icon: Icon, children }) => (
  <NavLink
    to={to}
    end
    className={({ isActive }) =>
      `flex items-center px-4 py-3 text-sm font-semibold rounded-lg transition-colors ${
        isActive
          ? 'bg-[#6b2184] text-white shadow-md'
          : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
      }`
    }
  >
    <Icon className="h-5 w-5 mr-3" />
    <span>{children}</span>
  </NavLink>
);

// --- NavLink for the Mobile Bottom Bar ---
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


export default function DashboardSidebar() {
  return (
    <>
      {/* --- Desktop Sidebar (Visible on large screens and up) --- */}
      <div className="hidden lg:block bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md space-y-2">
        <DashboardNavLink to="/dashboard" icon={UserCircleIcon}>My Profile</DashboardNavLink>
        <DashboardNavLink to="/dashboard/messages" icon={ChatBubbleOvalLeftEllipsisIcon}>Messages</DashboardNavLink>
        <DashboardNavLink to="/dashboard/favorites" icon={HeartIcon}>Favorites</DashboardNavLink>
        <DashboardNavLink to="/dashboard/settings" icon={Cog6ToothIcon}>Account Settings</DashboardNavLink>
      </div>

      {/* --- Mobile Bottom Navigation (Visible on screens smaller than lg) --- */}
      <div className="lg:hidden fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
              <BottomNavItem to="/dashboard" icon={UserCircleIcon}>Profile</BottomNavItem>
              <BottomNavItem to="/dashboard/messages" icon={ChatBubbleOvalLeftEllipsisIcon}>Messages</BottomNavItem>
              <BottomNavItem to="/dashboard/favorites" icon={HeartIcon}>Favorites</BottomNavItem>
              <BottomNavItem to="/dashboard/settings" icon={Cog6ToothIcon}>Settings</BottomNavItem>
          </div>
      </div>
    </>
  );
}
