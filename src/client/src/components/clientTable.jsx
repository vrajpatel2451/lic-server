import React, { useState } from 'react';
import '../styles/style.css';
import ButtonComponent from './buttonComponent';
import { MdFilterList } from 'react-icons/md';
import Dropdown from './dropdown';

const ClientTable = () => {
  const listHeadingData = [
    { headItem: 'ID' },
    { headItem: 'Name' },
    { headItem: 'Birthdate' },
    { headItem: 'City' },
    { headItem: 'State' },
  ];

  const listItemData = [
    { item: '1', name: 'Shubham Patel', date: '03/02/2003', city: 'Gandhinagar', state: 'Gujarat' },
    { item: '2', name: 'Meet Patel', date: '24/12/2002', city: 'Pune', state: 'Maharashtra' },
    {
      item: '3',
      name: 'Vraj Patel',
      date: '20/05/2000',
      city: 'Shimla',
      state: 'Himachal Pradesh',
    },
  ];

  const options = [
    { text: 'Option 1', value: 'option1' },
    { text: 'Option 2', value: 'option2' },
    { text: 'Option 3', value: 'option3' },
  ];

  const [dropdownValue, setDropdownValue] = useState('');
  return (
    <div className="bg-white py-2 px-4 rounded-xl">
      <div className="flex justify-between items-center mb-4 ">
        <h5 className="p-4 font-semibold">Staff Table</h5>
        <Dropdown
          placeholder="Filter"
          value={dropdownValue}
          onChange={e => setDropdownValue(e.target.value)}
          options={options}
        />
      </div>
      <table className="w-full">
        <tr>
          {listHeadingData.map((headingData, i) => (
            <th className="py-4">{headingData.headItem}</th>
          ))}
        </tr>
        {listItemData.map((itemData, i) => (
          <tr className="hover:bg-pri-light rounded-full text-gray hover:text-black">
            <td className="text-center py-4">{itemData.item}</td>
            <td className="text-center py-4">{itemData.name}</td>
            <td className="text-center py-4">{itemData.date}</td>
            <td className="text-center py-4">{itemData.city}</td>
            <td className="text-center py-4">{itemData.state}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default ClientTable;
