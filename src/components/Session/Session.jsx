import React from "react";

function Session() {
  return (
    <>
      <li className=" w-80 h-10 pb-2 ">
        <button className="w-80 h-10 text-start flex justify-start items-start uppercase hover:text-orange transition-all ease-in-out">
          Mi cuenta
        </button>
      </li>
      <li className="border w-[90%]"></li>
      <li className="w-80 h-10 ">
        <button className="w-80 h-10 text-start flex justify-start items-start uppercase hover:text-orange transition-all ease-in-out">
          Salir
        </button>
      </li>
    </>
  );
}

export default Session;
