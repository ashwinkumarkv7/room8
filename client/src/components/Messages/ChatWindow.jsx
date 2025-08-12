import React, { useState, useEffect, useRef } from 'react';
// Add useNavigate for redirection
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSocket } from '../../context/SocketContext';
import { useAuth } from '../../context/AuthContext';
import API_URL from '../../apiConfig';
import { PaperAirplaneIcon, ArrowLeftIcon } from '@heroicons/react/24/solid';

export default function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [otherParticipant, setOtherParticipant] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(null); // To track authorization status
  const { conversationId } = useParams();
  const socket = useSocket();
  const { userInfo } = useAuth();
  const chatContainerRef = useRef(null);
  const navigate = useNavigate(); // Hook for redirection

  useEffect(() => {
    if (!conversationId || !userInfo) return;

    const fetchConversationDetails = async () => {
        try {
            const response = await fetch(`${API_URL}/api/conversations`, {
                headers: { 'Authorization': `Bearer ${userInfo.token}` },
            });
            const allConversations = await response.json();
            const currentConvo = allConversations.find(c => c._id === conversationId);
            
            if (currentConvo) {
                // --- SECURITY CHECK ---
                // Check if the current user is in the participants array
                if (!currentConvo.participants.some(p => p._id === userInfo._id)) {
                    console.error("Access Denied: User is not a participant.");
                    setIsAuthorized(false);
                    navigate('/dashboard/messages'); // Redirect them
                    return; // Stop further execution
                }
                // --- END SECURITY CHECK ---

                setIsAuthorized(true); // User is authorized
                const otherUser = currentConvo.participants.find(p => p._id !== userInfo._id);
                setOtherParticipant(otherUser);
                fetchMessages(); // Fetch messages only after authorization
            } else {
              setIsAuthorized(false);
              navigate('/dashboard/messages');
            }
        } catch (error) {
            console.error("Failed to fetch conversation details", error);
            setIsAuthorized(false);
        }
    };

    const fetchMessages = async () => {
      try {
        const response = await fetch(`${API_URL}/api/conversations/${conversationId}/messages`, {
          headers: { 'Authorization': `Bearer ${userInfo.token}` },
        });
        if (!response.ok) {
          // If the backend check fails, this will likely trigger
          if(response.status === 403) {
            setIsAuthorized(false);
            navigate('/dashboard/messages');
          }
          throw new Error('Failed to fetch messages');
        }
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchConversationDetails();
    
    if (socket && isAuthorized) {
      socket.emit('joinRoom', conversationId);
      const handleReceiveMessage = (message) => {
        if (message.conversationId === conversationId) {
            setMessages(prev => [...prev, message]);
        }
      };
      socket.on('receiveMessage', handleReceiveMessage);
      return () => socket.off('receiveMessage', handleReceiveMessage);
    }
  }, [socket, conversationId, userInfo, navigate, isAuthorized]);
  
  useEffect(() => {
    if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && socket) {
      const messageData = {
        conversationId,
        sender: userInfo._id,
        text: newMessage,
        _id: Date.now().toString() 
      };
      socket.emit('sendMessage', messageData);
      setMessages(prev => [...prev, messageData]);
      setNewMessage('');
    }
  };

  // If authorization is still being checked, show a loading state
  if (isAuthorized === null) {
    return <div className="flex items-center justify-center h-full">Loading...</div>;
  }
  
  // If not authorized, you can show a message, but the redirect should have already happened
  if (isAuthorized === false) {
     return <div className="flex items-center justify-center h-full">Access Denied.</div>;
  }

  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full bg-white dark:bg-gray-900 flex flex-col lg:relative lg:z-auto lg:top-auto lg:left-auto lg:max-h-[calc(100vh-220px)]">
      {/* ... rest of your JSX ... */}
      <div className="lg:hidden p-4 border-b border-gray-200 dark:border-gray-700 flex items-center space-x-4 flex-shrink-0">
        <Link to="/dashboard/messages" className="text-gray-600 dark:text-gray-300">
          <ArrowLeftIcon className="h-6 w-6" />
        </Link>
        {otherParticipant && (
            <div className="flex items-center">
                <img src={otherParticipant.profilePic} alt={otherParticipant.fullName} className="h-10 w-10 rounded-full object-cover mr-3" />
                <p className="font-semibold text-gray-900 dark:text-gray-200">{otherParticipant.fullName}</p>
            </div>
        )}
      </div>
      <div ref={chatContainerRef} className="flex-grow p-6 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg._id} className={`flex ${msg.sender === userInfo._id ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${msg.sender === userInfo._id ? 'bg-[#6b2184] text-white' : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'}`}>
                <p>{msg.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0 bg-white dark:bg-gray-900">
        <form onSubmit={handleSendMessage} className="relative">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="w-full pr-12 pl-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-[#6b2184] bg-transparent text-gray-900 dark:text-gray-200"
          />
          <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#6b2184] text-white p-2.5 rounded-full hover:brightness-90">
            <PaperAirplaneIcon className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
