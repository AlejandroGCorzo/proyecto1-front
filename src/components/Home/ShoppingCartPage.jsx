import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCartAction } from "../../redux/shoppingCartActions";
import Loading from "../../utils/Loading";
import { ConfirmationComponent } from "../../utils/DeleteSteps";
import { MdDeleteOutline } from "react-icons/md";
import { RiShoppingBagFill } from "react-icons/ri";
import { FaShoppingCart } from "react-icons/fa";
import { TbShoppingCartDiscount } from "react-icons/tb";
import { Link } from "react-router-dom";

const ShoppingCartPage = () => {
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
        nombre: /* e.target.parentElement.name */ "producto",
        id: e.target.parentElement.id,
      });
      toggleModal();
    } else {
      setItemToDelete({
        nombre: /* e.target.name */ "producto",
        id: e.target.id,
      });
      toggleModal();
    }
  };

  const handleSelectChange = (e) => {
    const { value, name, id } = e.target;

    if (value === "remove") {
      setItemToDelete({ nombre: /* name */ "producto", id: id });
      toggleModal();
    } else {
      dispatch(updateCartAction({ itemId: id, quantity: Number(value) }));
    }
  };

  return (
    <div className="w-full h-auto flex flex-col justify-start items-start md:justify-center md:items-center  max-h-max mt-[40%] sm:mt-[20.8%] md:max-lg:mt-[15.5%] lg:mt-[15%] 2xl:mt-[10%] bg-grey">
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
      <div className="flex justify-start items-center ">
        <h1 className="flex w-full py-6 text-center uppercase text-xl text-header font-semibold">
          Carrito de compras
        </h1>
      </div>
      <div className="flex flex-col items-center justify-center w-full bg-grey ">
        {productos?.length ? (
          <div className="w-full h-full max-w-[90%] flex flex-col lg:flex-row justify-around items-start gap-6">
            <div className="h-auto w-full max-w-[60%] flex flex-col justify-between gap-2 overflow-y-auto p-2 bg-grey">
              {productos?.length > 0 &&
                productos.map((elem) => (
                  <div
                    key={elem.id}
                    className=" flex flex-row justify-between items-start w-full border py-3 px-6 bg-white"
                  >
                    <div className="flex h-1/3 py-1 border">
                      <img
                        className="max-w-[100px]"
                        src={elem.productData.imagenes[0]}
                        alt={elem.productData.modelo}
                      />
                    </div>
                    <div className="w-full flex flex-row justify-between items-start pl-4">
                      <h2 className="text-header uppercase w-96">
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
            <div className="h-full flex flex-col w-[40%] max-w-xl justify-between">
              <h2 className="w-full text-center uppercase text-xl text-header font-semibold py-2 bg-fontGrey rounded-tl-md rounded-tr-md">
                Resumen de cuenta
              </h2>
              <div className="flex justify-center items-center py-4 bg-white">
                <button className="py-2 px-4 border w-3/4 bg-grey rounded-sm text-header flex justify-center items-center">
                  <TbShoppingCartDiscount />{" "}
                  <span className="px-2">Ingresar descuento</span>
                </button>
              </div>
              <div className="h-auto lg:h-80 w-full flex flex-col justify-start items-start px-6 py-4  bg-white">
                <div className="flex w-full flex-row justify-between text-header text-lg">
                  <span>Subtotal</span> <span>$ {totalSinDescuento}</span>
                </div>
                <span className="w-full bg-fontGrey border"></span>
                <div className=" flex w-full flex-row justify-between py-2 font-bold text-header text-xl mb-4">
                  <span className="uppercase">total</span>{" "}
                  <span>$ {totalSinDescuento}</span>
                </div>
                <button className="uppercase border-2 bg-white text-fontLigth w-full py-2 rounded-md font-medium ">
                  Calcular envío
                </button>
              </div>
              <div className="flex flex-col justify-start items-center  py-4 px-4 gap-6 bg-white rounded-bl-md rounded-br-md">
                <button className="btn bg-header hover:opacity-70 text-white w-full flex justify-center items-center text-[17px] ">
                  <RiShoppingBagFill /> Finalizar compra
                </button>
              </div>
              <div className="w-full justify-center flex py-2 text-blue-400 text-lg font-medium">
                <Link to={"/"}>{"< Continuar comprando"}</Link>
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

export default ShoppingCartPage;
