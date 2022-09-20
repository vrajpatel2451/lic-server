import React from 'react';

const ListItem = ({ listData }) => {
  // console.log(listData);
  return (
    <div className="my-2 hover:bg-pri-light py-2 px-4 cursor-pointer rounded-xl flex gap-2 w-full items-center">
      {listData.map(data => (
        <h3 className="flex-1">{data.item}</h3>
      ))}
    </div>
  );
};

export default ListItem;
