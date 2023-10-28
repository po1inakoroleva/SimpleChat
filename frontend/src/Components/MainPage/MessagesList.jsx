import { useRef, useEffect } from 'react';
import { useAuth } from '../../providers/AuthProvider';

const scrollToMarker = (marker, behavior = 'auto') => {
  marker.scrollIntoView({
    behavior,
    block: 'start',
  });
};

const Message = ({
  author, body, color = 'primary', justify = 'start',
}) => {
  const authorColor = color === 'light' ? 'dark' : color;

  return (
    <div className={`d-flex mb-3 justify-content-${justify}`}>
      <div>
        <div className={`small text-${authorColor} text-${justify}`}>
          {author}
          {' '}
        </div>
        <div className={`d-flex justify-content-${justify}`}>
          <div className={`px-3 py-2 text-break text-bg-${color} message-corners-${justify}`}>
            {body}
          </div>
        </div>
      </div>
    </div>
  );
};

const MessagesList = ({ messages, channelId }) => {
  const { getUserName } = useAuth();
  const currentUserName = getUserName();
  const scrollRef = useRef();

  useEffect(() => {
    scrollToMarker(scrollRef.current);
  }, [channelId]);

  useEffect(() => {
    scrollToMarker(scrollRef.current, 'smooth');
  }, [messages.length]);

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5 ">
      {messages.map(({ body, username }) => {
        const color = currentUserName === username ? 'primary' : 'light';
        const justify = currentUserName === username ? 'end' : 'start';

        return (
          <Message
            author={username}
            body={body}
            color={color}
            justify={justify}
          />
        );
      })}
      <div className="scroll-marker" ref={scrollRef} />
    </div>
  );
};

export default MessagesList;
