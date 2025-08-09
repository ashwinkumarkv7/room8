import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

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
import DiscoveryPage from './pages/DiscoveryPage';
import OnboardingPage from './pages/OnboardingPage';
import RoomDetailsPage from './pages/RoomDetailsPage';
import PrivateRoomsPage from './pages/PrivateRoomsPage'; // <-- Import new page
import SharedRoomsPage from './pages/SharedRoomsPage';   // <-- Import new page

// --- Auth & Dashboard Components ---
import ProtectedRoute from './components/auth/ProtectedRoute';
import MyProfile from './components/Dashboard/MyProfile'; 
import AccountSettings from './components/Dashboard/AccountSettings';
import UpcomingBookings from './components/Dashboard/UpcomingBookings';

// --- Placeholder Components for future pages ---
const Favorites = () => <h2 className="text-xl font-bold">My Favorites</h2>;
const Notifications = () => <h2 className="text-xl font-bold">My Notifications</h2>;


function App() {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <ModernNavbar />
        
        <main className="flex-grow">
          <Routes>
            {/* --- Public Routes --- */}
            <Route path="/" element={<HomePage />} />
            <Route path="/browse-rooms" element={<BrowseRoomsPage />} />
            <Route path="/browse-roommates" element={<BrowseRoommatesPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/rooms/:slug" element={<RoomDetailsPage />} />
            <Route path="/rooms/private" element={<PrivateRoomsPage />} /> {/* <-- Add new route */}
            <Route path="/rooms/shared" element={<SharedRoomsPage />} />   {/* <-- Add new route */}
            
            {/* --- Protected Routes --- */}
            <Route element={<ProtectedRoute />}>
              <Route path="/discover" element={<DiscoveryPage />} />
              <Route path="/onboarding" element={<OnboardingPage />} />
              <Route path="/add-room" element={<AddRoomPage />} />
              <Route path="/dashboard" element={<DashboardPage />}>
                <Route index element={<MyProfile />} /> 
                <Route path="bookings" element={<UpcomingBookings />} />
                <Route path="favorites" element={<Favorites />} />
                <Route path="notifications" element={<Notifications />} />
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
