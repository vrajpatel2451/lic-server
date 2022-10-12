import React, { useEffect } from 'react';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClientTable from '../../components/clientTable';
import CustomTable from '../../components/customTable';
import { getClient } from '../../logic/features/client/clientAction';

const Client = () => {

  const dispatch = useDispatch();
  const stateClient = useSelector(state => state?.client);
  // console.log(data, 'client data');
  useEffect(() => {
    getClient(dispatch);
  }, [])
  
  const heads = useMemo(()=>({
    "ID":"_id",
    "First Name":"firstName",
    "Last Name":"lastName",
    "Family Code":"familyCode",
    "Action":"action",
}),[]);

  return (<div className='flex w-full py-10 items-start h-full'>
  <div className='w-[20%] h-full'></div>
  <div className='flex-1 p-10 h-full'>
      <CustomTable heads={heads} data={stateClient?.clients} title='Clients' loading={stateClient?.status==="loading"||stateClient?.status==="initial"}/>
      {/* <ClientTable dataType={'client'} /> */}
    </div>
    </div>
  );
};

export default Client;
