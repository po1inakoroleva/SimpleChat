import Col from 'react-bootstrap/Col';
import MessagesForm from './MessagesForm';
import MessagesList from './MessagesList';

const Messages = ({ channel, messages }) => (
  <Col className="p-0 h-100">
    <div className="d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>
            {`# ${channel.name}`}
          </b>
        </p>
        <span className="text-muted">0 сообщений</span>
      </div>
      <MessagesList messages={messages} channelId={channel.id} />
      <div className="mt-auto px-5 py-3">
        <MessagesForm channelId={channel.id} />
      </div>
    </div>
  </Col>
);

export default Messages;
