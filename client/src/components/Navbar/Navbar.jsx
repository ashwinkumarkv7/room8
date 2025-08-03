import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo/room8-logo.png';
import { Bars3Icon } from '@heroicons/react/24/solid';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Helper function to close the mobile menu when a link is clicked
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Left Section (Logo) */}
        <div className="flex-1 flex justify-start">
          <Link to="/" onClick={handleLinkClick}>
            <img src={logo} alt="Room8 Logo" className="h-10 w-auto" />
          </Link>
        </div>

        {/* Center Section (Nav Links) */}
        <div className="hidden md:flex space-x-8">
          <Link to="/" className="text-[#6b2184] font-semibold">Home</Link>
          <Link to="/browse-rooms" className="text-gray-800 hover:text-[#6b2184] transition-colors duration-300">Browse Rooms</Link>
          <Link to="/browse-roommates" className="text-gray-800 hover:text-[#6b2184] transition-colors duration-300">Browse Roommates</Link>
          <Link to="/about" className="text-gray-800 hover:text-[#6b2184] transition-colors duration-300">About</Link>
        </div>

        {/* Right Section (Buttons & Mobile Toggle) */}
        <div className="flex-1 flex justify-end">
          <div className="flex items-center space-x-4">
            {/* Desktop Buttons */}
            <div className="hidden md:flex items-center space-x-2">
              {/* --- 1. Changed this button to a Link component --- */}
              <Link to="/login" className="bg-[#6b2184] text-white px-5 py-2 rounded-full hover:brightness-90 transition-all font-semibold">Login</Link>
              <Link to="/signup" className="border border-[#6b2184] text-[#6b2184] px-5 py-2 rounded-full hover:bg-[#6b2184] hover:text-white transition-colors font-semibold">Sign Up</Link>
            </div>
            
            {/* Mobile Menu Button */}
            <button className="md:hidden text-gray-800" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white px-4 pt-2 pb-4 space-y-2">
          <Link to="/" className="block text-gray-800 hover:text-[#6b2184] p-2" onClick={handleLinkClick}>Home</Link>
          <Link to="/browse-rooms" className="block text-gray-800 hover:text-[#6b2184] p-2" onClick={handleLinkClick}>Browse Rooms</Link>
          <Link to="/browse-roommates" className="block text-gray-800 hover:text-[#6b2184] p-2" onClick={handleLinkClick}>Browse Roommates</Link>
          <Link to="/about" className="block text-gray-800 hover:text-[#6b2184] p-2" onClick={handleLinkClick}>About</Link>
          <div className="border-t my-2"></div>
          {/* --- 2. Also changed the mobile button to a Link component --- */}
          <Link to="/login" onClick={handleLinkClick} className="block w-full text-center mt-2 bg-[#6b2184] text-white px-4 py-2 rounded-full hover:brightness-90 transition-all">Login</Link>
          <Link to="/signup" onClick={handleLinkClick} className="block w-full text-center mt-2 border border-[#6b2184] text-[#6b2184] px-4 py-2 rounded-full hover:bg-[#6b2184] hover:text-white transition-colors">Sign Up</Link>
        </div>
      )}
    </nav>
  );
}
