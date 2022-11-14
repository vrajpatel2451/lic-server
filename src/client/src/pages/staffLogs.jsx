import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import LogsComponent from '../components/LogsComponent';
import { getAdminLogs, getStaffLogs } from '../logic/features/logs/logsAction';

const StaffLogs = () => {
    const dispatch = useDispatch();
    const stateLog = useSelector(state=>state.logs);
    const params = useParams();
    console.log(stateLog);
    useEffect(()=>{
        getStaffLogs(dispatch,params.id);
    },[]);
  return (<div className='flex w-full py-10 items-start h-full'>
  <div className='w-[20%] h-full'></div>
  <div className='flex-1 flex flex-wrap gap-4 p-10'>
    <h2 className='w-full text-left'>Staff Logs</h2>
    {
        stateLog?.staffLogs?.map((e,i)=><LogsComponent index={i+1} key={i} {...e}/>)
    }
  </div>
  </div>
  )
}

export default StaffLogs;