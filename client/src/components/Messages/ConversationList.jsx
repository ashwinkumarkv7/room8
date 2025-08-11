import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ConversationList({ conversations }) {
  const { userInfo } = useAuth();

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold">Messages</h2>
      </div>
      <ul className="divide-y">
        {conversations.map(convo => {
          // Find the other person in the chat
          const otherParticipant = convo.participants.find(p => p._id !== userInfo._id);
          if (!otherParticipant) return null;

          return (
            <li key={convo._id}>
              <NavLink
                to={`/dashboard/messages/${convo._id}`}
                className={({ isActive }) => `flex items-center p-4 transition-colors ${isActive ? 'bg-purple-50' : 'hover:bg-gray-50'}`}
              >
                <img src={otherParticipant.profilePic} alt={otherParticipant.fullName} className="h-12 w-12 rounded-full object-cover mr-4" />
                <div>
                  <p className="font-semibold">{otherParticipant.fullName}</p>
                  <p className="text-sm text-gray-500">Start chatting now...</p>
                </div>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
