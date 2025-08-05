import React from 'react';
// 1. Removed unnecessary imports like 'Routes' and 'Route'
import { NavLink, Outlet } from 'react-router-dom';
import { UserCircleIcon, Cog6ToothIcon, BookmarkIcon } from '@heroicons/react/24/outline';

// --- Reusable NavLink for the Dashboard Sidebar ---
const DashboardNavLink = ({ to, icon: Icon, children }) => (
    <NavLink
        to={to}
        end // Use 'end' to prevent parent routes from staying active on child routes
        className={({ isActive }) =>
            `flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive ? 'bg-[#6b2184] text-white' : 'text-gray-600 hover:bg-gray-100'
            }`
        }
    >
        <Icon className="h-5 w-5 mr-3" />
        <span>{children}</span>
    </NavLink>
);

export default function DashboardPage() {
    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4 py-12">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* --- Sidebar Navigation --- */}
                    <aside className="w-full md:w-1/4 lg:w-1/5">
                        <div className="bg-white p-4 rounded-lg shadow-sm space-y-2">
                            <DashboardNavLink to="/dashboard" icon={UserCircleIcon}>My Profile</DashboardNavLink>
                            <DashboardNavLink to="/dashboard/saved-items" icon={BookmarkIcon}>Saved Items</DashboardNavLink>
                            <DashboardNavLink to="/dashboard/settings" icon={Cog6ToothIcon}>Account Settings</DashboardNavLink>
                        </div>
                    </aside>

                    {/* --- Main Content Area --- */}
                    <main className="w-full md:w-3/4 lg:w-4/5">
                        <div className="bg-white p-8 rounded-lg shadow-sm">
                            {/* 2. The <Outlet> component correctly renders the nested routes defined in App.jsx */}
                            <Outlet />
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
