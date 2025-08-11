import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext'; // <-- 1. Import the SocketProvider

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
import PrivateRoomsPage from './pages/PrivateRoomsPage';
import SharedRoomsPage from './pages/SharedRoomsPage';

// --- Auth & Dashboard Components ---
import ProtectedRoute from './components/auth/ProtectedRoute';
import MyProfile from './components/Dashboard/MyProfile'; 
import AccountSettings from './components/Dashboard/AccountSettings';
import MessagesPage from './components/Messages/MessagesPage'; // <-- Import the new Messages page
import ChatWindow from './components/Messages/ChatWindow';   // <-- Import the ChatWindow

// --- Placeholder Components for future pages ---
const Favorites = () => <h2 className="text-xl font-bold">My Favorites</h2>;
const SelectConversation = () => (
    <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Select a conversation to start chatting.</p>
    </div>
);


function App() {
  return (
    <AuthProvider>
      {/* 2. Wrap the app with SocketProvider, inside AuthProvider */}
      <SocketProvider>
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
              <Route path="/rooms/private" element={<PrivateRoomsPage />} />
              <Route path="/rooms/shared" element={<SharedRoomsPage />} />
              
              {/* --- Protected Routes --- */}
              <Route element={<ProtectedRoute />}>
                <Route path="/discover" element={<DiscoveryPage />} />
                <Route path="/onboarding" element={<OnboardingPage />} />
                <Route path="/add-room" element={<AddRoomPage />} />
                <Route path="/dashboard" element={<DashboardPage />}>
                  <Route index element={<MyProfile />} /> 
                  {/* 3. Add the new nested routes for the messages page */}
                  <Route path="messages" element={<MessagesPage />}>
                      <Route index element={<SelectConversation />} />
                      <Route path=":conversationId" element={<ChatWindow />} />
                  </Route>
                  <Route path="favorites" element={<Favorites />} />
                  <Route path="settings" element={<AccountSettings />} />
                </Route>
              </Route>
            </Routes>
          </main>
          
          <Footer />
        </div>
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;
