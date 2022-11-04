import React, { useEffect } from 'react';
import { useMemo } from 'react';
import { MdRefresh } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import ClientTable from '../../components/clientTable';
import CustomTable from '../../components/customTable';
import { getClient, getClientBySearch } from '../../logic/features/client/clientAction';
import indexSearch from '../../utils/searchCLients';

let timer;
const Client = () => {
  const dispatch = useDispatch();
  const stateClient = useSelector(state => state?.client);
  // console.log(data, 'client data');
  useEffect(() => {
    getClient(dispatch);
  }, []);

  const onChangeSearch = (value)=>{
    if (timer) {
        clearTimeout(timer);
    }
    timer = setTimeout(async () => {
      console.log(value.target.value);
        await getClientBySearch(dispatch,value.target.value);
    }, 300);
}

  const heads = useMemo(
    () => ({
      ID: '_id',
      'First Name': 'firstName',
      'Last Name': 'lastName',
      'Family Code': 'familyCode',
      Action: 'action',
    }),
    [],
  );

  return (
    <div className="flex w-full py-10 items-start h-full">
      <div className="w-[20%] h-full"></div>
      <div className="flex-1 flex flex-col gap-4 p-10 h-full">
      <div className="w-full flex items-center justify-between">
        <h4 className="mb-4 text-2xl font-light">{'Clients'}</h4>
        <button className="w-20 h-10 bg-pri border-none flex items-center justify-center rounded-md">
          <p className="font-bold text-lg text-white">+</p>
        </button>
      </div>
      <div className='w-full flex items-stretch gap-4'>
        <input onChange={onChangeSearch} placeholder='Search client' className="border-none outline-none px-4 py-2 rounded-md"/>
        <button onClick={()=>{getClient(dispatch)}} className="w-20 h-10 bg-pri border-none flex items-center justify-center rounded-md">
        {/* <button onClick={()=>{onChangeSearch('hshsh')}} className="w-20 h-10 bg-pri border-none flex items-center justify-center rounded-md"> */}
          <MdRefresh color='white'/>
        </button>
        {/* <button></button> */}
      </div>
        <CustomTable
          heads={heads}
          data={stateClient?.clients}
          title="Clients"
          loading={stateClient?.status === 'loading' || stateClient?.status === 'initial'}
        />
        {/* <ClientTable dataType={'client'} /> */}
      </div>
    </div>
  );
};

export default Client;
