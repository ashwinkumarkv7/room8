import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import shared components
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

// Import all page components
import HomePage from './pages/HomePage';
import BrowseRoomsPage from './pages/BrowseRoomsPage';
import BrowseRoommatesPage from './pages/BrowseRoommatesPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import AboutPage from './pages/AboutPage'; // <-- Import the new About page

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* The Navbar will appear on every page */}
      <Navbar />
      
      <main className="flex-grow">
        {/* The Routes component handles which page to display based on the URL */}
        <Routes>
          {/* Default route for the homepage */}
          <Route path="/" element={<HomePage />} />
          
          {/* Route for finding rooms */}
          <Route path="/browse-rooms" element={<BrowseRoomsPage />} />
          
          {/* Route for finding roommates */}
          <Route path="/browse-roommates" element={<BrowseRoommatesPage />} />
          
          {/* Route for the signup page */}
          <Route path="/signup" element={<SignupPage />} />

          {/* Route for the login page */}
          <Route path="/login" element={<LoginPage />} />

          {/* Route for the new about page */}
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>
      
      {/* The Footer will appear on every page */}
      <Footer />
    </div>
  );
}

export default App;
