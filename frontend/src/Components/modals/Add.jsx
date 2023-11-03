import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { channelsSelectors } from '../../slices/channelsSlice';
import { useServer } from '../../providers/ServerProvider';

const Add = ({ handleClose }) => {
  const channels = useSelector(channelsSelectors.selectAllChannelsNames);
  const { addChannel } = useServer();

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
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
      name: '',
    },
    validationSchema,
    onSubmit: async ({ name }) => {
      try {
        await addChannel(name);
        formik.resetForm();
        handleClose();
        toast('Канал создан');
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
        <Modal.Title>Добавить канал</Modal.Title>
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

export default Add;
