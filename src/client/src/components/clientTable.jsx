import React, { useState } from 'react';
import '../styles/style.css';
import ButtonComponent from './buttonComponent';
import { MdFilterList } from 'react-icons/md';
import Dropdown from './dropdown';

const ClientTable = ({ dataType, data = [] }) => {
  // console.log(dataType, 'staff datatype');
  console.log(data, 'data');
  const staffHeadingData = [
    { headItem: 'ID' },
    { headItem: 'Name' },
    { headItem: 'Role' },
    { headItem: 'Departments' },
    { headItem: 'Branch' },
  ];

  const clientHeadingData = [
    { headItem: 'ID' },
    { headItem: 'Name' },
    { headItem: 'Birthdatae' },
    { headItem: 'Departments' },
    { headItem: 'Branch' },
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
        <h5 className="p-4 font-semibold">
          {dataType === 'staff' && 'Staff List'}
          {dataType === 'client' && 'Client List'}
        </h5>
        <Dropdown
          placeholder="Filter"
          value={dropdownValue}
          onChange={e => setDropdownValue(e.target.value)}
          options={options}
        />
      </div>
      <table className="w-full">
        <thead>
          <tr>
            {dataType === 'staff' &&
              staffHeadingData?.map((headingData, i) => (
                <th className="py-4">{headingData.headItem}</th>
              ))}
            {dataType === 'client' &&
              clientHeadingData?.map((headingData, i) => (
                <th className="py-4">{headingData.headItem}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((e, i) => (
            <tr key={i}>
              <td>{`#${e?._id}`}</td>
              <td>{`${e?.firstName} ${e?.lastName}`}</td>
              <td>{e.role}</td>
              <td>{e?.department?.length === 0 ? '-' : e?.department?.length}</td>
              <td>{e?.branch?.name}</td>
            </tr>
          ))}
          {/* <tr>{data.map((item, i) => console.log(item[0], 'indi data'))}</tr> */}
          {/* {listItemData.map((itemData, i) => (
          <tr className="hover:bg-pri-light rounded-full text-gray hover:text-black">
          <td className="text-center py-4">{itemData.item}</td>
          <td className="text-center py-4">{itemData.name}</td>
          <td className="text-center py-4">{itemData.date}</td>
          <td className="text-center py-4">{itemData.city}</td>
          <td className="text-center py-4">{itemData.state}</td>
          </tr>
        ))} */}
        </tbody>
      </table>
    </div>
  );
};

export default ClientTable;
