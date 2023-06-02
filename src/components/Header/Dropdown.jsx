import React from "react";

const Dropdown = ({ isDropdownOpen, toggleDropdown }) => {
  return (
    <div className="relative flex flex-row justify-start items-start w-full bg-nav py-2">
      <div className="w-full  border-t-[0.5px] border-t-gray-500/50 flex flex-row justify-evenly items-center">
        <ul className="py-1 ">
          <li className="px-4 py-1  transition-all ease-in-out pb-1 uppercase hover:border-b hover:border-b-grid text-grid ">
            Title
          </li>
          <li className="px-4 py-1 hover:border-b hover:border-b-white text-white">
            Opción 1
          </li>
          <li className="px-4 py-1 hover:border-b hover:border-b-white text-white">
            Opción 2
          </li>
          <li className="px-4 py-1 hover:border-b hover:border-b-white text-white">
            Opción 3
          </li>
        </ul>
        <ul className="py-1 text-white">
          <li className="px-4 py-1  transition-all ease-in-out pb-1 uppercase hover:border-b hover:border-b-grid text-grid ">
            Title
          </li>
          <li className="px-4 py-1 hover:border-b hover:border-b-white text-white">
            Opción 1
          </li>
          <li className="px-4 py-1 hover:border-b hover:border-b-white text-white">
            Opción 2
          </li>
          <li className="px-4 py-1 hover:border-b hover:border-b-white text-white">
            Opción 3
          </li>
        </ul>
        <ul className="py-1 text-white">
          <li className="px-4 py-1 transition-all ease-in-out pb-1 uppercase hover:border-b hover:border-b-grid text-grid ">
            Title
          </li>
          <li className="px-4 py-1 hover:border-b hover:border-b-white text-white">
            Opción 1
          </li>
          <li className="px-4 py-1 hover:border-b hover:border-b-white text-white">
            Opción 2
          </li>
          <li className="px-4 py-1 hover:border-b hover:border-b-white text-white">
            Opción 3
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
