import React from 'react';
import { HomeIcon, UserIcon, Cog6ToothIcon } from '@heroicons/react/24/solid';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md w-full fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo or Brand Name */}
          <div className="flex items-center space-x-2">
            <HomeIcon className="h-6 w-6 text-blue-600" />
            <span className="font-bold text-xl text-gray-800">MyApp</span>
          </div>

          {/* Nav Items */}
          <div className="hidden md:flex space-x-6">
            <a href="/" className="text-gray-700 hover:text-blue-600 font-medium">Home</a>
            <a href="/about" className="text-gray-700 hover:text-blue-600 font-medium">About</a>
            <a href="/services" className="text-gray-700 hover:text-blue-600 font-medium">Services</a>
            <a href="/contact" className="text-gray-700 hover:text-blue-600 font-medium">Contact</a>
          </div>

          {/* User Icon or Settings */}
          <div className="flex items-center space-x-4">
            <UserIcon className="h-6 w-6 text-gray-600 cursor-pointer" />
            <Cog6ToothIcon className="h-6 w-6 text-gray-600 cursor-pointer" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
