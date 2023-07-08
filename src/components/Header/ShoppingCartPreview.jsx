import React, { useEffect, useRef, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { RiShoppingBagFill } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCartAction,
  updateCartAction,
} from "../../redux/shoppingCartActions";
import { ConfirmationComponent } from "../../utils/DeleteSteps";
import Loading from "../../utils/Loading";
import { Link } from "react-router-dom";
import { formatearPrecio } from "../../utils/formatPrice";

const ShoppingCart = ({ isOpen, toggleShoppingCart }) => {
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  const { productos, totalSinDescuento, loading } = useSelector(
    (state) => state.cart
  );
  const { isLoggedIn } = useSelector((state) => state.users);
  const { products } = useSelector((state) => state.products);
  const [error, setError] = useState(false);
  const [onDelete, setOnDelete] = useState(null);
  const [itemToDelete, setItemToDelete] = useState({ nombre: "", id: "" });
  const [section, setSection] = useState("carrito de compras");
  const [confirmed, setConfirmed] = useState(false);
  const [productsInCart, setProductsInCart] = useState([]);

  useEffect(() => {
    if (productos.length && products?.length) {
      let foundProduct = [];
      for (let i = 0; i < productos.length; i++) {
        foundProduct.push(
          products?.find((elem) => elem._id === productos[i].producto)
        );
      }
      foundProduct = foundProduct.sort((a, b) =>
        a.descripcion.localeCompare(b.descripcion)
      );
      setProductsInCart(foundProduct);
    } else if (!productos?.length) {
      setProductsInCart([]);
    }
  }, [productos, products]);

  const toggleModal = (e) => {
    modalRef?.current?.classList?.toggle("modal-open");
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
    if (error) {
      setError(false);
    }
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

  const handleAmount = (e) => {
    const { value, name, id } = e.target;
    const itemToUpdate = productos.find((elem) => elem.producto === name);
    const productData = productsInCart.find(
      (elem) => elem._id === itemToUpdate.producto
    );

    if (value === "+") {
      dispatch(
        updateCartAction({
          itemId: name,
          cantidad: itemToUpdate.cantidad + 1,
        })
      );
    } else {
      if (itemToUpdate.cantidad - 1 === 0) {
        if (error) {
          setError(false);
        }
        setItemToDelete({
          nombre: "producto",
          id: name,
        });
        toggleModal();
      }
      if (itemToUpdate.cantidad > 0 && itemToUpdate.cantidad - 1 !== 0) {
        dispatch(
          updateCartAction({
            itemId: name,
            cantidad: itemToUpdate.cantidad - 1,
          })
        );
      }
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 flex flex-1 z-[9999] justify-end transition-all ease-in-out ${
          isOpen ? "flex" : "hidden"
        }`}
      >
        <div className="absolute inset-0 bg-gray-900 opacity-50"></div>

        <dialog ref={modalRef} className="modal bg-grey/40">
          <div className="modal-box bg-white">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-header text-xl"
              onClick={toggleModal}
            >
              ✕
            </button>

            {loading ? (
              <div className="w-full h-28 flex justify-center items-center">
                <Loading />
              </div>
            ) : error ? (
              <div className="alert alert-warning w-[97%]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <span>
                  Ha agregado todos los productos en stock del Talle
                  seleccionado.
                </span>
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
        <div className="flex flex-col w-3/4 sm:w-1/2 lg:w-[40%] xl:w-[35%] 2xl:w-[20%] bg-white transform transition-transform duration-300 ease-in-out h-auto ">
          <div className="flex justify-between items-center px-4 py-3 bg-gray-200">
            <h1 className="text-xl text-header font-semibold">Carrito</h1>

            <button
              className="text-header focus:outline-none"
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
            <>
              <div className="w-full flex justify-end items-center p-2">
                <button
                  className=" text-yellow  py-1  px-4 font-medium rounded bg-header hover:bg-yellow/80 hover:text-header border border-header w-full md:w-auto transition-all  whitespace-nowrap"
                  onClick={() => dispatch(clearCartAction())}
                >
                  Vaciar carrito
                </button>
              </div>
              <div className="w-full h-full flex flex-col justify-start items-center bg-white">
                <div className="max-h-[50%] xl:max-h-[55%] xl:h-[60%] w-full px-2 self-start overflow-y-auto">
                  {productsInCart?.length > 0 &&
                    productsInCart.map((elem) => (
                      <div
                        key={elem._id + "cartPreview"}
                        className="border-b flex flex-row justify-start items-center py-5 w-full"
                      >
                        <div className="flex h-1/3 w-1/3 justify-center items-center">
                          <img
                            className="max-w-[100px] h-24"
                            src={
                              elem.imagen?.length ? elem.imagen : elem.imagenes
                            }
                            alt={elem.descripcion}
                          />
                        </div>
                        <div className="w-[65%] flex flex-col justify-between items-center pl-4">
                          <h2 className="text-header uppercase text-center w-auto h-auto">
                            {elem.descripcion}
                          </h2>
                          {productos?.find((item) => item.producto === elem._id)
                            ?.precio < elem.precio ? (
                            <div className="flex flex-row w-auto gap-2">
                              <p className="text-lg pb-1 font-medium text-header/60 w-full text-center line-through">
                                {formatearPrecio(elem.precio)}
                              </p>
                              <p className="text-lg pb-1 font-medium text-header w-full text-center">
                                {formatearPrecio(
                                  productos?.find(
                                    (item) => item.producto === elem._id
                                  ).precio
                                )}
                              </p>
                            </div>
                          ) : (
                            <p className="text-lg pb-1 font-medium text-header w-full text-center">
                              {formatearPrecio(elem.precio)}
                            </p>
                          )}

                          <div className="w-auto flex justify-center items-center flex-row flex-nowrap px-2">
                            <button
                              className="hover:opacity-70 min-h-6 h-8 flex justify-center items-center py-1 px-[6px] bg-header text-white font-medium text-xl rounded-tl-md rounded-bl-md rounded-tr-none rounded-br-none border-none outline-none"
                              value={"-"}
                              name={elem._id}
                              onClick={handleAmount}
                            >
                              -
                            </button>
                            <span className="py-1 px-2 text-header text-xl">
                              {
                                productos?.find(
                                  (item) => item.producto === elem._id
                                )?.cantidad
                              }
                            </span>

                            <button
                              className="hover:opacity-70 min-h-6 h-8 flex justify-center items-center p-1 bg-header text-white font-medium text-lg rounded-tr-md rounded-br-md rounded-tl-none rounded-bl-none border-none outline-none"
                              value={"+"}
                              name={elem._id}
                              onClick={handleAmount}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <button
                          className="w-[10%] pt-2"
                          onClick={handleRemove}
                          id={elem._id}
                          name={elem.descripcion}
                        >
                          <MdDeleteOutline
                            fontSize={20}
                            id={elem._id}
                            name={elem.descripcion}
                            className="w-full text-header"
                          />
                        </button>
                      </div>
                    ))}
                </div>
                <div className="h-auto max-h-[30%] flex flex-col w-full justify-center items-center">
                  <div className="h-32 2xl:h-72 w-full flex flex-col justify-center items-center px-6 py-4 border-t bg-white z-10">
                    <div className="flex w-full flex-row justify-between text-header text-lg">
                      <span>Subtotal</span>{" "}
                      <span>{formatearPrecio(totalSinDescuento)}</span>
                    </div>
                    <div className="flex w-full flex-row justify-between py-2 font-bold text-header text-xl">
                      <span className="uppercase">total</span>{" "}
                      <span>{formatearPrecio(totalSinDescuento)}</span>
                    </div>
                  </div>
                  <div
                    className="flex flex-col justify-center items-center py-4 xl:py-8 px-6 gap-6 border-t"
                    style={{
                      boxShadow: "rgba(0, 0, 0, 0.1) 0px -5px 10px 0px",
                    }}
                  >
                    <p className="text-center text-header/80 font-medium text-lg">
                      Los gastos de envío serán calculados al finalizar tu
                      compra.
                    </p>{" "}
                    <Link
                      to={"/checkout/form"}
                      className="btn bg-header hover:opacity-70 text-white w-full flex justify-center items-center text-[17px] "
                      onClick={() => toggleShoppingCart()}
                    >
                      <RiShoppingBagFill /> Finalizar compra
                    </Link>
                  </div>
                </div>
              </div>
            </>
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
    </>
  );
};

export default ShoppingCart;
