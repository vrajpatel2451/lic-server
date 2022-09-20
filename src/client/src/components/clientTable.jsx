import React from 'react';
import ListHeading from './listHeading';
import ListItem from './listItem';

const listHeadingData = [
  { item: 'ID' },
  { item: 'Name' },
  { item: 'Birthdate' },
  { item: 'City' },
  { item: 'State' },
];

const listItemData = [
  [
    {
      item: '1',
    },
    { item: 'Shubham Patel' },
    { item: '03/02/2003' },
    { item: 'Gandhinagar' },
    { item: 'Gujarat' },
  ],
  [
    { item: '2' },
    { item: 'Meet Patel' },
    { item: '24/12/2002' },
    { item: 'Pune' },
    { item: 'Maharashtra' },
  ],
  [
    { item: '3' },
    { item: 'Vraj Patel' },
    { item: '20/05/2000' },
    { item: 'Shimla' },
    { item: 'Himachal Pradesh' },
  ],
];

const ClientTable = () => {
  return (
    <div className="bg-white py-2 px-4 rounded-xl m-4">
      <div className="flex py-2 px-4">
        {listHeadingData.map(headingData => (
          <ListHeading headingData={headingData} />
        ))}
      </div>

      {listItemData.map(listData => (
        <ListItem listData={listData} />
      ))}
    </div>
  );
};

export default ClientTable;
