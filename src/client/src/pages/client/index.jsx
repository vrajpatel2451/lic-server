import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClientTable from '../../components/clientTable';

const Client = () => {
  // console.log(data, 'client data');
  return (
    <div>
      <ClientTable dataType={'client'} />
    </div>
  );
};

export default Client;
