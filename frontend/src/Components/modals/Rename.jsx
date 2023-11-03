import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useServer } from '../../providers/ServerProvider';
import * as ChannelsSlice from '../../slices/channelsSlice';
import { selectors as modalSelectors } from '../../slices/modalSlice';

const Rename = ({ handleClose }) => {
  const { renameChannel } = useServer();
  const channels = useSelector(ChannelsSlice.channelsSelectors.selectAllChannelsNames);
  const { channelId, channelName } = useSelector(modalSelectors.getModalContext);

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.select();
  }, []);

  const validationSchema = Yup.object({
    name: Yup
      .string()
      .trim()
      .required()
      .notOneOf(channels)
      .min(3)
      .max(20),
  });

  const formik = useFormik({
    initialValues: {
      name: channelName,
    },
    validationSchema,
    onSubmit: async ({ name }) => {
      try {
        await renameChannel(channelId, name);
        handleClose();
        toast('Канал переименован');
      } catch (error) {
        toast.error('Ошибка соединения');
      } finally {
        inputRef.current.focus();
      }
    },
  });

  return (
    <>
      <Modal.Header closeButton onHide={handleClose}>
        <Modal.Title>Переименовать канал</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              required
              ref={inputRef}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              name="name"
              className="mb-2"
            />
            <Form.Label className="visually-hidden">
              Имя канала
            </Form.Label>
            <div className="invalid-feedback" />
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
                variant="primary"
                disabled={formik.isSubmitting}
              >
                Отправить
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </>
  );
};

export default Rename;
