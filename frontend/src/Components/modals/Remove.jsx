import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { useServer } from '../../providers/ServerProvider';
import { selectors as modalSelectors } from '../../slices/modalSlice';

const Remove = ({ handleClose }) => {
  const { removeChannel } = useServer();
  const { channelId } = useSelector(modalSelectors.getModalContext);

  const handleRemove = async () => {
    try {
      await removeChannel(channelId);
      handleClose();
      toast('Канал удален');
    } catch (error) {
      toast.error('Ошибка соединения');
    }
  };

  return (
    <>
      <Modal.Header closeButton onHide={handleClose}>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">Уверены?</p>
        <div className="d-flex justify-content-end">
          <Button
            type="button"
            variant="secondary"
            onClick={handleClose}
            className="me-2"
          >
            Отменить
          </Button>
          <Button
            type="submit"
            variant="danger"
            onClick={handleRemove}
          >
            Удалить
          </Button>
        </div>
      </Modal.Body>
    </>
  );
};

export default Remove;
