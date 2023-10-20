import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import routes from '../routes';
import { useAuth } from '../contexts/index';

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Обязательное поле'),
  password: Yup.string().required('Обязательное поле'),
});

const LoginPage = () => {
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setAuthFailed(false);

      try {
        const res = await axios.post(routes.login(), values);
        localStorage.setItem('userId', JSON.stringify(res.data));
        auth.logIn();
        const { from } = location.state;
        navigate(from);
      } catch (err) {
        formik.setSubmitting(false);
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
  });

  const target = useRef(null);
  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
                <Image src={`${process.env.PUBLIC_URL}/images/login.jpg`} roundedCircle />
              </Col>
              <Form onSubmit={formik.handleSubmit} className="col-12 col-12 col-md-6">
                <h1 className="text-center mb-4">Войти</h1>
                <FloatingLabel controlId="username" label="Ваш ник" className="mb-3">
                  <Form.Control
                    type="text"
                    value={formik.values.username}
                    placeholder="username"
                    name="username"
                    isInvalid={authFailed}
                    onChange={formik.handleChange}
                    required
                    autoFocus
                    disabled={formik.isSubmitting}
                    ref={inputRef}
                  />
                </FloatingLabel>
                <FloatingLabel controlId="password" label="Пароль" className="mb-3">
                  <Form.Control
                    type="password"
                    value={formik.values.password}
                    placeholder="password"
                    name="password"
                    isInvalid={authFailed}
                    onChange={formik.handleChange}
                    required
                    disabled={formik.isSubmitting}
                    ref={target}
                  />
                  {authFailed ? <div className="invalid-tooltip">Неверные имя пользователя или пароль</div> : null}
                </FloatingLabel>
                <Button
                  variant="outline-primary"
                  type="submit"
                  size="lg"
                  className="mb-3 w-100"
                  disabled={formik.isSubmitting}
                >
                  Войти
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-muted text-center">
                <span>Нет аккаунта?</span>
                {' '}
                <Link to="/signup">Регистрация</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
