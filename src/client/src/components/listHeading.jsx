import React from 'react';

const ListHeading = ({ headingData }) => {
  // console.log(headingData);
  return <h2 className="flex-1 font-bold">{headingData.item}</h2>;
};

export default ListHeading;
