import React from "react";

const Discount = ({ showDiscount, setShowDiscount }) => {
  return (
    <div className="flex flex-col text-header  justify-center items-center w-2/3">
      <label className="label flex flex-col justify-center items-start ">
        <span>Ingresar descuento</span>
        <div className="flex flex-row pt-4">
          <input
            type="text"
            placeholder="Código"
            className="input input-bordered w-full max-w-xs bg-grey outline-none focus-visible:outline-none rounded-tl-md rounded-bl-md rounded-tr-none rounded-br-none text.white h-12"
          />
          <button className="bg-header text-white py-3 px-2 rounded-tr-md rounded-br-md hover:bg-yellow transition-all">
            Añadir
          </button>
        </div>
      </label>
    </div>
  );
};

export default Discount;
