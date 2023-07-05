import React, { useEffect, useRef, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import {
  MdFavoriteBorder,
  MdOutlineFavorite,
  MdOutlineFavoriteBorder,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  removeProductFromWishlist,
  updateWishlistAction,
} from "../../redux/wishListActions";
import { ConfirmationComponent } from "../../utils/DeleteSteps";
import Loading from "../../utils/Loading";
import { addToCartAction } from "../../redux/shoppingCartActions";
import { Link } from "react-router-dom";
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

  useEffect(() => {
    if (wishedProducts.length && products?.length) {
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
    if (e.target.parentElement) {
      const itemToAdd = wishedProducts.find(
        (elem) => elem.id === e.target.parentElement.id
      );
      const productPrice = products?.find(
        (elem) => elem._id === itemToAdd?.id
      )?.precio;
      await dispatch(
        addToCartAction({
          id: itemToAdd.id,
          product: itemToAdd.id,
          quantity: itemToAdd.quantity,
          precio: productPrice,
        })
      );
      dispatch(removeProductFromWishlist({ id: itemToAdd.id }));
    } else {
      const itemToAdd = wishedProducts.find((elem) => elem.id === e.target.id);
      const productPrice = products?.find(
        (elem) => elem._id === itemToAdd?.id
      )?.precio;

      await dispatch(
        addToCartAction({
          id: itemToAdd.id,
          product: itemToAdd.id,
          quantity: itemToAdd.quantity,
          precio: productPrice,
        })
      );
      dispatch(removeProductFromWishlist({ id: itemToAdd.id }));
    }
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

  const handleWishedAmount = (e) => {
    const { value, name, id } = e.target;
    const itemToUpdate = wishedProducts.find((elem) => elem.id === name);

    if (value === "+") {
      dispatch(
        updateWishlistAction({
          itemId: name,
          quantity: itemToUpdate?.quantity + 1,
        })
      );
    } else if (value === "-") {
      if (itemToUpdate?.quantity - 1 === 0) {
        if (error) {
          setError(false);
        }
        setItemToDelete({
          nombre: "producto",
          id: name,
        });
        toggleModal();
      } else if (
        itemToUpdate?.quantity > 0 &&
        itemToUpdate?.quantity - 1 !== 0
      ) {
        dispatch(
          updateWishlistAction({
            itemId: name,
            quantity: itemToUpdate?.quantity - 1,
          })
        );
      }
    }
  };

  return (
    <div className="w-full h-auto flex flex-col justify-start items-start md:justify-center md:items-center  max-h-max mt-[33%] sm:mt-[15%] md:mt-[12.5%] lg:mt-[14%] 2xl:mt-[8.5%] bg-fontGrey">
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
        <li className="w-full text-header font-medium text-xl flex justify-center items-center h-24 uppercase  bg-grey/80">
          Tu lista de deseados{" "}
          <span className="pl-2 flex justify-center items-center">
            <MdOutlineFavorite className="p-0 " fontSize={28} />
          </span>
        </li>
        {productsInWishlist?.length ? (
          <div className="w-full xl:w-[80%] flex flex-col justify-start items-center min-h-[355px] overflow-y-auto gap-2 contentScroll">
            {productsInWishlist.map((elem) => (
              <li
                key={elem._id + "wishlist"}
                className=" flex flex-row justify-center items-center py-3 w-full border bg-white"
              >
                <div className="w-auto h-full px-4 sm:px-6">
                  <button
                    value={elem._id}
                    className="btn btn-sm btn-circle btn-ghost text-xl text-header bg-grey"
                    onClick={handleWishlistRemove}
                  >
                    ✕
                  </button>
                </div>
                <div className="flex h-auto justify-center items-center w-20 sm:w-28 sm:px-2">
                  <img
                    className="w-20 h-20 object-contain aspect-auto sm:max-w-[100px] sm:max-h-28"
                    src={elem.imagen}
                    alt={elem.modelo}
                  />
                </div>
                <div className="w-[65%] flex flex-col sm:flex-row justify-center sm:justify-between items-center h-full gap-4 px-2">
                  <h2 className="text-header uppercase w-full sm:w-1/3 sm:text-lg md:text-xl text-center ">
                    {elem.descripcion}
                  </h2>
                  <div className="flex flex-col justify-center items-center md:flex-row sm:gap-4">
                    <p className="text-base md:text-lg font-medium text-header/50 w-max text-center h-full">
                      Unidad: {formatearPrecio(elem.precio)}
                    </p>
                    <p className="text-xl font-medium text-header w-max text-center h-full">
                      Total:{" "}
                      {formatearPrecio(
                        wishedProducts?.find((item) => item.id === elem._id)
                          ?.quantity * elem.precio
                      )}
                    </p>
                  </div>
                  <div className="w-auto flex justify-center items-center flex-row flex-nowrap px-2">
                    <button
                      className="hover:opacity-70  flex justify-center items-center py-1 px-[6px] bg-header text-white font-medium text-xl rounded-tl-md rounded-bl-md rounded-tr-none rounded-br-none border-none outline-none "
                      value={"-"}
                      name={elem._id}
                      onClick={handleWishedAmount}
                    >
                      -
                    </button>
                    <span className="py-1 px-2 text-header text-xl">
                      {
                        wishedProducts?.find((item) => item.id === elem._id)
                          ?.quantity
                      }
                    </span>
                    <button
                      className="hover:opacity-70  flex justify-center items-center p-1 bg-header text-white font-medium text-lg rounded-tr-md rounded-br-md rounded-tl-none rounded-bl-none border-none outline-none"
                      value={"+"}
                      name={elem._id}
                      onClick={handleWishedAmount}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className="md:w-[10%] w-[15%] px-2"
                  onClick={handleWishlistAddToCart}
                  id={elem._id}
                >
                  <FaShoppingCart
                    fontSize={20}
                    id={elem._id}
                    className="w-full text-header"
                  />
                </button>
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
