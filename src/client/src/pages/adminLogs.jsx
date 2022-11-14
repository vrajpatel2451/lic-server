import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import LogsComponent from '../components/LogsComponent';
import { getAdminLogs } from '../logic/features/logs/logsAction';

const AdminLogs = () => {
    const dispatch = useDispatch();
    const stateLog = useSelector(state=>state.logs);
    console.log(stateLog);
    useEffect(()=>{
        getAdminLogs(dispatch);
    },[]);
  return (<div className='flex w-full py-10 items-start h-full'>
  <div className='w-[20%] h-full'></div>
  <div className='flex-1 flex flex-wrap gap-4 p-10'>
    <h2 className='w-full text-left'>Admin Logs</h2>
    {
        stateLog?.adminLogs?.map((e,i)=><LogsComponent index={i+1} key={i} {...e}/>)
    }
  </div>
  </div>
  )
}

export default AdminLogs