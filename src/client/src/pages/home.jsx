import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLinkClickHandler, useLocation, useNavigate } from 'react-router-dom';
import ClientTable from '../components/clientTable';
import { verifyUser } from '../logic/features/auth/authAction';
import { getStaff } from '../logic/features/staff/staffAction';
import { getClient } from '../logic/features/client/clientAction';
import { toast } from 'react-toastify';

const Home = () => {
  // console.log(data, 'staff data');
  const dispatch = useDispatch();
  const nav = useNavigate();
  const state = useSelector(state => state.auth);
  useEffect(() => {
    if (state.isLoggedIn) {
      console.log('its htre');
      verifyUser(dispatch);
      getStaff(dispatch);
    }
  }, [state.isLoggedIn]);

  if (state.status === 'error' || !state.isLoggedIn) {
    return <Navigate to={'/login'} />;
  }
  // }

  if (state.status === 'error')
    toast.error(state.errorMessage || '', {
      position: toast.POSITION.TOP_RIGHT,
    });
  return <ClientTable dataType={'staff'} />;
};

export default Home;
