import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Filters from "../../utils/Filters";
import { LuListPlus } from "react-icons/lu";
import {
  clearFiltersAction,
  orderProductsAction,
} from "../../redux/productActions";
import Loading from "../../utils/Loading";
import { formatearPrecio } from "../../utils/formatPrice";
import useViewport from "../../hooks/useViewport";

const FilterProducts = () => {
  const distpatch = useDispatch();
  const { productsFilter, loading } = useSelector((state) => state.products);
  const { subcategorias } = useSelector((state) => state.categories);
  let productBrands = [...new Set(productsFilter?.map((item) => item.marca))];
  let brandImg = subcategorias.filter((item) =>
    productBrands.includes(item.nombre)
  );
  let fechaActual = new Date();
  let mounth = String(fechaActual.getMonth() + 1).padStart(2, "0");
  let { viewportSize, setViewportSize } = useViewport();
  const [maxSlice, setMaxSlice] = useState(0);

  useEffect(() => {
    if (viewportSize?.width && viewportSize.width > 1280) {
      setMaxSlice(8);
    } else {
      setMaxSlice(6);
    }
  }, [viewportSize.width]);

  const handleOrder = (e) => {
    e.preventDefault();
    const { value } = e.target;

    if (value.length) {
      distpatch(orderProductsAction(value));
    }
  };

  const handleSlice = (e) => {
    let itemsToSum = viewportSize?.width > 1280 ? 8 : 6;
    if (
      maxSlice === productsFilter?.length ||
      maxSlice + itemsToSum > productsFilter?.length
    ) {
      setMaxSlice(productsFilter?.length);
    } else {
      setMaxSlice(maxSlice + itemsToSum);
    }
  };

  const clearErrorFilters = (e) => {
    e.preventDefault();
    distpatch(clearFiltersAction());
  };
  return (
    <section className="w-full h-auto min-h-[450px] sm:min-h-[650px] md:min-h-[450px] flex flex-col justify-center items-center max-h-max bg-grey mt-12 sm:mt-5 2xl:mt-6 lg:mt-0 pb-2">
      <div
        className={`flex flex-row justify-center  gap-2 w-full ${
          productsFilter?.length === 0
            ? "h-auto sm:min-h-[550px] lg:h-[380px] items-center"
            : "h-auto items-start"
        }`}
      >
        <aside className="w-72 h-auto pl-2 hidden lg:block">
          {productsFilter?.length > 0 && <Filters />}
        </aside>
        <aside className="flex flex-col justify-center items-center w-full md:max-w-5xl lg:max-w-7xl bg-grey">
          <div className=" flex flex-row-reverse lg:flex-row justify-between items-center pt-4 pb-2 px-1 2xl:py-4 lg:px-4 text-lg gap-2 lg:gap-0 w-[95%]">
            <p className="hidden lg:block">
              {productsFilter?.length} Productos
            </p>
            {productsFilter?.length > 0 && (
              <>
                <div className="drawer drawer-end lg:hidden  w-1/2">
                  <input
                    id="my-drawer-4"
                    type="checkbox"
                    className="drawer-toggle"
                  />
                  <div className="drawer-content transition-all">
                    {/* Page content here */}
                    <label
                      htmlFor="my-drawer-4"
                      className="drawer-button p-3 rounded-lg flex justify-between lg:justify-center items-center lg:max-w-max w-full bg-white text-gray-600 font-normal whitespace-nowrap text-lg"
                    >
                      Filtrar por <LuListPlus fontSize={18} />
                    </label>
                  </div>
                  <div className="drawer-side z-[9999] ">
                    <label
                      htmlFor="my-drawer-4"
                      className="drawer-overlay"
                    ></label>
                    <ul className=" w-2/3 sm:w-2/4 h-auto max-h-screen text-base-content bg-white p-0 overflow-y-auto">
                      <Filters />
                    </ul>
                  </div>
                </div>
              </>
            )}
            {productsFilter?.length > 0 && (
              <details className="dropdown w-1/2 lg:w-auto focus-within:outline-none h-full">
                <summary className="select flex lg:justify-center items-center lg:max-w-max w-full bg-white text-gray-600 font-normal whitespace-nowrap focus:outline-none text-lg py-3 h-auto">
                  Ordenar por
                </summary>
                <ul className="text-lg shadow p-4 dropdown-content z-[1] rounded-box bg-white flex flex-col gap-2 text-header w-max">
                  <li className="hover:text-yellow transition-all cursor-pointer px-2 focus-visible:outline-none">
                    <button
                      onClick={handleOrder}
                      className="hover:bg-white hover:text-yellow focus:bg-white focus:text-yellow"
                      value={"relevancia"}
                    >
                      Relevancia
                    </button>
                  </li>
                  <li className="hover:text-yellow transition-all cursor-pointer px-2 focus-visible:outline-none">
                    <button
                      onClick={handleOrder}
                      className="hover:bg-white hover:text-yellow focus:bg-white focus:text-yellow"
                      value={"nuevo"}
                    >
                      Más reciente
                    </button>
                  </li>
                  <li className="hover:text-yellow transition-all cursor-pointer px-2 focus-visible:outline-none">
                    <button
                      onClick={handleOrder}
                      className="hover:bg-white hover:text-yellow focus:bg-white focus:text-yellow"
                      value={"descuento"}
                    >
                      Descuento
                    </button>
                  </li>
                  <li className="hover:text-yellow transition-all cursor-pointer px-2 focus-visible:outline-none">
                    <button
                      onClick={handleOrder}
                      className="hover:bg-white hover:text-yellow focus:bg-white focus:text-yellow"
                      value={"A-Z"}
                    >
                      Ordenar A-Z
                    </button>
                  </li>
                  <li className="hover:text-yellow transition-all cursor-pointer px-2 focus-visible:outline-none">
                    <button
                      onClick={handleOrder}
                      className="hover:bg-white hover:text-yellow focus:bg-white focus:text-yellow"
                      value={"Z-A"}
                    >
                      Ordenar Z-A
                    </button>
                  </li>
                  <li className="hover:text-yellow transition-all cursor-pointer px-2 focus-visible:outline-none">
                    <button
                      onClick={handleOrder}
                      className="hover:bg-white hover:text-yellow focus:bg-white focus:text-yellow"
                      value={"asc"}
                    >
                      Precio más alto
                    </button>
                  </li>
                  <li className="hover:text-yellow transition-all cursor-pointer px-2 focus-visible:outline-none">
                    <button
                      onClick={handleOrder}
                      className="hover:bg-white hover:text-yellow focus:bg-white focus:text-yellow"
                      value={"desc"}
                    >
                      Precio más bajo
                    </button>
                  </li>
                </ul>
              </details>
            )}
          </div>
          <div className="flex flex-row flex-wrap w-full justify-center gap-4 p-6 md:p-0 text-header ">
            {productsFilter?.length > 0 ? (
              productsFilter?.slice(0, maxSlice).map((item, index) => (
                <Link
                  to={`/product/${item._id}`}
                  key={item._id}
                  className=" flex flex-col justify-between items-center"
                >
                  <div className="h-full sm:max-w-[280px] w-72 border border-nav/20 rounded px-3 py-3 hover:shadow-md hover:outline-offset-8 transition-all ease-in-out text-header m-1 bg-white">
                    <div className=" flex flex-col justify-start items-center ">
                      <div className="absolute w-64 sm:w-48 md:w-60 xl:w-48 2xl:w-56 flex items-center justify-between">
                        {item.descuento > 0 && (
                          <span className="text-white bg-header py-1 px-2">
                            - {item.descuento}%
                          </span>
                        )}

                        {item.talle?.length > 0 &&
                        item.talle
                          .map((item) => item.cantidad)
                          .reduce((elem, acc) => (acc += elem)) === 1 ? (
                          <span className="text-header px-2 bg-yellow">
                            ÚLTIMA UNIDAD
                          </span>
                        ) : (
                          item.productoDate &&
                          item.productoDate.split("-")[1] === mounth && (
                            <span className="text-white bg-header p-1">
                              NUEVO
                            </span>
                          )
                        )}
                      </div>

                      <div className="flex justify-center items-center h-44 w-44 ">
                        {item.imagen?.length || item.imagenes.length ? (
                          <img
                            src={
                              item.imagen?.length ? item.imagen : item.imagenes
                            }
                            alt={item.descripcion}
                            className="h-44 w-auto max-w-44 aspect-auto object-contain"
                            onError={(e) => {
                              e.target.src = "/nodisponible.jpg";
                            }}
                          />
                        ) : null}
                      </div>
                    </div>
                    {brandImg?.length > 0 &&
                      brandImg.map(
                        (brand) =>
                          brand.nombre === item.marca && (
                            <div key={brand._id} className="p-2 ">
                              <img
                                src={brand.imagen[0]}
                                alt={brand.nombre}
                                width={30}
                                className="object-contain aspect-auto"
                              />
                            </div>
                          )
                      )}
                    <p className="text-gray-400 py-4 uppercase font-medium h-20 w-full max-w-52 text-center">
                      {item.descripcion}
                    </p>
                    <div className="h-auto flex flex-col justify-start items-end">
                      {item.descuento > 0 ? (
                        <div className="flex flex-col w-full gap-1 justify-center items-end">
                          <p className="text-lg font-medium text-header/60 w-max text-center line-through">
                            {formatearPrecio(item.precio)}
                          </p>
                          <p className="text-xl font-medium text-header w-max text-center flex flex-row items-center">
                            <span className="text-green-400 text-xs pr-2 font-normal">
                              {item.descuento + "% OFF"}
                            </span>
                            {formatearPrecio(
                              item.precio - item.precio * (item.descuento / 100)
                            )}
                          </p>
                        </div>
                      ) : (
                        <p className="text-xl pb-1 font-medium text-header  text-end w-full mt-7">
                          {formatearPrecio(item.precio)}
                        </p>
                      )}
                      <p className="font-medium text-yellow text-sm flex justify-start items-end">
                        ENVÍO GRATIS
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            ) : loading ? (
              <div className="h-96 flex justify-center items-center">
                <Loading />
              </div>
            ) : (
              <>
                <div className="flex flex-1 flex-col md:flex-row justify-evenly items-center p-6">
                  <div>
                    <h2 className="text-5xl uppercase font-bold text-header/70">
                      Oops!
                    </h2>
                  </div>
                  <div className="flex flex-col justify-between items-start gap-4">
                    <p className="font-bold text-lg text-center md:text-xl text-header/80 overflow-ellipsis pt-6 md:pt-0">
                      No hemos encontrado ningún resultado para los filtros
                      selecionados.
                    </p>
                    <ul className="flex flex-col gap-2 text-header/70 font-semibold text-base md:text-lg items-start justify-center">
                      <li>¿Qué hago?</li>
                      <div className="px-6 md:px-14 py-4 flex flex-col gap-6 justify-center items-center w-full">
                        <li className="list-disc">
                          Elimine los filtros aplicados haciendo click el
                          siguiente botón.
                        </li>
                        <li>
                          <button
                            onClick={clearErrorFilters}
                            className="btn text-header bg-yellow border-header px-6 hover:bg-yellow hover:text-white transition-all hover:border-yellow text-base"
                          >
                            Limpiar filtros
                          </button>
                        </li>
                      </div>
                    </ul>
                  </div>
                </div>
              </>
            )}
          </div>
          {productsFilter?.length > 0 && maxSlice < productsFilter?.length && (
            <div className="w-full flex justify-center items-center p-10">
              <button
                className="px-6 py-2 border border-yellow bg-header hover:bg-header/70 text-yellow uppercase font-medium text-lg"
                onClick={handleSlice}
              >
                Ver más productos
              </button>
            </div>
          )}
        </aside>
      </div>
    </section>
  );
};

export default FilterProducts;
