import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { MdFavoriteBorder, MdOutlineFavoriteBorder } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

const WishList = () => {
  const dispatch = useDispatch();
  const { wishedProducts } = useSelector((state) => state.wishlist);

  return (
    <details className="dropdown dropdown-end">
      <summary className="btn bg-header border-none">
        <div className="indicator">
          {/*   {productos.length > 0 && (
            <span className="indicator-item badge badge-warning -left-1">
              {productos.length}
            </span>
          )} */}

          <MdOutlineFavoriteBorder color="white" fontSize={24} />
        </div>
      </summary>
      <ul className="px-6 shadow-lg menu dropdown-content z-[1] w-96 bg-grey">
        <li className="w-full text-header font-medium text-lg flex justify-center items-center flex-col h-24 uppercase border-b-2 ">
          <MdFavoriteBorder
            fontSize={32}
            color="black"
            className="h-auto px-0 py-1 hover:bg-grey hover:cursor-default hover:outline-none"
          />
          Tu lista de deseados
        </li>
        {wishedProducts?.length ? (
          <>
            {wishedProducts.map((elem) => (
              <div
                key={elem._id + "cartPreview"}
                className="border-b flex flex-row justify-start items-start py-5 w-full"
              >
                <div className="flex h-1/3 py-1 border">
                  <img
                    className="max-w-[100px]"
                    src={elem.imagenes[0]}
                    alt={elem.modelo}
                  />
                </div>
                <div className="w-[65%] flex flex-col justify-between items-start pl-4">
                  <h2 className="text-header uppercase max-w-[90%]">
                    {elem.modelo}
                  </h2>
                  <p className="pb-1 uppercase text-header">
                    Talle:{" "}
                    {productos.find((item) => item.product === elem._id).size}
                  </p>
                  <p className="text-lg pb-1 font-medium text-header">
                    $ {elem.precio},00
                  </p>
                  <div className="w-auto flex justify-center items-center flex-row flex-nowrap px-2">
                    {/* <button
                      className="hover:opacity-70 min-h-6 h-8 flex justify-center items-center p-1 bg-header text-white font-medium text-lg rounded-tl-md rounded-bl-md rounded-tr-none rounded-br-none border-none outline-none"
                      value={"+"}
                      name={
                        productos.find((item) => item.product === elem._id).id
                      }
                      onClick={handleAmount}
                    >
                      +
                    </button>
                    <span className="py-1 px-2 text-header text-xl">
                      {
                        productos.find((item) => item.product === elem._id)
                          .quantity
                      }
                    </span>
                    <button
                      className="hover:opacity-70 min-h-6 h-8 flex justify-center items-center py-1 px-[6px] bg-header text-white font-medium text-xl rounded-tr-md rounded-br-md rounded-tl-none rounded-bl-none border-none outline-none"
                      value={"-"}
                      name={
                        productos.find((item) => item.product === elem._id).id
                      }
                      onClick={handleAmount}
                    >
                      -
                    </button> */}
                  </div>
                </div>
                {/* <button
                  className="w-[10%] pt-2"
                  onClick={handleRemove}
                  id={productos.find((item) => item.product === elem._id).id}
                  name={elem.modelo}
                >
                  <FaShoppingCart
                    fontSize={20}
                    id={productos.find((item) => item.product === elem._id).id}
                    name={elem.modelo}
                    className="w-full text-header"
                  />
                </button> */}
              </div>
            ))}
          </>
        ) : (
          <div className="p-2 w-full h-24 text-header flex justify-center items-center">
            <p>No tienes ningún artículo en tu lista de deseados.</p>
          </div>
        )}
      </ul>
    </details>
  );
};

export default WishList;
