import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ButtonComponent from './buttonComponent';

const SideBar = () => {
  const link = useLocation();

  const navigate = useNavigate();

  if (link.pathname !== '/login') {
    return (
      <div className="sticky top-0 left-0 h-screen pl-8 py-6 w-80 bg-white flex flex-col">
        <div className="h-12 mb-6 pl-6 flex items-center">
          <p>LOGO</p>
        </div>
        <div className="mt-24 flex flex-col justify-between h-full">
          <div>
            <Link to="/">
              <h6 className={`side-nav mb-4 ${link.pathname === '/' ? 'side-nav-active' : null}`}>
                 Staff
              </h6>
            </Link>
            <Link to="/client">
              <h6 className={`side-nav ${link.pathname === '/client' ? 'side-nav-active' : null}`}>
                Client
              </h6>
            </Link>
          </div>
          <ButtonComponent
            onClick={() => navigate('/login')}
            buttonText="Log Out"
            buttonClass="self-center ml-[-32px]"
          />
        </div>
      </div>
    );
  }
};

export default SideBar;
