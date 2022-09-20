import React from 'react';
import { render } from 'react-dom';
import HeaderComponent from './components/headerComponent';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/style.css';
import Home from './pages/home';
import Login from './pages/login';

const App = () => {
  return (
    <div className="bg-lightGray">
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
