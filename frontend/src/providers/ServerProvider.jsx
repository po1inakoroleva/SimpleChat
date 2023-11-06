import { createContext, useContext, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import * as MessagesSlice from '../slices/messagesSlice.js';
import * as ChannnelsSlice from '../slices/channelsSlice.js';
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

    const addChannel = async (name) => {
      const { data } = await socket.emitWithAck('newChannel', { name });
      dispatch(ChannnelsSlice.actions.addChannel(data));
      dispatch(ChannnelsSlice.actions.setCurrentChannel(data.id));
    };

    const removeChannel = async (id) => {
      await socket.emitWithAck('removeChannel', { id });
      dispatch(ChannnelsSlice.actions.removeChannel(id));
    };

    const renameChannel = async (id, name) => {
      await socket.emitWithAck('renameChannel', { id, name });
      dispatch(ChannnelsSlice.actions.renameChannel({ id, name }));
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
      sendMessage,
      addChannel,
      removeChannel,
      renameChannel,
      connectSocket,
      disconnectSocket,
    });
  }, [dispatch, socket]);

  return (
    <ServerContext.Provider value={context}>
      {children}
    </ServerContext.Provider>
  );
};

export default ServerProvider;
export { ServerContext, useServer };
