import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // <-- 1. Import the AuthProvider

// --- Shared Components ---
import ModernNavbar from './components/Navbar/ModernNavbar';
import Footer from './components/Footer/Footer';

// --- Page Components ---
import HomePage from './pages/HomePage';
import BrowseRoomsPage from './pages/BrowseRoomsPage';
import BrowseRoommatesPage from './pages/BrowseRoommatesPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import AboutPage from './pages/AboutPage';
import AddRoomPage from './pages/AddRoomPage';
import DashboardPage from './pages/DashboardPage';

// --- Auth & Dashboard Components ---
import ProtectedRoute from './components/auth/ProtectedRoute';
import MyProfile from './components/Dashboard/MyProfile';
import AccountSettings from './components/Dashboard/AccountSettings';

function App() {
  return (
    // 2. Wrap the entire application with the AuthProvider
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <ModernNavbar />
        
        <main className="flex-grow">
          <Routes>
            {/* --- Public Routes (Visible to everyone) --- */}
            <Route path="/" element={<HomePage />} />
            <Route path="/browse-rooms" element={<BrowseRoomsPage />} />
            <Route path="/browse-roommates" element={<BrowseRoommatesPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/add-room" element={<AddRoomPage />} />

            {/* --- Protected Routes (Only for logged-in users) --- */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashboardPage />}>
                <Route index element={<MyProfile />} />
                <Route path="settings" element={<AccountSettings />} />
              </Route>
            </Route>
          </Routes>
        </main>
        
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
