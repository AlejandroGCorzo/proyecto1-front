import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById, getProductsAction } from "../redux/productActions";
import { useParams } from "react-router-dom";
import Modal from "./Modal";
import { useSwipeable } from "react-swipeable";
import ProductosDestacados from "./ProductosDestacados";
import { clearDetail } from "../redux/productSlice";
import { addToCartAction } from "../redux/shoppingCartActions";
import { Link } from "react-router-dom";
import OtrosProductosInteres from "./OtrosProductosInteres";
import { MdOutlineFavorite } from "react-icons/md";
import { addProductToWishlist } from "../redux/wishListActions";
import { FaExchangeAlt } from "react-icons/fa";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  const detailProduct = useSelector((state) => state.products.detail);
  const { productos } = useSelector((state) => state.cart);
  const [error, setError] = useState(false);
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

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleCalculateShipping = () => {};

  useEffect(() => {
    dispatch(getProductsAction());
    dispatch(fetchProductById(id));

    return () => {
      dispatch(clearDetail());
    };
  }, [dispatch, id]);

  const [selectedImage, setSelectedImage] = useState(
    detailProduct && detailProduct?.imagenes.length
      ? detailProduct?.imagenes[0]
      : null
  );

  //////////////////////////////Carrito/////////////////////////////

  const toggleModal = () => {
    modalRef.current.classList.toggle("modal-open");
    document.activeElement.blur();
  };

  const handleAddToCart = async () => {
    if (selectedSize.length) {
      let itemToAdd = productos.filter(
        (el) => el.product === id && el.size === selectedSize
      );
      if (
        itemToAdd.length &&
        itemToAdd[0].quantity ===
          Number(
            detailProduct.talle.find((elem) => elem.talle === selectedSize)
              .cantidad
          )
      ) {
        setError(true);
        toggleModal();
      } else {
        if (error) {
          setError(false);
        }
        await dispatch(
          addToCartAction({
            id: id + selectedSize,
            quantity: 1,
            size: selectedSize,
            precio: detailProduct.precio,
            product: id,
          })
        );
        setSuccess(true);
        toggleModal();
      }
    } else {
      setSuccess(false);
      toggleModal();
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
    dispatch(addProductToWishlist({ quantity: 1, id: detailProduct.id }));
  };
  console.log(detailProduct);
  return detailProduct ? (
    <>
      <div className="w-full flex flex-col mt-[10%]">
        <div className="w-3/4 flex flex-col bg-grey/80 mr-10  mt-[70%] sm:mt-[20.8%] md:mt-[16%] md:max-lg:mt-[15.5%] lg:mt-[12.5%] xsm:flex xsm:w-full xsm:mt-36 sm:flex-row sm:mr-20 md:flex-row md:w-full xl:mt-[6%] lg:w-full xl:w-full">
          <dialog ref={modalRef} className="modal bg-grey/40">
            <div className="modal-box bg-grey">
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-fontDark text-xl"
                onClick={toggleModal}
              >
                ✕
              </button>

              {error && (
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
              )}
              {selectedSize?.length === 0 && !success && (
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
              )}
              {productos.length &&
                !error &&
                productos.filter((el) => el.product === id).length && (
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
                )}
            </div>
          </dialog>

          <div className="flex flex-col md:w-full lg:w-1/2 xsm:w-full bg-white items-center justify-start lg:mx-4  mt-22 mx-2 px-2 py-2 xsm:mx-0">
            <img
              src={detailProduct?.imagen && detailProduct?.imagen}
              alt={detailProduct?.modelo}
              className="w-full md:w-3/4  mx-2 my-2 px-2 py-2 "
            />
          </div>
          <div className="flex flex-col w-full lg:mr-36 mx-1 my-3 xsm:w-full lg:w-1/2 md:mr-10 md:mt-0 lg:mt-0 xl:mt-0">
            <aside className="flex-1 w-full bg-white items-center justify-start  py-2 px-2   lg:p-10 lg:mt-1">
              <h1 className="font-extrabold tracking-tight text-gray-900 text-2xl my-2 px-2 py-2  xsm:mt.0 ">
                {detailProduct?.descripcion}
              </h1>
              <div className="my-3 px-2 py-2 ">
                <p className="text-3xl text-gray-900">
                  {detailProduct?.precio.toLocaleString("es-AR", {
                    style: "currency",
                    currency: "ARS",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
              <hr className="w-full border-gray-300 mt-2" />
              <div className=" my-3 px-2 py-2 ">
                <p className="ml-3 text-sm text-gray-500">Stock:</p>
              </div>
              <div className="my-3 px-2 py-2 ">
                <p className="ml-3 text-sm text-gray-500">
                  CODIGO: {detailProduct?.codigo}
                </p>
              </div>
              <hr className="w-full border-gray-300 mt-2" />
              <div className="flex items-center justify-between my-3  px-1 py-1 border border-gray-300">
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

              <div className="flex flex-col items-start my-3">
                <label htmlFor="cantidad" className="mr-2 text-black font-bold">
                  CANTIDAD
                </label>
                <div className="flex items-center border border-gray-400 rounded">
                  <button
                    className="px-2 py-1 text-xl font-bold text-blue-500 hover:text-blue-600"
                    onClick={() => handleDecreaseQuantity()}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    id="cantidad"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-16 px-2 py-1 text-center outline-none"
                  />
                  <button
                    className="px-2 py-1 text-xl font-bold text-blue-500 hover:text-blue-600"
                    onClick={() => handleIncreaseQuantity()}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-row justify-between">
                <button
                  className="bg-black text-white py-2 px-2 mt-8 mx-2 rounded-md w-1/2 hover:bg-yellow hover:text-white text-sm transition-colors duration-300"
                  onClick={handleAddToCart}
                >
                  AGREGAR AL CARRITO
                </button>
                <button
                  className="bg-blue-500 text-white py-2 px-2 mt-8 mx-2 rounded-md w-1/2 hover:bg-yellow hover:text-white text-sm transition-colors duration-300"
                  onClick={handleAddToCart}
                >
                  COMPRAR AHORA
                </button>
                <button
                  className="bg-black w-auto text-white py-2 px-2 mt-8 mx-2 rounded-md hover:bg-yellow hover:text-white text-sm transition-colors duration-300"
                  onClick={handleWishList}
                >
                  <MdOutlineFavorite className="text-lg" />
                </button>
                <button
                  className="bg-black w-auto text-white py-2 px-2 mt-8 mx-2 rounded-md hover:bg-yellow hover:text-white text-sm transition-colors duration-300"
                  onClick={handleWishList}
                >
                  <FaExchangeAlt className="text-lg" />
                </button>
              </div>
              <div className="flex items-center justify-between my-10">
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
          <div className="w-1/4 "></div>
        </div>
        <div className="flex h-auto bg-white my-4 mx-1 justify-between xsm:h-auto ">
          <main className="flex-1 h-full w-full lg:w-3/4 order-2 xsm:order-1 mt-0 ml-1 mb-0 mr-0 sm:mr-0 mx-auto sm:w-3/5 justify-center md:h-1/4">
            <div className="flex flex-col items-center sm:items-start mx-6">
              <h3 className="text-lg3 mt-3 font-bold">DESCRIPCION</h3>
              <p className="text-gray-500 mt-3">{detailProduct?.descripcion}</p>
            </div>
          </main>
        </div>
        <div className="flex justify-center items-center w-full h-auto bg-white flex-col">
          <div className="w-full 2xl:w-3/4">
            <ProductosDestacados />
          </div>
          {/* <div className="w-full 2xl:w-3/4">
            <OtrosProductosInteres currentProductType={detailProduct?.tipo} />
          </div> */}
        </div>
      </div>
    </>
  ) : (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-4xl font-bold animate-color-change">Cargando...</h1>
    </div>
  );
};

export default ProductDetail;
