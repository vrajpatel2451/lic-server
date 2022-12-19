import React from 'react';
import { memo } from 'react';
import { useCallback } from 'react';
import { useMemo } from 'react';
import { MdAccountTree, MdFamilyRestroom, MdLogout, MdOutlineDashboard, MdPeople, MdPerson, MdSettings } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { failedAuth } from '../logic/features/auth/authReducer';

const SideBar = () => {
  // const link = useLocation();

  const location = useLocation();
  const nav = useNavigate();
  const dispatch = useDispatch();
  console.log('rebuilder');

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(failedAuth({ message: 'You loggedOut' }));
  }

  const pathname = useMemo(()=>location.pathname,[location.pathname]);
  const navigate = useCallback((path)=>{
    if(path!==pathname){
      nav(path)
    }
  },[pathname])

  if (pathname !== '/login') {
    return (
      <div className="fixed top-0 left-0 w-[20%] h-screen z-10 bg-pri-dark p-4 flex flex-col items-stretch gap-4">
        <div className='flex items-stretch gap-2'>
          <div className='w-[20%] h-auto p-2 rounded-md bg-pri'>
            <img className='w-full h-auto rounded-sm' src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80" alt="Profile Image" />
          </div>
          <div className='flex-1 px-4 flex items-center bg-pri rounded-md tracking-wide'>
            <p className='text-white text-base'>Vraj Patel</p>
          </div>
        </div>
        <div className='h-10'></div>
        {/* <Link to={'/'}> */}
        <div onClick={()=>navigate('/')} className={`flex items-center gap-2 py-4 rounded-md hover:bg-pri ${pathname==="/"?'bg-pri':''}`}>
          <span className='w-[20%] flex justify-center items-center'>
          <MdOutlineDashboard color='white'/>
          </span>
          <p className='text-white text-base'>Dashboard</p>
        </div>
        {/* </Link> */}
        {/* <Link to={'/client'}> */}
        <div onClick={()=>navigate('/client')} className={`flex items-center gap-2 py-4 rounded-md hover:bg-pri ${pathname.includes("/client")?'bg-pri':''}`}>
          <span className='w-[20%] flex justify-center items-center'>
          <MdFamilyRestroom color='white'/>
          </span>
          <p className='text-white text-base'>Clients</p>
        </div>
        {/* </Link> */}
        {/* <Link to={'/staff'}> */}
        <div onClick={()=>navigate('/staff')} className={`flex items-center gap-2 py-4 rounded-md hover:bg-pri ${pathname.includes("/staff")?'bg-pri':''}`}>
          <span className='w-[20%] flex justify-center items-center'>
          <MdAccountTree color='white'/>
          </span>
          <p className='text-white text-base'>Staff</p>
        </div>
        {/* </Link> */}
        {/* <Link to={'/head'}> */}
        <div onClick={()=>navigate('/head')} className={`flex items-center gap-2 py-4 rounded-md hover:bg-pri ${pathname.includes("/head")?'bg-pri':''}`}>
          <span className='w-[20%] flex justify-center items-center'>
          <MdPeople color='white'/>
          </span>
          <p className='text-white text-base'>Heads</p>
        </div>
        {/* </Link> */}
        {/* <Link to={'/admin'}> */}
        <div onClick={()=>navigate('/admin')} className={`flex items-center gap-2 py-4 rounded-md hover:bg-pri ${pathname.includes("/admin")?'bg-pri':''}`}>
          <span className='w-[20%] flex justify-center items-center'>
          <MdPerson color='white'/>
          </span>
          <p className='text-white text-base'>Admins</p>
        </div>
        {/* </Link> */}
        {/* <Link to={'/admin'}> */}
        <div onClick={()=>navigate('/account')} className={`flex items-center gap-2 py-4 rounded-md hover:bg-pri ${pathname.includes("/account")?'bg-pri':''}`}>
          <span className='w-[20%] flex justify-center items-center'>
          <MdSettings color='white'/>
          </span>
          <p className='text-white text-base'>Account</p>
        </div>
        {/* </Link> */}
        <div className='flex-1 flex items-end'>
          <button onClick={handleLogout} className='flex w-full items-center gap-4 justify-center p-4 bg-pri bg-blend-darken rounded-md'>
            <p className='text-white text-base font-light uppercase tracking-wider'>Logout</p>
            <MdLogout color='white'/>
          </button>
        </div>
      </div>
    );
  }
};

export default memo(SideBar);
