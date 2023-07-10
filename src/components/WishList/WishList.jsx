import React, { useEffect, useRef, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import {
  MdFavoriteBorder,
  MdOutlineFavorite,
  MdOutlineFavoriteBorder,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  clearWishlistAction,
  removeProductFromWishlist,
} from "../../redux/wishListActions";
import { ConfirmationComponent } from "../../utils/DeleteSteps";
import Loading from "../../utils/Loading";
import { addToCartAction } from "../../redux/shoppingCartActions";
import { Link, useNavigate } from "react-router-dom";
import { formatearPrecio } from "../../utils/formatPrice";

const WishList = () => {
  const dispatch = useDispatch();
  const modalWishlistRef = useRef(null);
  const { wishedProducts, loading } = useSelector((state) => state.wishlist);
  const { products } = useSelector((state) => state.products);
  const [error, setError] = useState(false);
  const [onDelete, setOnDelete] = useState(null);
  const [itemToDelete, setItemToDelete] = useState({ nombre: "", id: "" });
  const [section, setSection] = useState("lista de deseados");
  const [confirmed, setConfirmed] = useState(false);
  const [productsInWishlist, setProductsInWishlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (wishedProducts?.length && products?.length) {
      let foundProduct = [];
      for (let i = 0; i < wishedProducts.length; i++) {
        let productToShow = products?.find(
          (elem) => elem._id === wishedProducts[i].id
        );
        /*  productToShow = {
          ...productToShow,
          precio: `${productToShow.precio}`,
        }; */
        foundProduct.push(productToShow);
      }
      foundProduct = foundProduct.sort((a, b) =>
        a.descripcion.localeCompare(b.descripcion)
      );

      setProductsInWishlist(foundProduct);
    } else if (!wishedProducts?.length) {
      setProductsInWishlist([]);
    }
  }, [wishedProducts, products]);

  const toggleModal = (e) => {
    modalWishlistRef.current.classList.toggle("modal-open");
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

  const handleWishlistAddToCart = async (e) => {
    if (error) {
      setError(false);
    }

    const itemToAdd = wishedProducts.find((elem) => elem.id === e.target.id);

    let productPrice = products?.find((elem) => elem._id === itemToAdd?.id);

    if (productPrice.descuento > 0) {
      // Aplicar el descuento al precio total
      const descuento = productPrice.precio * (productPrice.descuento / 100);
      productPrice = productPrice.precio - descuento;
    } else {
      productPrice = productPrice.precio;
    }

    await dispatch(
      addToCartAction({
        producto: itemToAdd.id,
        cantidad: 1,
        precio: productPrice,
      })
    );
    dispatch(removeProductFromWishlist({ id: itemToAdd.id }));
    navigate("/checkout/form");
  };

  const handleWishlistRemove = (e) => {
    if (error) {
      setError(false);
    }

    setItemToDelete({
      nombre: "producto",
      id: e.target.value,
    });
    toggleModal();
  };

  return (
    <div className="w-full h-auto flex flex-col justify-start items-start sm:justify-center sm:items-center  max-h-max  min-h-[450px] sm:min-h-[650px] md:min-h-[450px] bg-fontGrey mt-10 sm:mt-0">
      <dialog ref={modalWishlistRef} className="modal bg-grey/40">
        <div className="modal-box bg-white">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-xl text-header"
            onClick={toggleModal}
          >
            ✕
          </button>
          {loading ? (
            <Loading />
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

      <ul className=" bg-grey w-full flex flex-col justify-start items-center">
        <li className="w-full text-header font-medium text-xl flex justify-center items-center h-16 uppercase  bg-grey/80">
          Tu lista de deseados{" "}
          <span className="pl-2 flex justify-center items-center">
            <MdOutlineFavorite className="p-0 " fontSize={28} />
          </span>
        </li>
        {productsInWishlist?.length ? (
          <div className="w-full xl:w-[80%] flex flex-col justify-start items-center min-h-[355px] overflow-y-auto  contentScroll">
            <div className="w-full justify-end items-center flex pb-4">
              <button
                className=" text-yellow  py-1  px-4 font-medium rounded bg-header hover:bg-yellow/80 hover:text-header border border-header w-auto transition-all  whitespace-nowrap"
                onClick={() => dispatch(clearWishlistAction())}
              >
                Vaciar lista de deseados
              </button>
            </div>
            {productsInWishlist.map((elem) => (
              <li
                key={elem._id + "wishlist"}
                className=" flex flex-col md:flex-row justify-center xl:justify-between items-center py-3 w-full bg-white"
              >
                <div className=" w-full flex flex-row justify-center  items-center h-full gap-4">
                  <div className="flex  justify-center items-center w-1/3 sm:w-32 h-32 ">
                    <img
                      className="w-full h-full object-contain aspect-auto "
                      src={elem.imagen?.length ? elem.imagen : elem.imagenes}
                      alt={elem.modelo}
                    />
                  </div>
                  <div className="flex items-center justify-between w-[55%] sm:w-[80%] flex-col sm:flex-row">
                    <div className="w-full flex flex-col sm:flex-row justify-center sm:justify-between items-center h-full px-6 2xl:max-w-[80%]">
                      <div className="flex flex-col justify-between items-center md:flex-row sm:gap-1 w-auto md:w-[50%]">
                        <h2 className="text-header uppercase w-40 md:w-max  md:min-w-[50%] sm:text-lg text-center ">
                          {elem.descripcion}
                        </h2>
                        <p className="text-base md:text-lg font-medium text-header/50 text-center h-full min-w-[80px]">
                          {elem.codigo}
                        </p>
                      </div>
                      {elem.descuento > 0 ? (
                        <div className="flex flex-col w-full gap-1 justify-center items-center sm:items-end">
                          <p className="text-lg font-medium text-header/60 w-max text-center line-through">
                            {formatearPrecio(elem.precio)}
                          </p>
                          <p className="text-xl font-medium text-header w-max text-center flex flex-row items-center">
                            <span className="text-green-400 text-xs pr-2 font-normal">
                              {elem.descuento + "% OFF"}
                            </span>
                            {formatearPrecio(
                              elem.precio - elem.precio * (elem.descuento / 100)
                            )}
                          </p>
                        </div>
                      ) : (
                        <p className="text-xl pb-1 font-medium text-header text-center sm:text-end w-full">
                          {formatearPrecio(elem.precio)}
                        </p>
                      )}
                    </div>
                    <div className="w-max h-full flex py-2 justify-between items-center flex-col-reverse gap-2">
                      <button
                        value={elem._id}
                        className="  text-yellow uppercase py-1 sm:py-2 px-4 font-medium rounded-full bg-header hover:bg-header/80 border border-yellow w-full transition-all  whitespace-nowrap"
                        onClick={handleWishlistRemove}
                      >
                        Eliminar
                      </button>
                      <button
                        className=" text-header uppercase py-1 sm:py-2 px-4 font-medium rounded-full bg-yellow hover:bg-yellow/80 border border-header w-full md:w-auto transition-all  whitespace-nowrap"
                        onClick={handleWishlistAddToCart}
                        id={elem._id}
                      >
                        Comprar Ahora
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </div>
        ) : (
          <div className="p-2 w-full h-96 text-header flex justify-center items-center">
            <p>No tienes ningún artículo en tu lista de deseados.</p>
          </div>
        )}
        <div className="w-full justify-center flex py-6 xl:py-4 text-blue-400 text-lg font-medium">
          <Link to={"/"}>{"< Continuar agregando"}</Link>
        </div>
      </ul>
    </div>
  );
};

export default WishList;
