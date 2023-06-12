import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../../../utils/Loading";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import {
  deleteSubCategoriesAction,
  getSubCategoriesAction,
} from "../../../redux/categoriesActions";

const SubCategories = () => {
  const dispatch = useDispatch();
  const { categories, subcategorias, loading } = useSelector(
    (state) => state.categories
  );
  useEffect(() => {
    const getCategories = () => {
      dispatch(getSubCategoriesAction());
    };

    getCategories();
  }, []);

  const handleDelete = (e) => {
    e.preventDefault();
    if (e.target.tagName === "BUTTON") {
      const { name, value } = e.target;
      if (name === "deleteSubcategory" && value.length) {
        dispatch(deleteSubCategoriesAction(value));
      }
    } else if (e.target.tagName === "svg") {
      const { name, value } = e.target.parentElement;
      if (name === "deleteSubcategory" && value.length) {
        dispatch(deleteSubCategoriesAction(value));
      }
    }
  };
  return (
    <div className="flex flex-col mt-2 w-full max-w-7xl h-full justify-center items-center">
      <div className="w-2/3 flex justify-start mb-2">
        <Link
          to="/admin/subcategories/subcategories-form"
          className="btn text-white hover:bg-grey hover:text-fontDark transition-all ease-in-out"
        >
          Crear Subcategoría
        </Link>
      </div>

      <div className="flex flex-nowrap xl:flex-wrap max-w-[250px] sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl h-full">
        {loading ? (
          <Loading />
        ) : (
          <div className="overflow-scroll xl:overflow-auto border border-fontDark">
            <table className="table table-xs lg:table-md table-pin-rows table-pin-cols bg-grey text-fontDark">
              <thead className="bg-grey text-lg text-fontDark">
                <tr className="bg-grey">
                  <th className="bg-grey"></th>
                  <th className="bg-grey"></th>
                  <td>ID</td>
                  <td>Nombre</td>
                  <td>Imagen</td>
                  <td>Categorias</td>
                  <th className="bg-grey"></th>
                </tr>
              </thead>
              <tbody className="bg-grey">
                {subcategorias.length > 0 &&
                  subcategorias.map((item, index) => (
                    <tr key={item._id} className="bg-grey">
                      <th className="text-fontDark bg-grey">
                        <p>{index + 1}</p>
                      </th>
                      <td className="flex p-0 m-0 ">
                        <Link
                          to={`/admin/subcategories/subcategories-form/${item._id}`}
                          className="btn p-1 flex justify-center items-center text-white text-base ml-1 w-8 h-8"
                        >
                          <FiEdit className="w-full h-full" />
                        </Link>
                        <button
                          name="deleteSubcategory"
                          value={item._id}
                          className="btn p-1 flex justify-center items-center text-white text-lg ml-2 w-8 h-8"
                          onClick={handleDelete}
                        >
                          <MdDeleteOutline className="w-full h-full" />
                        </button>
                      </td>
                      <td className="text-base">
                        <p>{item._id}</p>
                      </td>
                      <td className="text-base">
                        <p>
                          {item.nombre
                            ?.slice(0, 1)
                            .toUpperCase()
                            .concat(item.nombre.slice(1))}
                        </p>
                      </td>
                      <td className="text-base">
                        {item.imagen?.length ? (
                          <a href={item.imagen[0]} target="_blank">
                            {item.imagen[0]}
                          </a>
                        ) : (
                          <p>No hay una imagen agregada a esta categoría</p>
                        )}
                      </td>

                      {item.categoria?.length ? (
                        <td className="justify-end items-center flex text-base">
                          <p>{item.categoria}</p>
                        </td>
                      ) : (
                        <td className="text-base">
                          <p>Categoría no asignada</p>
                        </td>
                      )}

                      <th className="text-fontDark bg-grey">
                        <p>{index + 1}</p>
                      </th>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubCategories;
