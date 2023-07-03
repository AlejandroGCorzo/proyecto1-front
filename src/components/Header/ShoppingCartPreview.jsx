import React, { useEffect, useRef, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { RiShoppingBagFill } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { updateCartAction } from "../../redux/shoppingCartActions";
import { ConfirmationComponent } from "../../utils/DeleteSteps";
import Loading from "../../utils/Loading";
import { Link } from "react-router-dom";

const ShoppingCart = ({ isOpen, toggleShoppingCart }) => {
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  const { productos, totalSinDescuento, loading } = useSelector(
    (state) => state.cart
  );
  const { products } = useSelector((state) => state.products);
  const [onDelete, setOnDelete] = useState(null);
  const [itemToDelete, setItemToDelete] = useState({ nombre: "", id: "" });
  const [section, setSection] = useState("carrito de compras");
  const [confirmed, setConfirmed] = useState(false);

  const toggleModal = (e) => {
    modalRef.current.classList.toggle("modal-open");
    document.activeElement.blur();
    if (onDelete) {
      setOnDelete(false);
    } else {
      setOnDelete(true);
    }
    if (confirmed) {
      setConfirmed(false);
    }
  };

  const handleRemove = (e) => {
    if (e.target.parentElement) {
      setItemToDelete({
        nombre: "producto",
        id: e.target.parentElement.id,
      });
      toggleModal();
    } else {
      setItemToDelete({
        nombre: "producto",
        id: e.target.id,
      });
      toggleModal();
    }
  };

  const handleSelectChange = (e) => {
    const { value, name, id } = e.target;

    if (value === "remove") {
      setItemToDelete({ nombre: "producto", id: id });
      toggleModal();
    } else {
      dispatch(updateCartAction({ itemId: id, quantity: Number(value) }));
    }
  };

  return (
    <div
      className={`fixed inset-0 flex flex-1 z-[9999] justify-end transition-all ease-in-out ${
        isOpen ? "flex" : "hidden"
      }`}
    >
      <div className="absolute inset-0 bg-gray-900 opacity-50"></div>

      <dialog ref={modalRef} className="modal bg-grey/40">
        <div className="modal-box bg-grey">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-fontDark text-xl"
            onClick={toggleModal}
          >
            ✕
          </button>

          {loading ? (
            <div className="w-full h-28 flex justify-center items-center">
              <Loading />
            </div>
          ) : (
            <ConfirmationComponent
              onDelete={onDelete}
              toggleModal={toggleModal}
              confirmed={confirmed}
              setConfirmed={setConfirmed}
              itemToDelete={itemToDelete}
              setItemToDelete={setItemToDelete}
              section={section}
            />
          )}
        </div>
      </dialog>
      <div className="flex flex-col w-3/4 sm:w-1/2 lg:w-[40%] xl:w-[20%] bg-white transform transition-transform duration-300 ease-in-out">
        <div className="flex justify-between items-center px-4 py-3 bg-gray-200">
          <h1 className="text-xl text-fontDark font-semibold">Carrito</h1>

          <button
            className="text-fontDark focus:outline-none"
            onClick={toggleShoppingCart}
          >
            <svg
              className="h-8 w-8 fill-current"
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
        {productos?.length ? (
          <div className="w-full h-full flex flex-col justify-between items-center bg-white">
            <div className="max-h-[60%] w-full p-4 self-start overflow-y-auto">
              {productos?.length > 0 &&
                productos.map((elem) => (
                  <div
                    key={elem.id}
                    className="border-b flex flex-row justify-start items-start py-5 w-full"
                  >
                    <div className="flex h-1/3 py-1 border">
                      <img
                        className="max-w-[100px]"
                        src={elem.productData.imagenes[0]}
                        alt={elem.productData.modelo}
                      />
                    </div>
                    <div className="w-[65%] flex flex-col justify-between items-start pl-4">
                      <h2 className="text-header uppercase max-w-[90%]">
                        {elem.productData.modelo}
                      </h2>
                      <p className="pb-1 uppercase text-header">
                        Talle: {elem.size}
                      </p>
                      <p className="text-lg pb-1 font-medium text-header">
                        $ {elem.productData.precio},00
                      </p>
                      <select
                        id={elem.id}
                        name={elem.productData.modelo}
                        className="select select-xs select-bordered rounded justify-center items-center max-w-[60px] bg-white text-base text-fontDark focus:outline-none focus-visible:outline-none"
                        value={elem.quantity}
                        onChange={handleSelectChange}
                      >
                        <option
                          value={"remove"}
                          className="focus-visible:outline-none"
                        >
                          0 - Retirar
                        </option>
                        {elem.productData.talle.length > 0 &&
                          Array.from(
                            {
                              length: elem.productData.talle.find(
                                (tall) => tall.talle === elem.size
                              ).cantidad,
                            },
                            (_, index) => index + 1
                          ).map((el) => (
                            <option
                              key={el + "quantity"}
                              value={el}
                              className="focus-visible:outline-none"
                            >
                              {el}
                            </option>
                          ))}
                      </select>
                    </div>
                    <button
                      className="w-[10%]"
                      onClick={handleRemove}
                      id={elem.id}
                      name={elem.productData.modelo}
                    >
                      <MdDeleteOutline
                        fontSize={20}
                        id={elem.id}
                        name={elem.productData.modelo}
                        className="w-full"
                      />
                    </button>
                  </div>
                ))}
            </div>
            <div className="h-full max-h-[55%] flex flex-col ">
              <div className="h-80 w-full flex flex-col justify-start items-start px-6 py-4 border-t ">
                <div className="flex w-full flex-row justify-between text-header text-lg">
                  <span>Subtotal</span> <span>$ {totalSinDescuento}</span>
                </div>
                <div className="flex w-full flex-row justify-between py-2 font-bold text-header text-xl">
                  <span className="uppercase">total</span>{" "}
                  <span>$ {totalSinDescuento}</span>
                </div>
              </div>
              <div
                className="flex flex-col justify-start items-center  py-8 px-6 gap-6 border-t"
                style={{
                  boxShadow: "rgba(0, 0, 0, 0.1) 0px -5px 10px 0px",
                }}
              >
                <p className="text-center text-header/80 font-medium text-lg">
                  Los gastos de envío serán calculados al finalizar tu compra.
                </p>{" "}
                <Link
                  to={"/checkout"}
                  className="btn bg-header hover:opacity-70 text-white w-full flex justify-center items-center text-[17px] "
                  onClick={() => toggleShoppingCart()}
                >
                  <RiShoppingBagFill /> Finalizar compra
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className=" flex flex-grow items-center justify-center">
            <div className=" flex flex-col justify-center items-center text-gray-500">
              <FaShoppingCart fontSize={80} />
              <p>Su carrito está vacío.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
