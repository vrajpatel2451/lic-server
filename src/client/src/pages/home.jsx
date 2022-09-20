import React, { useState } from 'react';
import ClientTable from '../components/clientTable';
import Dropdown from '../components/dropdown';
import Searchbar from '../components/searchbar';

const options = [
  { text: 'Option 1', value: 'option1' },
  { text: 'Option 2', value: 'option2' },
  { text: 'Option 3', value: 'option3' },
];

console.log(window.location.href.split('/')[3] === '', 'url');

const Home = () => {
  const [dropdownValue, setDropdownValue] = useState('option1');
  console.log(dropdownValue);
  return (
    <>
      <Dropdown
        value={dropdownValue}
        onChange={e => setDropdownValue(e.target.value)}
        options={options}
      />
      <ClientTable />
    </>
  );
};

export default Home;
