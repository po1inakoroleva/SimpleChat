import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import ErrorPage from './Components/ErrorPage';
import MainPage from './Components/MainPage';

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column h-100">
        <Navbar className="shadow-sm navbar-expand-lg navbar-light bg-white">
          <Container>
            <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
          </Container>
        </Navbar>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
      <div className="Toastify"></div>
    </BrowserRouter>
  );
}

export default App;
