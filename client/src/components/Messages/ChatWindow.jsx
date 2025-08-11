import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSocket } from '../../context/SocketContext';
import { useAuth } from '../../context/AuthContext';
import API_URL from '../../apiConfig';
import { PaperAirplaneIcon, ArrowLeftIcon } from '@heroicons/react/24/solid';

export default function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [otherParticipant, setOtherParticipant] = useState(null);
  const { conversationId } = useParams();
  const socket = useSocket();
  const { userInfo } = useAuth();
  const messagesEndRef = useRef(null);

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
                const otherUser = currentConvo.participants.find(p => p._id !== userInfo._id);
                setOtherParticipant(otherUser);
            }
        } catch (error) {
            console.error("Failed to fetch conversation details", error);
        }
    };

    const fetchMessages = async () => {
      try {
        const response = await fetch(`${API_URL}/api/conversations/${conversationId}/messages`, {
          headers: { 'Authorization': `Bearer ${userInfo.token}` },
        });
        if (!response.ok) throw new Error('Failed to fetch messages');
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchConversationDetails();
    fetchMessages();
    
    if (socket) {
      socket.emit('joinRoom', conversationId);
      const handleReceiveMessage = (message) => {
        if (message.conversationId === conversationId) {
            setMessages(prev => [...prev, message]);
        }
      };
      socket.on('receiveMessage', handleReceiveMessage);
      return () => socket.off('receiveMessage', handleReceiveMessage);
    }
  }, [socket, conversationId, userInfo]);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && socket) {
      const messageData = {
        conversationId,
        sender: userInfo._id,
        text: newMessage,
      };
      socket.emit('sendMessage', messageData);
      setMessages(prev => [...prev, messageData]);
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* --- New Mobile Header --- */}
      <div className="md:hidden p-4 border-b flex items-center space-x-4">
        <Link to="/dashboard/messages" className="text-gray-600">
          <ArrowLeftIcon className="h-6 w-6" />
        </Link>
        {otherParticipant && (
            <div className="flex items-center">
                <img src={otherParticipant.profilePic} alt={otherParticipant.fullName} className="h-10 w-10 rounded-full object-cover mr-3" />
                <p className="font-semibold">{otherParticipant.fullName}</p>
            </div>
        )}
      </div>

      {/* Message Display Area */}
      <div className="flex-grow p-6 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === userInfo._id ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${msg.sender === userInfo._id ? 'bg-[#6b2184] text-white' : 'bg-gray-200 text-gray-800'}`}>
                <p>{msg.text}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input Area */}
      <div className="p-4 border-t border-gray-200">
        <form onSubmit={handleSendMessage} className="relative">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="w-full pr-12 pl-4 py-3 border-2 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#6b2184]"
          />
          <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#6b2184] text-white p-2.5 rounded-full hover:brightness-90">
            <PaperAirplaneIcon className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
