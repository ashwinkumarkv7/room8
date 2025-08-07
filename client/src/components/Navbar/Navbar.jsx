import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/logo/room8-logo.png';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

// Custom NavLink component for the underline hover effect
const CustomNavLink = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `relative font-bold tracking-tight transition-colors duration-300 ${
        isActive ? 'text-[#6b2184]' : 'text-gray-500 hover:text-[#6b2184]'
      } after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] after:w-0 after:bg-[#6b2184] after:transition-all after:duration-300 hover:after:w-full`
    }
  >
    {children}
  </NavLink>
);

export default function ModernNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/" onClick={handleLinkClick}>
            <img src={logo} alt="Room8 Logo" className="h-10 w-auto" />
          </Link>
        </div>

        {/* Desktop Navigation Links (Centered) */}
        <div className="hidden md:flex flex-1 justify-center items-center space-x-8">
          <CustomNavLink to="/">Home</CustomNavLink>
          <CustomNavLink to="/browse-rooms">Browse Rooms</CustomNavLink>
          <CustomNavLink to="/browse-roommates">Browse Roommates</CustomNavLink>
          <CustomNavLink to="/about">About</CustomNavLink>
        </div>

        {/* Login and Mobile Toggle */}
        <div className="hidden md:flex flex-shrink-0 items-center space-x-4">
          <Link to="/login" className="font-bold text-gray-800 hover:text-[#6b2184] transition-colors tracking-tight">
            Login
          </Link>
          <Link to="/signup" className="bg-[#6b2184] text-white px-5 py-2 rounded-full hover:brightness-90 transition-all font-semibold">
            Sign Up
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-800">
            {isMenuOpen ? <XMarkIcon className="h-7 w-7" /> : <Bars3Icon className="h-7 w-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white px-6 pb-6 pt-2 space-y-4">
          <Link to="/" className="block text-gray-800 hover:text-[#6b2184] font-bold p-2" onClick={handleLinkClick}>Home</Link>
          <Link to="/browse-rooms" className="block text-gray-800 hover:text-[#6b2184] font-bold p-2" onClick={handleLinkClick}>Browse Rooms</Link>
          {/* --- Added the "Browse Roommates" link back to the mobile menu --- */}
          <Link to="/browse-roommates" className="block text-gray-800 hover:text-[#6b2184] font-bold p-2" onClick={handleLinkClick}>Browse Roommates</Link>
          <Link to="/add-room" className="block text-gray-800 hover:text-[#6b2184] font-bold p-2" onClick={handleLinkClick}>Add Room</Link>
          <Link to="/about" className="block text-gray-800 hover:text-[#6b2184] font-bold p-2" onClick={handleLinkClick}>About</Link>
          <div className="border-t border-gray-200 pt-4 space-y-4">
            <Link to="/login" onClick={handleLinkClick} className="block w-full text-center bg-[#6b2184] text-white px-4 py-2 rounded-full font-bold hover:brightness-90 transition-all">Login</Link>
            <Link to="/signup" onClick={handleLinkClick} className="block w-full text-center border border-[#6b2184] text-[#6b2184] px-4 py-2 rounded-full font-bold hover:bg-[#6b2184] hover:text-white transition-colors">Sign Up</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
