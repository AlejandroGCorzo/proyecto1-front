import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Filters from "../../utils/Filters";
import { LuListPlus } from "react-icons/lu";

const FilterProducts = () => {
  const { productsFilter } = useSelector((state) => state.products);
  const { subcategorias } = useSelector((state) => state.categories);
  let productBrands = [...new Set(productsFilter?.map((item) => item.marca))];
  let brandImg = subcategorias.filter((item) =>
    productBrands.includes(item.nombre)
  );

  return (
    <section className="w-full h-auto flex flex-row  justify-center items-center max-h-max mt-[40%] sm:mt-[21%] md:max-lg:mt-[15.5%] lg:mt-[15%] 2xl:mt-[9.5%]">
      <div className=" flex flex-row justify-center items-start gap-2 w-full">
        <aside className="w-72 pt-7 pl-2 hidden lg:block">
          <Filters />
        </aside>
        <aside className="flex flex-col justify-center items-center w-full md:max-w-3xl lg:max-w-6xl">
          <div className="w-full flex justify-between items-start py-4 px-4 text-lg gap-2 lg:gap-0">
            <p className="hidden lg:block">
              {productsFilter?.length} Productos
            </p>
            <div className="drawer drawer-end lg:hidden grid w-1/2">
              <input
                id="my-drawer-4"
                type="checkbox"
                className="drawer-toggle"
              />
              <div className="drawer-content">
                {/* Page content here */}
                <label
                  htmlFor="my-drawer-4"
                  className="drawer-button p-3 rounded-lg flex justify-between lg:justify-center items-center lg:max-w-max w-full bg-white text-base text-gray-600 font-normal whitespace-nowrap "
                >
                  Filtrar por <LuListPlus fontSize={18} />
                </label>
              </div>
              <div className="drawer-side z-[9999]">
                <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
                <ul className="menu transition-all w-2/3 sm:w-2/4 h-full overflow-y-auto text-base-content bg-white p-0">
                  <Filters />
                </ul>
              </div>
            </div>
            <details className="dropdown w-1/2 lg:w-auto">
              <summary className="select py-0 flex lg:justify-center items-center lg:max-w-max w-full bg-white text-base text-gray-600 font-normal whitespace-nowrap">
                Ordenar por
              </summary>
              <ul className="p-2 text-lg shadow menu dropdown-content z-[1] rounded-box w-max bg-white flex flex-col gap-1 text-fontDark">
                <li className="hover:text-orange transition-all cursor-pointer px-2">
                  Relevancia
                </li>
                <li className="hover:text-orange transition-all cursor-pointer px-2">
                  Más reciente
                </li>
                <li className="hover:text-orange transition-all cursor-pointer px-2">
                  Descuento
                </li>
                <li className="hover:text-orange transition-all cursor-pointer px-2">
                  Precio más alto
                </li>
                <li className="hover:text-orange transition-all cursor-pointer px-2">
                  Precio más bajo
                </li>
              </ul>
            </details>
          </div>
          <div className="flex flex-row flex-wrap w-full justify-center gap-1 flex-1 text-fontDark ">
            {productsFilter?.length ? (
              productsFilter?.map((item, index) => (
                <Link to={`/detail/${item._id}`} key={item._id}>
                  <div className="sm:max-w-[250px] border border-nav/20 rounded px-3 py-5 hover:shadow-md hover:outline-offset-8 transition-all ease-in-out text-header  bg-white ">
                    <div className="mb-1">
                      <span className=" absolute text-white bg-header p-1 ">
                        NUEVO
                      </span>
                      {item.imagenes.length && (
                        <img
                          src={item.imagenes[0]}
                          alt={item.modelo}
                          className="h-full aspect-auto object-contain"
                        />
                      )}
                    </div>
                    {brandImg?.length &&
                      brandImg.map(
                        (brand) =>
                          brand.nombre === item.marca && (
                            <div key={brand._id} className="p-2">
                              <img
                                src={brand.imagen[0]}
                                alt={brand.nombre}
                                width={30}
                                className="object-contain aspect-auto"
                              />
                            </div>
                          )
                      )}
                    <p className="text-gray-400 py-2 uppercase font-medium h-16">
                      {item.modelo}
                    </p>
                    <p className="text-xl">
                      <strong>${item.precio}</strong>
                    </p>
                    <p className="py-2">
                      <strong>3</strong> cuotas de{" "}
                      <strong>${(item.precio / 3).toFixed(2)}</strong>
                    </p>
                    <p className="font-medium text-orange text-sm">
                      ENVÍO GRATIS
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <>
                <div>No existe un producto con esas caracteristicas</div>
              </>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
};

export default FilterProducts;
