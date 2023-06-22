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
  searchCategoriesAction,
} from "../../../redux/categoriesActions";
import { ConfirmationComponent } from "../../../utils/DeleteSteps";
import AddSubcategory from "./AddSubcategory";
import useDebounce from "../../../hooks/useDebounce";
import SearchBarAdmin from "../Search/SearchBarAdmin";
import { setErrorSearchCategory } from "../../../redux/categoriesSlice";

const Categories = () => {
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  const modalRefSub = useRef(null);
  const { categories, loading, errorSearch } = useSelector(
    (state) => state.categories
  );
  const sortedCategories = [...categories].sort((a, b) =>
    a.nombre.localeCompare(b.nombre)
  );
  const [subForm, setSubForm] = useState({
    categoriaId: "",
    subcategoriaId: "",
  });
  const [errorSub, setErrorSub] = useState({ subcategoria: "" });
  const [onDelete, setOnDelete] = useState(null);
  const [itemToDelete, setItemToDelete] = useState({ nombre: "", id: "" });
  const [section, setSection] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue);

  useEffect(() => {
    const getSubCategories = () => {
      dispatch(getSubCategoriesAction());
    };

    getSubCategories();
  }, []);

  useEffect(() => {
    const getCategories = () => {
      if (debouncedSearchValue) {
        if (errorSearch.length) {
          dispatch(setErrorSearchCategory(""));
        }
        dispatch(searchCategoriesAction(debouncedSearchValue));
      } else {
        if (errorSearch.length) {
          dispatch(setErrorSearchCategory(""));
        }

        dispatch(getCategoriesAction());
      }
    };
    getCategories();
  }, [debouncedSearchValue]);

  const toggleModal = (e) => {
    modalRef.current.classList.toggle("modal-open");
    document.activeElement.blur();
    setOnDelete(!onDelete);
    if (confirmed) {
      setConfirmed(false);
    }
  };
  const toggleModalAddSub = (e) => {
    modalRefSub.current.classList.toggle("modal-open");
    document.activeElement.blur();
    setSubForm({
      categoriaId: e.target.value,
      subcategoriaId: "",
    });
    setErrorSub({ subcategoria: "" });
  };
  return (
    <div className="flex flex-col mt-6 w-full max-w-full h-full justify-center items-center p-2">
      <div className="w-full max-w-[350px] sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl h-auto flex justify-between gap-1 mb-2">
        <Link
          to="/admin/categories/form"
          className="btn text-white hover:bg-grey hover:text-fontDark transition-all ease-in-out w-1/3 md:w-auto"
        >
          Crear categoría
        </Link>
        <SearchBarAdmin
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          error={errorSearch}
        />
      </div>

      <div className="flex flex-nowrap w-full xl:flex-wrap max-w-[400px] sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl h-auto">
        {loading ? (
          <Loading />
        ) : (
          <div className="overflow-x-auto w-full flex-col flex px-4">
            {sortedCategories.length > 0 &&
              sortedCategories.map((item, index) => (
                <div
                  key={item._id}
                  className="bg-grey flex flex-row justify-start items-start md:text-lg border w-full"
                >
                  <div className="collapse p-2">
                    <input type="checkbox" />
                    <div className="collapse-title font-medium  text-fontDark w-full p-4 pr-4">
                      <div className="flex flex-row justify-start items-center w-full">
                        <div className="text-fontDark bg-grey w-10">
                          <p>{index + 1}</p>
                        </div>
                        <div className="max-w-[100px] w-24 sm:max-w-full sm:w-full">
                          <p className="overflow-ellipsis">
                            {item.nombre
                              ?.slice(0, 1)
                              .toUpperCase()
                              .concat(item.nombre.slice(1))}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="collapse-content ">
                      <div className="flex flex-col text-fontDark items-start justify-center w-full">
                        <div className=" overflow-hidden flex flex-col justify-center items-center md:items-start w-full">
                          <h2 className="underline py-1">Imagen:</h2>
                          {item.imagen.length ? (
                            <img src={item.imagen[0]} className="w-16" />
                          ) : (
                            <p className="text-center">
                              No hay una imagen agregada.
                            </p>
                          )}
                        </div>
                        <div className="flex flex-col md:flex-row w-full justify-between items-center py-2">
                          <h2 className="underline px-2 py-1">
                            Subcategorías:
                          </h2>
                          <button
                            name="addSub"
                            className="btn text-white hover:bg-grey hover:text-fontDark transition-all ease-in-out"
                            value={item._id}
                            onClick={toggleModalAddSub}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                toggleDropdown();
                              }
                            }}
                          >
                            Añadir Subcategoria
                          </button>
                        </div>
                        <div className="flex flex-col justify-center items-center w-full">
                          {item?.subcategorias?.length ? (
                            item.subcategorias.map((sub) => (
                              <div
                                className="flex flex-row justify-between w-full  items-start px-2 py-2 border-y"
                                key={sub?._id}
                              >
                                <p>
                                  {sub?.nombre
                                    ?.slice(0, 1)
                                    .toUpperCase()
                                    .concat(sub?.nombre.slice(1))}
                                </p>
                                <button
                                  name="deleteSub"
                                  className=" md:p-1 flex justify-center items-center text-fontDark text-lg ml-1 w-8 h-8"
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
                                    onClick={() => {
                                      setItemToDelete({
                                        nombre: sub.nombre,
                                        categoriaId: item._id,
                                        id: sub._id,
                                      });
                                      setSection(
                                        `las Subcategorías de ${item.nombre}`
                                      );
                                    }}
                                  />
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
                    >
                      <MdDeleteOutline
                        className="w-full h-full"
                        fontSize={16}
                        onClick={() => {
                          setItemToDelete({
                            nombre: item.nombre,
                            id: item._id,
                          });
                          setSection("Categorías");
                        }}
                      />
                    </button>
                  </div>
                </div>
              ))}
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
                  section={section}
                />
              </div>
            </dialog>
            <dialog ref={modalRefSub} className="modal bg-grey/40">
              <div className="modal-box bg-grey">
                <button
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-fontDark text-xl"
                  onClick={toggleModalAddSub}
                >
                  ✕
                </button>

                <AddSubcategory
                  subForm={subForm}
                  setSubForm={setSubForm}
                  errorSub={errorSub}
                  setErrorSub={setErrorSub}
                />
              </div>
            </dialog>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
