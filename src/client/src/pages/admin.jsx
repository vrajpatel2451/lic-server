import React, { useEffect } from 'react';
import { useMemo } from 'react';
import { MdRefresh } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CustomTable from '../components/customTable';
import { getAdmin } from '../logic/features/staff/staffAction';

const Admin = () => {

  const dispatch = useDispatch();
  const stateStaff = useSelector(state => state?.staff);
  // console.log(data, 'client data');
  useEffect(() => {
    getAdmin(dispatch);
  }, [])
  
  const heads = useMemo(()=>({
    "ID":"_id",
    "First Name":"firstName",
    "Last Name":"lastName",
    "Email":"email",
    "Phone":"phone",
    "Action":"action",
}),[]);

  return (<div className='flex w-full py-10 items-start h-full'>
  <div className='w-[20%] h-full'></div>
  <div className='flex-1 flex flex-col gap-4 p-10 h-full'>
  <div className="w-full flex items-center justify-between">
        <h4 className=" text-2xl font-light">{'Admins'}</h4>
        <button className="w-20 h-10 bg-pri border-none flex items-center justify-center rounded-md">
          <p className="font-bold text-lg text-white">+</p>
        </button>
      </div>
      <div className='w-full flex items-stretch gap-4'>
        {/* <select>
          <option>Select Department</option>
        </select> */}
        {/* <input onChange={onChangeSearch} placeholder='Search client' className="border-none outline-none px-4 py-2 rounded-md"/> */}
        <Link to={'/logs/admin'}><p className='px-4 h-10 bg-pri-dark border-none flex items-center justify-center rounded-md text-white'>See Logs</p></Link>
        <button onClick={()=>{getAdmin(dispatch)}} className="w-20 h-10 bg-pri border-none flex items-center justify-center rounded-md">
        {/* <button onClick={()=>{onChangeSearch('hshsh')}} className="w-20 h-10 bg-pri border-none flex items-center justify-center rounded-md"> */}
          <MdRefresh color='white'/>
        </button>
        {/* <button></button> */}
      </div>
      <CustomTable heads={heads} data={stateStaff?.admin} title='Admin' loading={stateStaff?.status==="loading"||stateStaff?.status==="initial"}/>
      {/* <ClientTable dataType={'client'} /> */}
    </div>
    </div>
  );
};

export default Admin;
