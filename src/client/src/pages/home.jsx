import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import TaskChart from '../components/taskChart';
import { dashBoardStuff } from '../logic/features/dashboard/dashboardAction';

const Home = () => {
  // console.log(data, 'staff data');
  const dispatch = useDispatch();
  // const nav = useNavigate();
  const state = useSelector(state => state.auth);
  useEffect(() => {
    if (state.isLoggedIn) {
      console.log('its htre');
      dashBoardStuff(dispatch);
      // getStaff(dispatch);
    }else{
      console.log('its  not htre');
      // verifyUser(dispatch);
    }
  }, [state.isLoggedIn]);

  // if (!state.isLoggedIn && (state.status!=='initial' && state.status!=='loading')) {
  //   console.log('hhhhh login',{ss:state.status,hh:state.isLoggedIn});
  //   return <Navigate to={'/login'} />;
  // }
  if (state.status === 'error'){
    toast.error(state.errorMessage || '', {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
  return <div className='flex w-full py-10 items-start h-full'>
    <div className='w-[20%] h-full'></div>
    <div className='flex-1 p-10 h-full'>
      {/* <CustomTable/> */}
      <TaskChart/>
    </div>
  </div>
  // return <ClientTable dataType={'staff'} />;
};

export default Home;
