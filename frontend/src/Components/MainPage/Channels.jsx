import React from 'react';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const Channels = ({ channels, currentChannel }) => {
  const isCurrentChannel = (currentId) => {
    const { id } = currentChannel;
    return currentId === id;
  };

  return (
    <Col xs={4} md={2} className="border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>
        <Button variant="outline-primary" className="p-0 d-flex btn-group-vertical">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            width={20}
            height={20}
          >
            <rect x="9.5" y="5" width="1" height="10" />
            <rect x="5" y="9.5" width="10" height="1" />
          </svg>
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map(({ name, id }) => (
          <li key={id} className="nav-item w-100">
            <Button variant={isCurrentChannel(id) ? 'primary' : 'ligth'} className="w-100 rounded-0 text-start">
              <span className="me-1">#</span>
              {name}
            </Button>
          </li>
        ))}
      </ul>
    </Col>
  );
};

export default Channels;
