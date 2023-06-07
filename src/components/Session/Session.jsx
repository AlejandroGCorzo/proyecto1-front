import React from "react";
import { Link } from "react-router-dom";

function Session({ handleLogOut, userRole }) {
  return (
    <>
      <li className=" w-80 h-10 pb-2 ">
        <button className="w-80 h-10 text-start flex justify-start items-start uppercase hover:text-orange transition-all ease-in-out">
          Mi cuenta
        </button>
      </li>
      <li className="border w-[90%]"></li>
      {userRole.includes("ADMIN") && (
        <Link to={"/admin"}>
          <li className=" w-80 h-10 pb-2 ">
            <button className="w-80 h-10 text-start flex justify-start items-start uppercase hover:text-orange transition-all ease-in-out">
              Panel admin
            </button>
          </li>
          <li className="border w-[90%]"></li>
        </Link>
      )}
      <li className="w-80 h-10 ">
        <button
          className="w-80 h-10 text-start flex justify-start items-start uppercase hover:text-orange transition-all ease-in-out"
          onClick={handleLogOut}
        >
          Salir
        </button>
      </li>
    </>
  );
}

export default Session;
