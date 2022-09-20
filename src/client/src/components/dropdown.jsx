import React, { useState } from 'react';

const Dropdown = ({ options, value, onChange, placeholder }) => {
  return (
    <select
      className="py-2 px-4 bg-pri-dark focus:outline-none text-white cursor-pointer rounded-full"
      name="selectOption"
      value={value}
      onChange={onChange}
    >
      {placeholder && (
        <option className="bg-white text-black" value="selectOption">
          {placeholder}
        </option>
      )}
      {options.map((e, i) => (
        <option className="bg-white text-black" key={i} value={e.value}>
          {e.text}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
