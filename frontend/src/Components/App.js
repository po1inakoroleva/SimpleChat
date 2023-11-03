import {
  BrowserRouter, Routes, Route, Navigate, Outlet,
} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { io } from 'socket.io-client';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoginPage from './LoginPage';
import ErrorPage from './ErrorPage';
import SignUpPage from './SignUpPage';
import MainPage from './MainPage/MainPage';
import AuthProvider, { useAuth } from '../providers/AuthProvider';
import ServerProvider from '../providers/ServerProvider';
import routes from '../routes';
import '../i18n';

const PrivateOutlet = () => {
  const { loggedIn } = useAuth();

  return loggedIn ? <Outlet /> : <Navigate to={routes.loginPage()} />;
};

const PublicOutlet = () => {
  const { loggedIn } = useAuth();

  return loggedIn ? <Navigate to={routes.mainPage()} /> : <Outlet />;
};

const AuthButton = () => {
  const { t } = useTranslation();
  const { loggedIn, logOut } = useAuth();

  return loggedIn ? <Button onClick={logOut}>{t('buttons.signOut')}</Button> : null;
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
            <Route path={routes.signUpPage()} element={<PublicOutlet />}>
              <Route path="" element={<SignUpPage />} />
            </Route>
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </BrowserRouter>
    </ServerProvider>
  </AuthProvider>
);

export default App;
