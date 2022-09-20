import React, { useState } from 'react';

const Dropdown = ({ options }) => {
  const [dropdownValue, setDropdownValue] = useState('');

  console.log(dropdownValue);

  return (
    <select
      name="selectOption"
      value={dropdownValue}
      onChange={e => setDropdownValue(e.target.value)}
    >
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
      <option value="option4">Option 4</option>
    </select>
  );
};

export default Dropdown;
