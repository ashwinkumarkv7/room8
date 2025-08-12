import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';

// --- Shared Components ---
import ModernNavbar from './components/Navbar/ModernNavbar';
import Footer from './components/Footer/Footer';
import BottomNav from './components/BottomNav/BottomNav';

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
import MessagesPage from './components/Messages/MessagesPage';
import ChatWindow from './components/Messages/ChatWindow';

// --- Placeholder Components ---
const Favorites = () => <h2 className="text-xl font-bold">My Favorites</h2>;
const SelectConversation = () => (
    <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Select a conversation to start chatting.</p>
    </div>
);

// --- This component handles the main layout and conditional rendering ---
const AppLayout = () => {
  const location = useLocation();
  const { userInfo } = useAuth();
  
  const [isDesktop, setDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const updateMedia = () => {
      setDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  }, []);

  const isDashboardPage = location.pathname.startsWith('/dashboard');
  
  const showNavbar = !isDashboardPage || isDesktop;
  
  const showFooter = !isDashboardPage;

  const pathSegments = location.pathname.split('/').filter(Boolean);
  const isChatWindowActive = pathSegments[0] === 'dashboard' && pathSegments[1] === 'messages' && pathSegments.length > 2;
  
  const showBottomNav = userInfo && (!isChatWindowActive || isDesktop);

  return (
    <div className="flex flex-col min-h-screen">
      {showNavbar && <ModernNavbar />}

      {/* Main content area */}
      <main className="flex-grow pb-16 lg:pb-0">
        <Routes>
          {/* --- Public Routes --- */}
          <Route path="/" element={userInfo ? <Navigate to="/discover" replace /> : <HomePage />} />
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
              <Route path="messages" element={<MessagesPage />}>
                  <Route index element={<SelectConversation />} />
                  {/* On desktop, the ChatWindow renders here. On mobile, it's handled by the overlay logic below. */}
                  {isDesktop && <Route path=":conversationId" element={<ChatWindow />} />}
              </Route>
              <Route path="favorites" element={<Favorites />} />
              <Route path="settings" element={<AccountSettings />} />
            </Route>
          </Route>
        </Routes>
      </main>

      {showFooter && <Footer />}
      {showBottomNav && <BottomNav />}

      {/* --- Mobile Chat Window Overlay --- */}
      {/* This renders the ChatWindow on top of everything else when active on mobile */}
      {!isDesktop && (
        <Routes>
          <Route path="/dashboard/messages/:conversationId" element={<ChatWindow />} />
        </Routes>
      )}
    </div>
  );
};

// The main App component now just sets up the providers
function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <AppLayout />
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;
