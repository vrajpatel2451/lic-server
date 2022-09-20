import React from 'react';
import HeaderComponent from './components/headerComponent';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/style.css';
import Home from './pages/home';
import Login from './pages/login';
import SideBar from './components/sideBar';
import Client from './pages/client';

const App = () => {
  // const linkp = useLocation();
  // console.log(linkp.pathname);

  return (
    <div className="bg-lightGray w-full">
      <BrowserRouter>
        <div className="flex w-full items-start">
          <SideBar />
          <div className="w-full">
            <HeaderComponent />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/client" element={<Client />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
