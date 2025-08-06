import React from 'react';
import { NavLink } from 'react-router-dom';
import { UserCircleIcon, CalendarDaysIcon, HeartIcon, BellIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

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

export default function DashboardSidebar() {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md space-y-2">
      <DashboardNavLink to="/dashboard" icon={UserCircleIcon}>My Profile</DashboardNavLink>
      <DashboardNavLink to="/dashboard/bookings" icon={CalendarDaysIcon}>My Bookings</DashboardNavLink>
      <DashboardNavLink to="/dashboard/favorites" icon={HeartIcon}>Favorites</DashboardNavLink>
      <DashboardNavLink to="/dashboard/notifications" icon={BellIcon}>Notifications</DashboardNavLink>
      <DashboardNavLink to="/dashboard/settings" icon={Cog6ToothIcon}>Account Settings</DashboardNavLink>
    </div>
  );
}
