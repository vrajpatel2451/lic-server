import React, { useEffect } from 'react';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
}),[]);

  return (<div className='flex w-full py-10 items-start h-full'>
  <div className='w-[20%] h-full'></div>
  <div className='flex-1 p-10 h-full'>
      <CustomTable heads={heads} data={stateStaff?.admin} title='Admin' loading={stateStaff?.status==="loading"||stateStaff?.status==="initial"}/>
      {/* <ClientTable dataType={'client'} /> */}
    </div>
    </div>
  );
};

export default Admin;
