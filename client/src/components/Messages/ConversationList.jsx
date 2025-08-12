import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ChevronRightIcon } from '@heroicons/react/24/solid';

export default function ConversationList({ conversations, loading }) {
  const { userInfo } = useAuth();

  if (loading) {
    return <div className="p-4 text-center text-gray-500">Loading conversations...</div>;
  }

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900">
      {/* This header is now visible on all screen sizes */}
      <div className="p-4 border-b dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-200">Messages</h2>
      </div>

      <ul className="divide-y dark:divide-gray-700 overflow-y-auto flex-grow">
        {conversations.length === 0 && (
            <p className="p-4 text-center text-gray-500">No conversations yet.</p>
        )}
        {conversations.map(convo => {
          const otherParticipant = convo.participants.find(p => p._id !== userInfo._id);
          if (!otherParticipant) return null;

          return (
            <li key={convo._id}>
              <NavLink
                to={`/dashboard/messages/${convo._id}`}
                className={({ isActive }) => `flex items-center justify-between p-4 transition-colors ${isActive ? 'bg-purple-50 dark:bg-gray-700' : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'}`}
              >
                <div className="flex items-center">
                    <img 
                        src={otherParticipant.profilePic} 
                        alt={otherParticipant.fullName} 
                        className="h-12 w-12 rounded-full object-cover mr-4"
                        onError={(e) => { e.target.onerror = null; e.target.src=`https://ui-avatars.com/api/?name=${otherParticipant.fullName}&background=6b2184&color=fff` }}
                    />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-gray-200">{otherParticipant.fullName}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Start chatting now...</p>
                    </div>
                </div>
                <ChevronRightIcon className="h-5 w-5 text-gray-400" />
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}