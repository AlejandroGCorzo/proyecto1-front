import React from "react";
import { Link } from "react-router-dom";

function Session({ handleLogOut, userRole }) {
  return (
    <>
      <li className=" w-80 h-10 pb-2 focus-visible:outline-none active:bg-white">
        <Link
          to={"/profile"}
          className="w-80 h-10 text-start flex justify-start items-start uppercase hover:text-orange ease-in-out focus-visible:outline-none active:bg-white"
        >
          Mi cuenta
        </Link>
      </li>
      <li className="border w-[90%]"></li>
      <li className="border w-[90%]"></li>
      {userRole.includes("ADMIN") && (
        <Link to={"/admin"}>
          <li className=" w-80 h-10 pb-2 focus-visible:outline-none active:bg-white">
            <button className="w-80 h-10 text-start flex justify-start items-start uppercase hover:text-orange ease-in-out focus-visible:outline-none active:bg-white">
              Panel admin
            </button>
          </li>
          <li className="border w-[90%]"></li>
        </Link>
      )}
      <li className="w-80 h-10 focus-visible:outline-none active:bg-white">
        <button
          className="w-80 h-10 text-start flex justify-start items-start uppercase hover:text-orange ease-in-out focus-visible:outline-none active:bg-white"
          onClick={handleLogOut}
        >
          Salir
        </button>
      </li>
    </>
  );
}

export default Session;
