import React from 'react';
import ClientTable from '../components/clientTable';
import Dropdown from '../components/dropdown';
import Searchbar from '../components/searchbar';

const Home = () => {
  return (
    <>
      <Searchbar />
      <Dropdown />
      <ClientTable />;
    </>
  );
};

export default Home;
