import React from 'react';
import HeaderComponent from './components/headerComponent';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/style.css';
import Home from './pages/home';
//import Login from './pages/login';
import SideBar from './components/sideBar';
import Client from './pages/client';
import Login from './pages/login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';

const App = () => {
  // const state = useSelector(state => console.log(state, 'state.auth'));

  return (
    <>
      <ToastContainer />
      <div className="bg-lightGray w-full">
        <BrowserRouter>
          <div className="flex w-full items-start">
            <SideBar />
            <div className="w-full">
              <HeaderComponent />
              <div className="p-10">
                <Routes>
                  <Route
                    path="/"
                    element={<Home data={useSelector(state => state?.staff?.user)} />}
                  />
                  <Route
                    path="/client"
                    element={<Client data={useSelector(state => state?.staff?.user)} />}
                  />
                  <Route path="/login" element={<Login />} />
                </Routes>
              </div>
            </div>
          </div>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
