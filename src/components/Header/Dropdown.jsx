import React, { useState } from "react";

const Dropdown = ({ isDropdownOpen, toggleDropdown }) => {
  return (
    <div className="relative flex flex-row justify-start items-start w-full">
      <div className="w-full bg-nav border-t-[0.5px] border-t-gray-100">
        <ul className="py-2 text-white">
          <li className="px-4 py-2 hover:bg-gray-100">Opción 1</li>
          <li className="px-4 py-2 hover:bg-gray-100">Opción 2</li>
          <li className="px-4 py-2 hover:bg-gray-100">Opción 3</li>
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
