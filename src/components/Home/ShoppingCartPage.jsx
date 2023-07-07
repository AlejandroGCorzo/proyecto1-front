import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCartAction,
  updateCartAction,
} from "../../redux/shoppingCartActions";
import Loading from "../../utils/Loading";
import { ConfirmationComponent } from "../../utils/DeleteSteps";
import { MdDeleteOutline } from "react-icons/md";
import { RiShoppingBagFill } from "react-icons/ri";
import { FaShoppingCart } from "react-icons/fa";
import { TbShoppingCartDiscount } from "react-icons/tb";
import { Link } from "react-router-dom";
import Discount from "../../utils/Discount";
import { formatearPrecio } from "../../utils/formatPrice";

const ShoppingCartPage = () => {
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  const { productos, totalSinDescuento, loading } = useSelector(
    (state) => state.cart
  );
  const { isLoggedIn } = useSelector((state) => state.users);
  const { products } = useSelector((state) => state.products);
  const [productsInCart, setProductsInCart] = useState([]);
  const [buySteps, setBuySteps] = useState(false);
  const [error, setError] = useState(false);
  const [onDelete, setOnDelete] = useState(null);
  const [itemToDelete, setItemToDelete] = useState({ nombre: "", id: "" });
  const [section, setSection] = useState("carrito de compras");
  const [confirmed, setConfirmed] = useState(false);
  const [showDiscount, setShowDiscount] = useState(false);

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
    document?.activeElement?.blur();
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
    console.log(name);
    const itemToUpdate = productos.find((elem) => elem.producto === name);
    console.log(itemToUpdate);
    const productData = productsInCart.find(
      (elem) => elem._id === itemToUpdate.producto
    );
    /*    const productStock = productData.talle.find(
      (elem) => elem.talle === itemToUpdate.size
    ).cantidad; */

    if (value === "+") {
      /*    if (itemToUpdate.cantidad + 1 > productStock) {
        setError(true);
        toggleModal();
      } else { */
      dispatch(
        updateCartAction({
          itemId: name,
          cantidad: itemToUpdate.cantidad + 1,
        })
      );
      /* } */
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

  const handleBuy = (e) => {
    setBuySteps(true);
  };

  return (
    <div className="w-full h-auto flex flex-col justify-start items-start md:justify-center md:items-center  max-h-max bg-fontGrey">
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
      {!buySteps && (
        <div className="flex justify-start items-center px-2 ">
          <h1 className="flex w-full py-6 text-center uppercase text-xl text-header font-semibold">
            Carrito de compras
          </h1>
        </div>
      )}
      <div className="flex flex-col items-center justify-center w-full bg-grey ">
        {productos?.length > 0 ? (
          <>
            <div className="w-full h-full max-w-[90%] flex flex-col lg:flex-row justify-center items-center lg:justify-around lg:items-start gap-6">
              <div className="h-auto w-full 2xl:max-w-[70%] flex flex-col justify-between gap-2 overflow-y-auto p-2 bg-grey">
                <div className="w-full flex justify-end items-center p-2">
                  <button
                    className=" text-yellow  py-1  px-4 font-medium rounded bg-header hover:bg-yellow/80 hover:text-header border border-header w-full md:w-auto transition-all  whitespace-nowrap"
                    onClick={() => dispatch(clearCartAction())}
                  >
                    Vaciar carrito
                  </button>
                </div>
                {productsInCart?.length > 0 && !buySteps ? (
                  productsInCart?.map((elem) => (
                    <div
                      key={elem._id + "cartPage"}
                      className=" flex flex-row justify-between items-center w-full h-40 border py-3 px-2 sm:px-6 bg-white"
                    >
                      <Link
                        to={`/product/${elem._id}`}
                        className="flex h-full w-36 py-1 border"
                      >
                        <img
                          className="h-full w-full object-contain aspect-auto"
                          src={
                            elem?.imagen?.length ? elem.imagen : elem.imagenes
                          }
                          alt={elem.descripcion}
                        />
                      </Link>
                      <div className="w-full flex flex-col sm:flex-row justify-center items-center sm:justify-between sm:items-center pl-4">
                        <Link to={`/product/${elem._id}`}>
                          <h2 className="text-header uppercase text-center w-40 md:w-44 2xl:w-96 hover:text-blue-400">
                            {elem.descripcion}
                          </h2>
                        </Link>
                        {/* <p className="pb-1 uppercase text-header">
                        Talle:{" "}
                        {
                          productos.find((item) => item.product === elem._id)
                            .size
                        }
                      </p> */}
                        {productos?.find((item) => item.producto === elem._id)
                          ?.precio < elem.precio ? (
                          <div className="flex flex-col w-auto gap-2">
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

                        <div className="w-auto flex justify-center items-center flex-row flex-nowrap pr-2">
                          <button
                            className="hover:opacity-70 min-h-6 h-8 flex justify-center items-center py-1 px-[6px] bg-header text-white font-medium text-xl rounded-tl-md rounded-bl-md rounded-tr-none rounded-br-none border-none outline-none"
                            value={"-"}
                            name={
                              productos.find(
                                (item) => item.producto === elem._id
                              ).producto
                            }
                            onClick={handleAmount}
                          >
                            -
                          </button>
                          <span className="py-1 px-2 text-header text-xl">
                            {
                              productos.find(
                                (item) => item.producto === elem._id
                              ).cantidad
                            }
                          </span>

                          <button
                            className="hover:opacity-70 min-h-6 h-8 flex justify-center items-center p-1 bg-header text-white font-medium text-lg rounded-tr-md rounded-br-md rounded-tl-none rounded-bl-none border-none outline-none"
                            value={"+"}
                            name={
                              productos.find(
                                (item) => item.producto === elem._id
                              ).producto
                            }
                            onClick={handleAmount}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button
                        className="w-[10%] "
                        onClick={handleRemove}
                        id={
                          productos.find((item) => item.producto === elem._id)
                            .producto
                        }
                        name={elem.descripcion}
                      >
                        <MdDeleteOutline
                          fontSize={20}
                          id={
                            productos.find((item) => item.producto === elem._id)
                              .producto
                          }
                          name={elem.descripcion}
                          className="w-full text-header"
                        />
                      </button>
                    </div>
                  ))
                ) : (
                  <></>
                )}
              </div>
              <div className="flex w-full md:w-[40%] max-w-xl flex-col ">
                <div className="h-full flex flex-col w-full justify-between border-x-2 border-2">
                  <h2 className="w-full text-center uppercase text-xl text-header font-semibold py-2 bg-grey rounded-tl-md rounded-tr-md">
                    Resumen de cuenta
                  </h2>
                  {/* <div className="flex justify-center items-center py-4 bg-white">
                    {!showDiscount ? (
                      <button
                        className="py-2 px-4 border w-3/4 bg-grey rounded-sm text-header flex justify-center items-center"
                        onClick={() => setShowDiscount(true)}
                      >
                        <TbShoppingCartDiscount />{" "}
                        <span className="px-2">Ingresar descuento</span>
                      </button>
                    ) : (
                      <Discount />
                    )}
                  </div> */}
                  <div className="h-auto lg:h-80 w-full flex flex-col justify-start items-start px-6 py-4  bg-white">
                    <div className="flex w-full flex-row justify-between text-header text-lg">
                      <span>Subtotal</span>{" "}
                      <span>{formatearPrecio(totalSinDescuento)}</span>
                    </div>
                    <span className="w-full bg-grey border"></span>
                    <div className=" flex w-full flex-row justify-between py-2 font-bold text-header text-xl mb-4">
                      <span className="uppercase">total</span>{" "}
                      <span>{formatearPrecio(totalSinDescuento)}</span>
                    </div>
                    {/* <button className="uppercase border-2 bg-white text-header/70 w-full py-2 rounded-md font-medium ">
                      Calcular envío
                    </button> */}
                  </div>
                  <div className="flex flex-col justify-start items-center  py-4 px-4 gap-6 bg-white rounded-bl-md rounded-br-md">
                    <button
                      className="btn bg-header hover:opacity-70 text-white w-full flex justify-center items-center text-[17px]"
                      onClick={handleBuy}
                    >
                      <RiShoppingBagFill /> Finalizar compra
                    </button>
                  </div>
                </div>
                <div className="w-full justify-center flex py-4 text-blue-400 text-lg font-medium">
                  <Link to={"/"}>{"< Continuar comprando"}</Link>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className=" flex flex-grow items-center justify-center flex-col ">
            <div className=" flex flex-col justify-center items-center text-gray-500 h-[440px] sm:h-[520px] lg:h-[330px]">
              <FaShoppingCart fontSize={80} />
              <p>Su carrito está vacío.</p>
            </div>
            <div className="w-full justify-center flex py-2 text-blue-400 text-lg font-medium">
              <Link to={"/"}>{"< Continuar comprando"}</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCartPage;
