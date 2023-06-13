import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../../../utils/Loading";
import {
  MdDeleteOutline,
  MdOutlineAddCircleOutline,
  MdOutlineEdit,
} from "react-icons/md";
import {
  deleteCategoriesSubCategoryAction,
  deleteSubCategoriesAction,
  getCategoriesAction,
  getSubCategoriesAction,
} from "../../../redux/categoriesActions";
import { ConfirmationComponent } from "../../../utils/DeleteSteps";

const Categories = () => {
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  const { categories, loading } = useSelector((state) => state.categories);
  const [onDelete, setOnDelete] = useState(null);
  const [itemToDelete, setItemToDelete] = useState({ nombre: "", id: "" });
  const [confirmed, setConfirmed] = useState(false);
  useEffect(() => {
    const getCategories = () => {
      dispatch(getCategoriesAction());
      dispatch(getSubCategoriesAction());
    };

    getCategories();
  }, []);
  const toggleModal = (e) => {
    modalRef.current.classList.toggle("modal-open");
    document.activeElement.blur();
    setOnDelete(!onDelete);
    if (confirmed) {
      setConfirmed(false);
    }
  };

  return (
    <div className="flex flex-col mt-6 w-full max-w-full h-full justify-center items-center p-6">
      <div className="w-full flex justify-start mb-2">
        <Link
          to="/admin/categories/form"
          className="btn text-white hover:bg-grey hover:text-fontDark transition-all ease-in-out"
        >
          Crear categoría
        </Link>
      </div>

      <div className="flex flex-nowrap w-full xl:flex-wrap max-w-[350px] sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl h-auto">
        {loading ? (
          <Loading />
        ) : (
          <div className="overflow-x-auto w-full flex-col flex px-4">
            {categories.length > 0 &&
              categories.map((item, index) => (
                <div
                  key={item._id}
                  className="bg-grey flex flex-row justify-center items-center md:text-lg border w-max md:w-full"
                >
                  <div className="collapse p-2">
                    <input type="checkbox" />
                    <div className="collapse-title font-medium flex flex-row justify-start md:justify-between items-center text-fontDark w-full p-4 pr-4">
                      <div className="text-fontDark bg-grey w-10">
                        <p>{index + 1}</p>
                      </div>
                      <div className="w-52 max-w-xs">
                        <p>
                          {item.nombre
                            ?.slice(0, 1)
                            .toUpperCase()
                            .concat(item.nombre.slice(1))}
                        </p>
                      </div>
                      <div className="w-80 overflow-hidden flex justify-start items-center">
                        {item.imagen.length ? (
                          <a href={item.imagen[0]} target="_blank" className="">
                            {item.imagen[0]}
                          </a>
                        ) : (
                          <p>No hay una imagen agregada.</p>
                        )}
                      </div>
                    </div>
                    <div className="collapse-content flex flex-col text-fontDark ">
                      <div className="flex w-full justify-center items-center">
                        <Link
                          name="deleteSub"
                          className=" p-1 flex justify-center items-center text-fontDark text-lg ml-1 w-8 h-8"
                        >
                          <MdOutlineAddCircleOutline className="w-full h-full" />
                        </Link>
                        <h2 className="underline py-1">Subcategorías:</h2>
                      </div>
                      <div className="flex flex-col justify-center items-center">
                        {item.subcategorias.length ? (
                          item.subcategorias.map((sub) => (
                            <div className="flex flex-row justify-between w-2/3 items-start px-2 py-2 border-y">
                              <p>
                                {sub.nombre
                                  ?.slice(0, 1)
                                  .toUpperCase()
                                  .concat(sub.nombre.slice(1))}
                              </p>
                              <button
                                name="deleteSub"
                                value={`categoriaId: ${item._id}, subcategoriaId: ${sub._id}`}
                                className=" p-1 flex justify-center items-center text-fontDark text-lg ml-1 w-8 h-8"
                              >
                                <MdDeleteOutline className="w-full h-full" />
                              </button>
                            </div>
                          ))
                        ) : (
                          <div className="text-base">
                            <p>No existe subcategoría asignada</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start justify-start h-full w-20 pt-2">
                    <div>
                      {" "}
                      <Link
                        to={`/admin/categories/form/${item._id}`}
                        className=" p-1 flex justify-center items-center text-fontDark text-base ml-1 w-8 h-8"
                      >
                        <MdOutlineEdit
                          className="w-full h-full"
                          fontSize={16}
                        />
                      </Link>
                    </div>

                    <button
                      name="deleteCategory"
                      className=" flex justify-center items-center text-fontDark text-lg ml-2 w-8 h-8 "
                      onClick={toggleModal}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          toggleDropdown();
                        }
                      }}
                    >
                      <MdDeleteOutline
                        className="w-full h-full"
                        fontSize={16}
                        onClick={() =>
                          setItemToDelete({ nombre: item.nombre, id: item._id })
                        }
                      />
                    </button>
                    <dialog ref={modalRef} className="modal bg-grey/40">
                      <div className="modal-box bg-grey">
                        <button
                          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-fontDark text-xl"
                          onClick={toggleModal}
                        >
                          ✕
                        </button>

                        <ConfirmationComponent
                          onDelete={onDelete}
                          toggleModal={toggleModal}
                          confirmed={confirmed}
                          setConfirmed={setConfirmed}
                          itemToDelete={itemToDelete}
                          setItemToDelete={setItemToDelete}
                          section={"Categorías"}
                        />
                      </div>
                    </dialog>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
