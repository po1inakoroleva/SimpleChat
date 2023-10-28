import { createContext, useContext, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import routes from '../routes.js';
import * as MessagesSlice from '../slices/messagesSlice.js';
import { useAuth } from './AuthProvider.jsx';

const ServerContext = createContext();
const useServer = () => useContext(ServerContext);

const ServerProvider = ({ socket, children }) => {
  const dispatch = useDispatch();
  const { getAuthHeaders } = useAuth();

  const context = useMemo(() => {
    const sendMessage = async (message) => {
      socket.emit('newMessage', message);
    };

    const getServerData = async () => {
      const response = await axios.get(routes.data(), { headers: getAuthHeaders() });
      return response;
    };

    const connectSocket = () => {
      socket.connect();
      socket.on('newMessage', (message) => {
        dispatch(MessagesSlice.actions.addMessage(message));
      });
    };

    const disconnectSocket = () => {
      socket.off();
      socket.disconnect();
    };

    return ({
      sendMessage, getServerData, connectSocket, disconnectSocket,
    });
  }, [dispatch, socket, getAuthHeaders]);

  return (
    <ServerContext.Provider value={context}>
      {children}
    </ServerContext.Provider>
  );
};

export default ServerProvider;
export { ServerContext, useServer };
