import {
  BrowserRouter, Routes, Route, Navigate, Outlet,
} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { io } from 'socket.io-client';
import LoginPage from './LoginPage';
import ErrorPage from './ErrorPage';
import MainPage from './MainPage/MainPage';
import AuthProvider, { useAuth } from '../providers/AuthProvider';
import ServerProvider from '../providers/ServerProvider';
import routes from '../routes';

const PrivateOutlet = () => {
  const { loggedIn } = useAuth();

  return loggedIn ? <Outlet /> : <Navigate to={routes.loginPage()} />;
};

const PublicOutlet = () => {
  const { loggedIn } = useAuth();

  return loggedIn ? <Navigate to={routes.mainPage()} /> : <Outlet />;
};

const AuthButton = () => {
  const { loggedIn, logOut } = useAuth();

  return loggedIn ? <Button onClick={logOut}>Выйти</Button> : null;
};

const socket = io('/', { autoConnect: false });

const App = () => (
  <AuthProvider>
    <ServerProvider socket={socket}>
      <BrowserRouter>
        <div className="d-flex flex-column h-100">
          <Navbar className="shadow-sm navbar-expand-lg navbar-light bg-white">
            <Container>
              <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
              <AuthButton />
            </Container>
          </Navbar>
          <Routes>
            <Route path={routes.mainPage()} element={<PrivateOutlet />}>
              <Route path="" element={<MainPage />} />
            </Route>
            <Route path={routes.loginPage()} element={<PublicOutlet />}>
              <Route path="" element={<LoginPage />} />
            </Route>
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
        <div className="Toastify" />
      </BrowserRouter>
    </ServerProvider>
  </AuthProvider>
);

export default App;
