import {
  BrowserRouter, Routes, Route, useLocation, Navigate,
} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import LoginPage from './LoginPage';
import ErrorPage from './ErrorPage';
import MainPage from './MainPage/MainPage';
import AuthProvider from '../providers/AuthProvider';
import { useAuth } from '../contexts/index';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />;
};

const AuthButton = () => {
  const auth = useAuth();

  return auth.loggedIn ? <Button onClick={auth.logOut}>Выйти</Button> : null;
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <div className="d-flex flex-column h-100">
        <Navbar className="shadow-sm navbar-expand-lg navbar-light bg-white">
          <Container>
            <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
            <AuthButton />
          </Container>
        </Navbar>
        <Routes>
          <Route
            path="/"
            element={(
              <PrivateRoute>
                <MainPage />
              </PrivateRoute>
            )}
          />
          <Route path="login" element={<LoginPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
      <div className="Toastify" />
    </BrowserRouter>
  </AuthProvider>
);

export default App;
