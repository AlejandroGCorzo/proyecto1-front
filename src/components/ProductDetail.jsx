import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById, getProductsAction } from "../redux/productActions";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "./Modal";
import { useSwipeable } from "react-swipeable";
import ProductosDestacados from "./ProductosDestacados";
import { clearDetail } from "../redux/productSlice";
import {
  addToCartAction,
  updateCartAction,
} from "../redux/shoppingCartActions";
import { useLocation, Link } from "react-router-dom";
import OtrosProductosInteres from "./OtrosProductosInteres";
import { MdOutlineFavorite } from "react-icons/md";
import { addProductToWishlist } from "../redux/wishListActions";
import { FaExchangeAlt } from "react-icons/fa";
import { MdCheckCircle, MdRemoveCircle } from "react-icons/md";
import { ConfirmationComponent } from "../utils/DeleteSteps";
import Loading from "../utils/Loading";
import { formatearPrecio } from "../utils/formatPrice";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const modalRef = useRef(null);
  const detailProduct = useSelector((state) => state.products.detail);
  const { productos, loading } = useSelector((state) => state.cart);
  const { isLoggedIn } = useSelector((state) => state.users);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isCambioOpen, setIsCambioOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [isSucursalesOpen, setIsSucursalesOpen] = useState(false);
  const [isEnvioOpen, setIsEnvioOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [onDelete, setOnDelete] = useState(null);
  const [itemToDelete, setItemToDelete] = useState({ nombre: "", id: "" });
  const [section, setSection] = useState("carrito de compras");
  const [confirmed, setConfirmed] = useState(false);
  // const [breadcrumbs, setBreadcrumbs] = useState([]);

  // useEffect(() => {
  //   const segments = location.pathname
  //     .split("/")
  //     .filter((segment) => segment !== "");

  //   const breadcrumbs = segments.map((segment, index) => {
  //     const path = `/${segments.slice(0, index + 1).join("/")}`;
  //     const name = segment.replace(/-/g, " ");

  //     return { path, name };
  //   });
  //   setBreadcrumbs(breadcrumbs);
  // }, [location.pathname]);
  /* const handleAmount = (e) => {
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
    }; */
  const toggleModal = () => {
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
  const handleDecreaseQuantity = () => {
    const itemToUpdate = productos.find((elem) => elem.producto === id);
    if (itemToUpdate && itemToUpdate.cantidad - 1 > 0) {
      dispatch(
        updateCartAction({
          itemId: id,
          cantidad: itemToUpdate.cantidad - 1,
        })
      );
    } else if (itemToUpdate && itemToUpdate.cantidad - 1 === 0) {
      if (error?.length) {
        setError("");
      }
      setItemToDelete({
        nombre: "producto",
        id: id,
      });
      toggleModal();
    } else {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      }
    }
  };

  const handleIncreaseQuantity = () => {
    const itemToUpdate = productos.find((elem) => elem.producto === id);
    if (itemToUpdate && itemToUpdate?.cantidad + 1 <= detailProduct.stock) {
      dispatch(
        updateCartAction({
          itemId: id,
          cantidad: itemToUpdate.cantidad + 1,
        })
      );
    } else if (itemToUpdate?.cantidad === detailProduct.stock) {
      setError("Ha agregado todos los productos disponibles al carrito.");
      toggleModal();
    } else if (quantity + 1 <= detailProduct.stock) {
      setQuantity(quantity + 1);
    } else if (quantity === detailProduct.stock) {
      setError("Ha sumado todos los productos disponibles.");
      toggleModal();
    }
  };

  const handleCalculateShipping = () => {};

  useEffect(() => {
    dispatch(getProductsAction());
    dispatch(fetchProductById(id));

    return () => {
      dispatch(clearDetail());
    };
  }, [dispatch, id]);

  //////////////////////////////Carrito/////////////////////////////

  const handleAddToCart = async (e) => {
    const { value } = e.target;
    let itemToAdd = productos.find((el) => el.producto === id);
    setItemToDelete({ nombre: "", id: "" });

    if (itemToAdd?.cantidad + 1 > detailProduct.stock) {
      setError("Ha agregado todos los productos disponibles al carrito.");
      toggleModal();
    } else {
      if (error?.length) {
        setError("");
      }

      let precioFinal = detailProduct.precio;

      if (detailProduct.descuento > 0) {
        // Aplicar el descuento al precio total
        const descuento =
          detailProduct.precio * (detailProduct.descuento / 100);
        precioFinal = detailProduct.precio - descuento;
      }

      await dispatch(
        addToCartAction({
          cantidad: itemToAdd ? itemToAdd.cantidad + 1 : quantity,
          precio: precioFinal,
          producto: id,
        })
      );

      if (value === "comprar") {
        navigate("/checkout/form");
      } else {
        setSuccess(true);
        toggleModal();
      }
    }
    if (value === "comprar") {
      navigate("/checkout/form");
    }
  };

  /////////////////////////////Carrito/////////////////////////////

  const handleToggleTooltip = () => {
    setIsTooltipOpen(!isTooltipOpen);
  };

  const handleToggleEnvio = () => {
    setIsEnvioOpen(!isEnvioOpen);
  };

  const handleToggleCambio = () => {
    setIsCambioOpen(!isCambioOpen);
  };

  const handleShare = () => {
    // Lógica para compartir
    // ...
  };

  const handleShareWhatsApp = () => {
    // Lógica para compartir en WhatsApp
    // ...
  };

  const handleShareFacebook = () => {
    // Lógica para compartir en Facebook
    // ...
  };
  const handleImageClick = (imageName) => {
    setSelectedImage(imageName);
  };

  const handleSwipe = (direction) => {
    if (direction === "LEFT") {
      const currentIndex = detailProduct?.imagenes.indexOf(selectedImage);
      const nextIndex =
        currentIndex === 0
          ? detailProduct?.imagenes.length - 1
          : currentIndex - 1;
      setSelectedImage(detailProduct?.imagenes[nextIndex]);
    } else if (direction === "RIGHT") {
      const currentIndex = detailProduct?.imagenes.indexOf(selectedImage);
      const nextIndex =
        currentIndex === detailProduct?.imagenes.length - 1
          ? 0
          : currentIndex + 1;
      setSelectedImage(detailProduct?.imagenes[nextIndex]);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("LEFT"),
    onSwipedRight: () => handleSwipe("RIGHT"),
  });

  const handleToggleSucursales = () => {
    setIsSucursalesOpen(!isSucursalesOpen);
  };
  const handleWishList = () => {
    dispatch(addProductToWishlist({ id: detailProduct._id }));
  };
  return detailProduct ? (
    <>
      <div className="w-full h-auto flex flex-col md:justify-center sm:items-center mt-[20%] sm:mt-[5%] md:mt-[4%] lg:mt-[15%] xl:mt-[0%] 2xl:mt-10 justify-start items-start  ">
        <div className="text-gray-500 flex sm:flex-row sm:w-full sm:justify-center md:justify-start xsm: text-xl px-4 sm:py-2  ">
          Página Principal &gt; {detailProduct.descripcion}
          {/* {breadcrumbs.map((breadcrumb, index) => (
            <Link
              key={breadcrumb.path}
              to={` product/${detailProduct._id}`}
              className="text-gray-500 hover:underline px-2 mx-2"
            >
              {index === breadcrumbs.length - 1
                ? ` ${breadcrumb.name}`
                : ` ${breadcrumb.name} > `}
            </Link>
          ))} */}
        </div>
        <div className="w-full flex flex-col h-auto justify-center items-center px-4 gap-4 bg-grey/80  mt-[4%] sm:mt-[5.8%]  md:mt-[2%] md:max-lg:mt-[1.5%] lg:mt-[1.5%]  xsm:mt-[5%]  md:flex-row ">
          <dialog ref={modalRef} className="modal bg-grey/40">
            <div className="modal-box bg-grey">
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-header text-xl"
                onClick={toggleModal}
              >
                ✕
              </button>
              {error.length > 0 && (
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
                  <span>{error}</span>
                </div>
              )}

              {/*  {selectedSize?.length === 0 && !success && (
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
                  <span>Debe seleccionar un Talle.</span>
                </div>
              )} */}
              {productos.length &&
              !error.length &&
              !itemToDelete?.nombre?.length &&
              productos.filter((el) => el.producto === id).length ? (
                <div className="flex flex-col w-[97%] justify-between items-center p-6 gap-8">
                  <h2 className="uppercase text-lg w-full text-header text-center font-medium">
                    El producto fue agregado al carrito
                  </h2>
                  <Link
                    to={"/checkout"}
                    className="btn underline text-white bg-yellow hover:bg-yellow/80 border-none focus:outline-none hover:outline-none focus-visible:outline-none rounded w-full"
                  >
                    ir al carrito
                  </Link>
                  <button
                    onClick={toggleModal}
                    className="btn hover:opacity-80 text-white focus:outline-none hover:outline-none focus-visible:outline-none rounded w-full"
                  >
                    seguir comprando
                  </button>
                </div>
              ) : loading ? (
                <div className="w-full h-28 flex justify-center items-center">
                  <Loading />
                </div>
              ) : (
                !error.length && (
                  <ConfirmationComponent
                    onDelete={onDelete}
                    toggleModal={toggleModal}
                    confirmed={confirmed}
                    setConfirmed={setConfirmed}
                    itemToDelete={itemToDelete}
                    setItemToDelete={setItemToDelete}
                    section={section}
                  />
                )
              )}
            </div>
          </dialog>

          <div className=" w-full md:w-1/2 flex  h-auto p-2 md:h-[750px] lg:h-[680px] bg-white items-center justify-center lg:mt-0 lg:px-2 lg:py-2">
            <img
              src={
                detailProduct?.imagen?.length
                  ? detailProduct?.imagen
                  : detailProduct?.imagenes
              }
              alt={detailProduct?.descripcion}
              className="w-full h-[80%] object-contain px-4 max-w-sm md:max-w-xl "
              onError={(e) => {
                e.target.src = "/nodisponible.jpg";
              }}
            />
          </div>
          <div className="flex flex-col w-full h-[750px] lg:h-[680px] p-2 bg-white  md:w-1/2 md:mt-0 lg:mt-0 xl:mt-0">
            <aside className="flex-1 w-full  bg-white items-center justify-center lg:mt-0 lg:px-2 lg:py-2">
              <div className="w-full flex flex-row justify-center items-center">
                <h1 className="font-extrabold tracking-tight items-center justify-center text-gray-900 text-2xl  xsm:mt.0 ">
                  {detailProduct?.descripcion}
                </h1>
              </div>

              <div className="my-5 px-2 py-2 ">
                {detailProduct.descuento > 0 ? (
                  <div className="flex flex-col w-auto gap-2 justify-center items-start">
                    <p className="text-xl font-medium text-header/60 w-max text-center line-through">
                      {formatearPrecio(detailProduct.precio)}
                    </p>
                    <p className="text-3xl font-medium text-header w-max text-center flex flex-row items-center">
                      {formatearPrecio(
                        detailProduct.precio -
                          detailProduct.precio * (detailProduct.descuento / 100)
                      )}{" "}
                      <span className="text-green-400 text-lg px-2 font-normal">
                        {detailProduct.descuento + "% OFF"}
                      </span>
                    </p>
                  </div>
                ) : (
                  <p className="text-3xl pb-1 font-medium text-header w-auto text-start">
                    {formatearPrecio(detailProduct.precio)}
                  </p>
                )}
              </div>
              <hr className="w-full border-gray-300 my-2" />
              <div className="my-3 px-2 py-2 ">
                <p className="ml-3 text-sm text-gray-500">
                  CODIGO: {detailProduct?.codigo}
                </p>
              </div>
              <div className="my-5  py-2">
                {detailProduct.stock > 0 ? (
                  <div className="flex items-center ml-3">
                    <MdCheckCircle className="text-green-500 mr-1" />
                    <p className="text-sm text-green-500">HAY STOCK</p>
                  </div>
                ) : (
                  <div className="flex items-center ml-3">
                    <MdRemoveCircle className="text-red-500 mr-1" />
                    <p className="text-sm text-red-500">NO HAY STOCK</p>
                  </div>
                )}
              </div>

              <hr className="w-full border-gray-300 my-2" />
              <div className="flex items-center justify-between my-5  px-1 py-1 border border-gray-300">
                <div className="flex items-center">
                  <img
                    src="https://www.suono.com.ar/media/codazon/themelayout/images/truck-icon.png"
                    alt="Envios"
                    className="w-8 h-6 mr-2"
                  />
                  <h2 className="text-blue-500 text-lg font-bold">ENVIO</h2>
                  <img
                    src="https://www.suono.com.ar/media/codazon/flags/ar.jpg"
                    alt="Bandera Argentina"
                    className="w-8 h-5 ml-2"
                  />
                </div>
                <button
                  className="px-2 text-lg font-bold py-2 text-blue-500 hover:text-blue-600 "
                  onClick={() => setShowForm(!showForm)}
                >
                  Calcular el costo de envío
                </button>
              </div>
              {showForm && (
                <div className="flex flex-col border border-gray-400 p-4">
                  <div className="mb-4 flex flex-col">
                    <label htmlFor="country" className="text-sm font-bold">
                      País:
                    </label>
                    <input
                      id="country"
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="border border-gray-300 px-2 py-1 rounded"
                    />
                  </div>

                  <div className="mb-4 flex flex-col">
                    <label htmlFor="province" className="text-sm font-bold">
                      Provincia:
                    </label>
                    <input
                      id="province"
                      type="text"
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      className="border border-gray-300 px-2 py-1 rounded"
                    />
                  </div>

                  <div className="mb-4 flex flex-col">
                    <label htmlFor="postalCode" className="text-sm font-bold">
                      Código Postal:
                    </label>
                    <input
                      id="postalCode"
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="border border-gray-300 px-2 py-1 rounded"
                    />
                  </div>

                  <button
                    onClick={handleCalculateShipping}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Calcular costo
                  </button>
                </div>
              )}

              <div className="flex flex-col items-start my-5">
                <label
                  htmlFor="cantidad"
                  className="mr-2 text-header font-bold"
                >
                  CANTIDAD
                </label>
                <div className="flex items-center rounded">
                  <button
                    className="disabled:bg-header/70 hover:opacity-70 min-h-6 h-9 flex justify-center items-center py-1 px-[6px] bg-header text-white font-medium text-xl rounded-tl-md rounded-bl-md rounded-tr-none rounded-br-none border-none outline-none"
                    onClick={() => handleDecreaseQuantity()}
                    disabled={detailProduct.stock === 0 ? true : false}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    id="cantidad"
                    value={
                      productos.find((item) => item.producto === id)
                        ?.cantidad || quantity
                    }
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-16 px-2 py-1 text-xl text-header text-center outline-none bg-grey flex justify-center items-center"
                  />
                  <button
                    className="disabled:bg-header/70 hover:opacity-70 min-h-6 h-9 flex justify-center items-center p-1 bg-header text-white font-medium text-lg rounded-tr-md rounded-br-md rounded-tl-none rounded-bl-none border-none outline-none"
                    onClick={() => handleIncreaseQuantity()}
                    disabled={detailProduct.stock === 0 ? true : false}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="w-full lg:w-full  h-auto flex xsm:flex-col py-2 my-5 justify-center lg:justify-between items-center lg:flex-row gap-2">
                <button
                  value={detailProduct._id}
                  className=" disabled:bg-header/70 text-yellow uppercase py-1 sm:py-2 px-4 font-medium rounded-full bg-header hover:bg-header/80 border border-yellow md:w-2/4 w-full transition-all  whitespace-nowrap"
                  onClick={handleAddToCart}
                  disabled={detailProduct.stock > 0 ? false : true}
                >
                  Agregar al Carrito
                </button>
                <button
                  className="disabled:bg-yellow/70 disabled:border-yellow disabled:text-header/80 text-header uppercase py-1 sm:py-2 px-4 font-medium rounded-full bg-yellow hover:bg-yellow/80 md:w-2/4 w-full border  border-header transition-all whitespace-nowrap"
                  onClick={handleAddToCart}
                  value={"comprar"}
                  id={detailProduct._id}
                  disabled={detailProduct.stock > 0 ? false : true}
                >
                  Comprar Ahora
                </button>
                <div className="flex flex-row justify-between items-center gap-2 w-auto">
                  <button
                    className="bg-header w-auto text-white py-2 px-2   rounded-md hover:bg-yellow hover:text-white text-sm transition-colors duration-300"
                    onClick={handleWishList}
                  >
                    <MdOutlineFavorite className="text-lg" />
                  </button>
                  <button
                    className="bg-header w-auto text-white py-2 px-2  rounded-md hover:bg-yellow hover:text-white text-sm transition-colors duration-300"
                    onClick={handleWishList}
                  >
                    <FaExchangeAlt className="text-lg" />
                  </button>
                </div>
              </div>
              <div className="flex items-center my-3 justify-between xsm:py-2 sm:py-6">
                <div className="flex flex-col">
                  <p className="mr-3 font-bold">INFORMACIÓN GENERAL</p>
                  <p>{detailProduct.descripcion}</p>
                </div>
                <div className="flex flex-row">
                  <button onClick={handleShare}>
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/929/929539.png"
                      alt="Compartir "
                      className="w-6 h-6 mr-3"
                    />
                  </button>
                  <button onClick={handleShareFacebook}>
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/5968/5968764.png"
                      alt="Compartir en Facebook"
                      className="w-6 h-6 mr-3"
                    />
                  </button>
                  <button onClick={handleShareWhatsApp}>
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/3670/3670051.png"
                      alt="Compartir en WhatsApp"
                      className="w-6 h-6 mr-2"
                    />
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </div>
        <div className="flex flex-row w-full h-auto  my-4  justify-between px-4">
          <main className="flex-1 h-full w-full  mx-auto justify-center ">
            <div className="flex flex-col w-full items-center py-3 bg-white sm:items-start">
              <h3 className="text-lg3 mx-3 font-bold">DESCRIPCION</h3>
              <p className="text-gray-500 mx-3 list-disc">
                {detailProduct?.descripcion}
              </p>
            </div>
          </main>
        </div>
        <div className="flex flex-row w-full h-auto my-4  justify-between px-4">
          <main className="flex-1 h-full w-full  mx-auto justify-center ">
            <div className="flex flex-col w-full items-center py-3 bg-white sm:items-start">
              <OtrosProductosInteres />
            </div>
          </main>
        </div>
      </div>
    </>
  ) : (
    <div className="flex justify-center items-center h-screen ">
      <h1 className="text-4xl font-bold animate-color-change">Cargando...</h1>
    </div>
  );
};

export default ProductDetail;
