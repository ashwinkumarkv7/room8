import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useAuth } from './AuthContext';
import API_URL from '../apiConfig';

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { userInfo } = useAuth();

  useEffect(() => {
    // Only connect if the user is logged in
    if (userInfo) {
      // Connect to the server, passing the user's token for authentication
      const newSocket = io(API_URL, {
        query: { token: userInfo.token },
      });
      setSocket(newSocket);

      // Clean up the connection when the component unmounts or user logs out
      return () => newSocket.close();
    } else {
      // If user logs out, disconnect the socket
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [userInfo]); // This effect re-runs whenever the user's login state changes

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
