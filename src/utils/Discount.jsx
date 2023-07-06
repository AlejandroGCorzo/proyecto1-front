import React, { useState } from "react";
import ServerError from "./ServerError";
import ServerSuccess from "./ServerSuccess";
import { useDispatch, useSelector } from "react-redux";
import { validateCupon } from "../redux/shoppingCartActions";

const Discount = ({ showDiscount, setShowDiscount }) => {
  const dispatch = useDispatch();
  const [cupon, setCupon] = useState("");
  const [errorCuponState, setErrorCuponState] = useState("");
  const { errorCupon, successCupon } = useSelector((state) => state.cart);
  const { userId } = useSelector((state) => state.users);

  const handleChange = (e) => {
    const { value } = e.target;
    if (value) {
      if (errorCuponState) {
        setErrorCupon("");
      }
      setCupon(value);
    } else {
      setCupon("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cupon?.length && userId.length) {
      //enviar codigo al back
      dispatch(validateCupon({ userId: userId, nombre: cupon }));
      //limpiar nombre
      setCupon("");
    } else if (!cupon.length) {
      setErrorCuponState("Debe ingresar el nombre del cupón");
    }
  };

  return (
    <form
      className="flex flex-col text-header  justify-center items-center w-2/3"
      onSubmit={handleSubmit}
    >
      <label className="label flex flex-col justify-center items-start ">
        <span>Ingresar descuento</span>
        <div className="flex flex-row pt-4">
          <input
            value={cupon}
            onChange={handleChange}
            type="text"
            placeholder="Código"
            className="input input-bordered w-full max-w-xs bg-grey outline-none focus-visible:outline-none rounded-tl-md rounded-bl-md rounded-tr-none rounded-br-none text.white h-12"
          />
          <button
            type="submit"
            className="bg-header text-white py-3 px-2 rounded-tr-md rounded-br-md hover:bg-yellow transition-all"
          >
            Añadir
          </button>
        </div>
      </label>
      {errorCuponState && errorCuponState.length > 0 ? (
        <ServerError error={errorCuponState} />
      ) : (
        errorCupon &&
        errorCupon.length > 0 && <ServerError error={errorCuponState} />
      )}
      {successCupon && successCupon.length > 0 && (
        <ServerSuccess success={successCupon} />
      )}
    </form>
  );
};

export default Discount;
