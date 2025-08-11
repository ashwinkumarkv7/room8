import React, { useState, useEffect } from 'react';
import { useParams, Outlet } from 'react-router-dom';
import ConversationList from './ConversationList';
import { useAuth } from '../../context/AuthContext';
import API_URL from '../../apiConfig';

export default function MessagesPage() {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { conversationId } = useParams();
  const { userInfo } = useAuth();

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/api/conversations`, {
          headers: { 'Authorization': `Bearer ${userInfo.token}` },
        });
        if (!response.ok) throw new Error('Failed to fetch conversations');
        const data = await response.json();
        setConversations(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (userInfo) {
      fetchConversations();
    }
  }, [userInfo]);

  return (
    <div className="flex h-full">
      {/* --- This section is now responsive --- */}
      {/* On mobile, it's hidden if a conversation is selected */}
      <aside className={`w-full md:w-1/3 border-r border-gray-200 dark:border-gray-700 ${conversationId ? 'hidden md:block' : 'block'}`}>
        <ConversationList conversations={conversations} loading={loading} />
      </aside>

      {/* On mobile, this takes up the full screen when a conversation is selected */}
      <main className={`w-full md:w-2/3 flex-col ${conversationId ? 'flex' : 'hidden md:flex'}`}>
        <Outlet />
      </main>
    </div>
  );
}
