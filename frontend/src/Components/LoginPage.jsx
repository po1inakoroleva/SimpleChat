import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Обязательное поле'),
  password: Yup.string().required('Обязательное поле')
})

const LoginPage = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  })

  return (
  <>
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
                    placeholder="Ваш ник"
                    name="username"
                    isInvalid={false}
                    onChange={formik.handleChange}
                    required
                    autoFocus
                    disabled={formik.isSubmitting}
                  />
                </FloatingLabel>
                <FloatingLabel controlId="password" label="Пароль" className="mb-3">
                  <Form.Control
                    type="password"
                    value={formik.values.password}
                    placeholder="Пароль"
                    name="password"
                    isInvalid={false}
                    onChange={formik.handleChange}
                    required
                    disabled={formik.isSubmitting}
                  />
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
  </>
)
}

export default LoginPage;