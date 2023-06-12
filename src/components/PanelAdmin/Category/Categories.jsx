import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../../../utils/Loading";

const Categories = () => {
  const { categories, loading } = useSelector((state) => state.categories);

  return (
    <div className="flex flex-col mt-2 w-full max-w-7xl h-full justify-center items-center">
      <div className="w-2/3 flex justify-between">
        <Link
          to="/admin/categories/form"
          className="btn text-white hover:bg-grey hover:text-fontDark transition-all ease-in-out"
        >
          Crear categoría
        </Link>
        <Link
          to="/admin/categories/subcategories-form"
          className="btn text-white hover:bg-grey hover:text-fontDark transition-all ease-in-out my-2"
        >
          Crear subcategoria
        </Link>
      </div>

      <div className="flex flex-nowrap xl:flex-wrap max-w-[250px] sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl ">
        {loading ? <Loading /> : null}
        <div className="overflow-scroll xl:overflow-auto border border-fontDark">
          <table className="table table-xs lg:table-md table-pin-rows table-pin-cols bg-grey text-fontDark">
            <thead className="bg-grey text-lg text-fontDark">
              <tr className="bg-grey">
                <th className="bg-grey"></th>
                <td>ID</td>
                <td>Nombre</td>
                <td>Imagen</td>
                <td>Subcategorias</td>
                <th className="bg-grey"></th>
              </tr>
            </thead>
            <tbody className="bg-grey">
              {categories.length > 0 &&
                categories.map((item, index) => (
                  <tr key={item._id} className="bg-grey">
                    <th className="text-fontDark bg-grey">
                      <p>{index}</p>
                    </th>
                    <td className="text-base">
                      <p>{item._id}</p>
                    </td>
                    <td className="text-base">
                      <p>{item.nombre}</p>
                    </td>
                    <td className="text-base">
                      {item.imagen.length ? (
                        <a href={item.imagen[0]} target="_blank">
                          {item.imagen[0]}
                        </a>
                      ) : (
                        <p>No hay una imagen agregada a esta categoría</p>
                      )}
                    </td>

                    {item.subcategorias.length ? (
                      item.subcategorias.map((item) => (
                        <td key={item._id} className="flex text-base">
                          <p>{item.nombre}</p>
                        </td>
                      ))
                    ) : (
                      <td className="text-base">
                        <p>No existe subcategoría asignada</p>
                      </td>
                    )}

                    <th className="text-fontDark bg-grey">
                      <p>{index}</p>
                    </th>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Categories;
