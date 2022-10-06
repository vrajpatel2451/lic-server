import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLinkClickHandler, useLocation, useNavigate } from 'react-router-dom';
import ClientTable from '../components/clientTable';
import { verifyUser } from '../logic/features/auth/authAction';
import { getStaff } from '../logic/features/staff/staffAction';
import { getClient } from '../logic/features/client/clientAction';
import { toast } from 'react-toastify';

const Home = ({ data }) => {
  // console.log(data, 'staff data');
  const dispatch = useDispatch();
  const nav = useNavigate();
  const state = useSelector(state => state.auth);
  useEffect(() => {
    if (!state.loading || !state.isLoggedIn) {
      verifyUser(dispatch);
      getStaff(dispatch);
      getClient(dispatch);
    }
  }, []);

  if ((state.status !== 'initial' || state.status !== 'loading') && !state.isLoggedIn) {
    console.log('here');
    // nav('/login');
  } else {
    if (state.status === 'error' || !state.isLoggedIn) {
      console.log('hhahahah');
      nav('/login');
    }
  }

  if (state.status === 'error')
    toast.error(state.errorMessage || '', {
      position: toast.POSITION.TOP_RIGHT,
    });
  return <ClientTable dataType={'staff'} data={data} />;
};

export default Home;
