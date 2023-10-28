import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from 'react-router-dom';
import { useEffect } from 'react';
import { channelsSelectors } from '../../slices/channelsSlice';
import { messagesSelectors } from '../../slices/messagesSlice';
import { loadingStatusSelectors } from '../../slices/loadingStatusSlice';
import { useServer } from '../../providers/ServerProvider';
import fetchInitialData from '../../slices/thunk';
import Channels from './Channels';
import Messages from './Messages';

const Error = () => {
  const navigate = useNavigation();
  return (
    <Card className="text-center">
      <Card.Body>
        <Card.Title>
          Что-то пошло не так
        </Card.Title>
        <Button onClick={() => navigate(0)}>Перезагрузить страницу</Button>
      </Card.Body>
    </Card>
  );
};

const LoadingState = () => (
  <div className="m-auto w-auto">
    <Spinner animation="border" variant="primary" role="status">
      <span className="visually-hidden">Загрузка...</span>
    </Spinner>
  </div>
);

const Children = () => {
  const loadingStatus = useSelector(loadingStatusSelectors.getStatus);
  const channels = useSelector(channelsSelectors.selectAllChannels);
  const currentChannel = useSelector(channelsSelectors.selectCurrentChannel);
  const currentChannelMessages = useSelector(messagesSelectors.selectCurrentChannelMessages);

  switch (loadingStatus) {
    case 'successful':
      return (
        <>
          <Channels channels={channels} currentChannel={currentChannel} />
          <Messages channel={currentChannel} messages={currentChannelMessages} />
        </>
      );

    case 'failed':
      return <Error />;

    default:
      return <LoadingState />;
  }
};

const MainPage = () => {
  const dispatch = useDispatch();
  const { getServerData, connectSocket, disconnectSocket } = useServer();

  useEffect(() => {
    dispatch(fetchInitialData());
    connectSocket();

    return () => disconnectSocket();
  }, [dispatch, connectSocket, disconnectSocket, getServerData]);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-nowrap">
        <Children />
      </Row>
    </Container>
  );
};

export default MainPage;
