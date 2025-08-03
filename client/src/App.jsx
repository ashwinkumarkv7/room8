import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage';
import BrowseRoomsPage from './pages/BrowseRoomsPage';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* CORRECT: The site-wide Navbar is here. */}
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/browse-rooms" element={<BrowseRoomsPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;