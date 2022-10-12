import React from 'react';
import HeaderComponent from './components/headerComponent';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/style.css';
import SideBar from './components/sideBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RouterMain from './router';

const App = () => {
  return (
    <>
    
    <BrowserRouter>
      <ToastContainer />
      <div className="bg-lightGray w-full h-screen">
              <HeaderComponent />
        {/* <BrowserRouter> */}
          {/* <div className="flex w-full items-start"> */}
            <SideBar />
              {/* <div className="p-10 w-full"> */}
              <RouterMain/>
              {/* </div> */}
          </div>
      {/* </div> */}
        </BrowserRouter>
    </>
  );
};

export default App;
