import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClientTable from '../../components/clientTable';

const Client = ({ data }) => {
  // console.log(data, 'client data');
  return (
    <div>
      <ClientTable dataType={'client'} data={data} />
    </div>
  );
};

export default Client;
