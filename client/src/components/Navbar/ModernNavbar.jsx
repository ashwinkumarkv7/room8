import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/logo/room8-logo.png';
import { Bars3Icon, XMarkIcon, UserCircleIcon } from '@heroicons/react/24/outline';

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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { userInfo, logout } = useAuth();
  const navigate = useNavigate();

  const handleLinkClick = () => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  const logoutHandler = () => {
    logout();
    setIsDropdownOpen(false);
    navigate('/');
  };

  return (
    // 1. Added 'relative' to make this the positioning container for the dropdown
    <nav className="relative bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to={userInfo ? "/discover" : "/"} onClick={handleLinkClick}>
            <img src={logo} alt="Room8 Logo" className="h-10 w-auto" />
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex flex-1 justify-center items-center space-x-8">
          {userInfo ? (
            <CustomNavLink to="/discover">Discover</CustomNavLink>
          ) : (
            <CustomNavLink to="/">Home</CustomNavLink>
          )}
          <CustomNavLink to="/browse-rooms">Browse Rooms</CustomNavLink>
          <CustomNavLink to="/browse-roommates">Browse Roommates</CustomNavLink>
          {userInfo && <CustomNavLink to="/add-room">Add Room</CustomNavLink>}
          <CustomNavLink to="/about">About</CustomNavLink>
        </div>

        {/* Login/Signup OR Profile Dropdown */}
        <div className="hidden md:flex flex-shrink-0 items-center space-x-4">
          {userInfo ? (
            <div className="relative">
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center space-x-2">
                {userInfo.profilePic && userInfo.profilePic !== 'default_avatar_url' ? (
                  <img src={userInfo.profilePic} alt="Profile" className="h-8 w-8 rounded-full object-cover" />
                ) : (
                  <UserCircleIcon className="h-8 w-8 text-gray-600" />
                )}
                <span className="font-semibold text-gray-700">{userInfo.fullName.split(' ')[0]}</span>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                  <Link to="/dashboard" onClick={handleLinkClick} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Dashboard</Link>
                  <button onClick={logoutHandler} className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="font-bold text-gray-800 hover:text-[#6b2184] transition-colors tracking-tight">Login</Link>
              <Link to="/signup" className="bg-[#6b2184] text-white px-5 py-2 rounded-full hover:brightness-90 transition-all font-semibold">Sign Up</Link>
            </>
          )}
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
        // 2. Made the dropdown absolute to overlay content below it
        <div className="absolute left-0 w-full md:hidden bg-white shadow-lg px-6 pb-6 pt-2 space-y-4">
          {userInfo ? (
            <Link to="/discover" className="block text-gray-800 hover:text-[#6b2184] font-bold p-2" onClick={handleLinkClick}>Discover</Link>
          ) : (
            <Link to="/" className="block text-gray-800 hover:text-[#6b2184] font-bold p-2" onClick={handleLinkClick}>Home</Link>
          )}
          <Link to="/browse-rooms" className="block text-gray-800 hover:text-[#6b2184] font-bold p-2" onClick={handleLinkClick}>Browse Rooms</Link>
          <Link to="/browse-roommates" className="block text-gray-800 hover:text-[#6b2184] font-bold p-2" onClick={handleLinkClick}>Browse Roommates</Link>
          {userInfo && <Link to="/add-room" className="block text-gray-800 hover:text-[#6b2184] font-bold p-2" onClick={handleLinkClick}>Add Room</Link>}
          <Link to="/about" className="block text-gray-800 hover:text-[#6b2184] font-bold p-2" onClick={handleLinkClick}>About</Link>
          <div className="border-t border-gray-200 pt-4 space-y-4">
            {userInfo ? (
                <>
                    <Link to="/dashboard" onClick={handleLinkClick} className="block w-full text-center bg-gray-100 text-gray-800 px-4 py-2 rounded-full font-bold">My Dashboard</Link>
                    <button onClick={() => { logoutHandler(); handleLinkClick(); }} className="block w-full text-center border border-red-500 text-red-500 px-4 py-2 rounded-full font-bold">Logout</button>
                </>
            ) : (
                <>
                    <Link to="/login" onClick={handleLinkClick} className="block w-full text-center bg-[#6b2184] text-white px-4 py-2 rounded-full font-bold hover:brightness-90 transition-all">Login</Link>
                    <Link to="/signup" onClick={handleLinkClick} className="block w-full text-center border border-[#6b2184] text-[#6b2184] px-4 py-2 rounded-full font-bold hover:bg-[#6b2184] hover:text-white transition-colors">Sign Up</Link>
                </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
