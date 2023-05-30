import React from "react";
import { FaShoppingCart } from "react-icons/fa";

const ShoppingCart = ({ isOpen, toggleShoppingCart }) => {
  return (
    <div
      className={`fixed inset-0 flex flex-1 z-50 justify-end ${
        isOpen ? "flex" : "hidden"
      }`}
    >
      <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
      <div className="flex flex-col w-3/4 sm:w-1/2 lg:w-1/4 lg bg-white transform transition-transform duration-300 ease-in-out">
        <div className="flex justify-between items-center px-4 py-3 bg-gray-200">
          <h1 className="text-lg font-semibold">Carrito</h1>
          <button
            className="text-gray-600 focus:outline-none"
            onClick={toggleShoppingCart}
          >
            <svg
              className="h-6 w-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M14.348 14.849a.5.5 0 0 1-.707 0L10 10.708l-3.646 3.647a.5.5 0 1 1-.708-.708L9.292 10l-3.647-3.646a.5.5 0 1 1 .708-.708L10 9.292l3.646-3.647a.5.5 0 0 1 .708.708L10.708 10l3.647 3.646a.5.5 0 0 1 0 .708z"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-grow items-center justify-center">
          <div className=" flex flex-col justify-center items-center text-gray-500">
            <FaShoppingCart fontSize={80} />
            <p>Su carrito está vacío.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
