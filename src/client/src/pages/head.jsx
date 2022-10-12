import React, { useEffect } from 'react';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomTable from '../components/customTable';
import { getHead } from '../logic/features/staff/staffAction';

const Head = () => {

  const dispatch = useDispatch();
  const stateStaff = useSelector(state => state?.staff);
  // console.log(data, 'client data');
  useEffect(() => {
    getHead(dispatch);
  }, [])
  
  const heads = useMemo(()=>({
    "ID":"_id",
    "First Name":"firstName",
    "Last Name":"lastName",
    "Departments":"departments",
    "Branch":"branch",
}),[]);

  return (<div className='flex w-full py-10 items-start h-full'>
  <div className='w-[20%] h-full'></div>
  <div className='flex-1 p-10 h-full'>
      <CustomTable heads={heads} data={stateStaff?.head} title='Head' loading={stateStaff?.status==="loading"||stateStaff?.status==="initial"}/>
      {/* <ClientTable dataType={'client'} /> */}
    </div>
    </div>
  );
};

export default Head;