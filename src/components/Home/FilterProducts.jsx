import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Filters from "../../utils/Filters";

const FilterProducts = () => {
  const params = useParams();
  const { productsFilter } = useSelector((state) => state.products);
  const { subcategorias } = useSelector((state) => state.categories);
  let productBrands = [...new Set(productsFilter?.map((item) => item.marca))];
  let brandImg = subcategorias.filter((item) =>
    productBrands.includes(item.nombre)
  );

  return (
    <section className="mt-[10%] w-full flex flex-col justify-center items-center">
      <div className="w-full flex flex-row justify-center items-start gap-2">
        <aside className="w-72 pt-7">
          <p className="font-medium text-fontDark pb-7 px-6">
            {params.filter.toUpperCase()}
          </p>
          <Filters products={productsFilter} />
        </aside>
        <aside className="flex flex-col justify-center items-center w-max max-w-6xl">
          <div className="w-full flex justify-between items-start pt-6 px-4 text-lg ">
            <p>{productsFilter?.length} Productos</p>
            <details className="dropdown ">
              <summary className="select py-0 flex justify-center items-center max-w-max w-full bg-white text-base text-gray-600 font-normal">
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
          <div className="flex flex-row flex-wrap w-full justify-between gap-2 flex-1 text-fontDark p-2">
            {productsFilter?.length > 0 &&
              productsFilter.map((item, index) => (
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
              ))}
          </div>
        </aside>
      </div>
    </section>
  );
};

export default FilterProducts;
