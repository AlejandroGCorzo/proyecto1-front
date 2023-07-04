import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { searchProductsAction } from "../../../redux/productActions";
import Loading from "../../../utils/Loading";
import { ConfirmationComponent } from "../../../utils/DeleteSteps";
import {
  MdDeleteOutline,
  MdOutlineAddCircleOutline,
  MdOutlineEdit,
} from "react-icons/md";
import {
  getCategoriesAction,
  getSubCategoriesAction,
} from "../../../redux/categoriesActions";
import SearchBarAdmin from "../Search/SearchBarAdmin";
import useDebounce from "../../../hooks/useDebounce";
import {
  setErrorSearchProduct,
  setSearchProducts,
} from "../../../redux/productSlice";
const Products = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const modalProductRef = useRef(null);
  const { products, productsSearch, loading, errorSearch } = useSelector(
    (state) => state.products
  );
  const [onDelete, setOnDelete] = useState(null);
  const [itemToDelete, setItemToDelete] = useState({ nombre: "", id: "" });
  const [section, setSection] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const debouncedSearchValue = useDebounce(searchValue);

  useEffect(() => {
    const getCategories = () => {
      dispatch(getCategoriesAction());
      dispatch(getSubCategoriesAction());
    };
    getCategories();
  }, []);
  useEffect(() => {
    const getProducts = () => {
      if (debouncedSearchValue) {
        if (errorSearch.length) {
          dispatch(setErrorSearchProduct(""));
        }
        dispatch(searchProductsAction(debouncedSearchValue));
      } else {
        if (errorSearch.length) {
          dispatch(setErrorSearchProduct(""));
        }

        dispatch(setSearchProducts(""));
      }
    };
    getProducts();
  }, [debouncedSearchValue]);

  const toggleModal = (e) => {
    modalProductRef.current.classList.toggle("modal-open");
    document.activeElement.blur();
    setOnDelete(!onDelete);
    if (confirmed) {
      setConfirmed(false);
    }
  };

  return (
    <>
      <div className="flex flex-col  w-full max-w-full h-full justify-center items-center lg:p-6">
        <div className="w-full max-w-[350px] sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl h-auto flex justify-between gap-1 mb-2 ">
          <Link
            to="/admin/products/form"
            className="btn text-white hover:bg-grey hover:text-header transition-all ease-in-out w-1/3 md:w-auto"
          >
            Crear producto
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
              {productsSearch?.length > 0 &&
                productsSearch.map((item, index) => (
                  <div
                    key={item._id}
                    className="bg-grey flex flex-row justify-start items-start md:text-lg border w-full"
                  >
                    <div className="collapse p-2 ">
                      <input type="checkbox" />
                      <div className="collapse-title font-medium  text-header p-1 pr-1 md:p-4 md:pr-4">
                        <div className="flex flex-col sm:flex-row justify-start items-start w-3/4 sm:w-full gap-2">
                          <div className="text-header bg-grey w-10">
                            <p>{index + 1}</p>
                          </div>
                          <div className="w-full md:max-w-xs md:w-1/3">
                            <p className="overflow-ellipsis">
                              {item.modelo
                                ?.slice(0, 1)
                                .toUpperCase()
                                .concat(item.modelo.slice(1))}
                            </p>
                          </div>
                          <div className="w-full md:max-w-xs md:w-1/3 flex flex-row md:justify-center ">
                            <p>Código: {item.codigo}</p>
                          </div>
                          <div className="w-full md:max-w-xs md:w-1/3 flex flex-row md:justify-center ">
                            <p>
                              Tipo:{" "}
                              {item.tipo
                                .slice(0, 1)
                                .toUpperCase()
                                .concat(item.tipo.slice(1).toLowerCase())}
                            </p>
                          </div>
                          <div className="w-full md:max-w-xs md:w-1/3 flex flex-row md:justify-center ">
                            <p>
                              Marca:{" "}
                              {item.marca
                                .slice(0, 1)
                                .toUpperCase()
                                .concat(item.marca.slice(1))}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="collapse-content focus:h-max ">
                        <div className="flex justify-start sm:justify-center w-full flex-col items-start sm:items-center">
                          <div className="h-max flex flex-col sm:flex-row text-header items-start justify-between sm:flex-wrap w-full">
                            <div className=" overflow-hidden w-max flex flex-col justify-start sm:items-center max-w-xs md:p-2 py-2 ">
                              <h2 className="underline font-medium pb-1">
                                Imagenes:
                              </h2>

                              {item.imagenes?.length ? (
                                item.imagenes.map((image, index) => (
                                  <div
                                    key={index + "imagen"}
                                    className="flex flex-row flex-wrap"
                                  >
                                    <img src={image} className="w-16 m-1" />
                                  </div>
                                ))
                              ) : (
                                <p>No hay una imagen agregada.</p>
                              )}
                            </div>

                            <div className="w-max flex flex-col justify-start sm:items-center   md:p-2 py-2 ">
                              <h2 className="underline font-medium">
                                Colores:
                              </h2>
                              {item.colores.length > 0 ? (
                                item.colores.map((color, index) => (
                                  <p key={index + "color"}>
                                    {color
                                      .slice(0, 1)
                                      .toUpperCase()
                                      .concat(color.slice(1).toLowerCase())}
                                  </p>
                                ))
                              ) : (
                                <p>No se agregaron colores.</p>
                              )}
                            </div>
                            <div className="w-max flex flex-col justify-start sm:items-center    md:p-2 py-2 ">
                              <h2 className="underline font-medium">Talles:</h2>
                              {item.talle.length > 0 ? (
                                item.talle.map((talle, index) => (
                                  <div
                                    key={index + "talles"}
                                    className="flex flex-row  justify-evenly gap-4"
                                  >
                                    <p>Talle: {talle.talle}</p>
                                    <p>Cantidad: {talle.cantidad}</p>
                                  </div>
                                ))
                              ) : (
                                <p>No se agregaron talles.</p>
                              )}
                            </div>
                            <div className="w-max flex flex-col justify-start sm:items-center    md:p-2 py-2 ">
                              <h2 className="underline font-medium">Precio:</h2>
                              <p>${item.precio}</p>
                            </div>

                            <div className="w-max flex flex-col justify-start sm:items-center    md:p-2 py-2 ">
                              <h2 className="underline font-medium">
                                Proveedor:
                              </h2>
                              <p>{item.proveedor}</p>
                            </div>
                            <Link
                              to={`/detail/${item._id}`}
                              className="btn bg-opacity-75 text-white hover:bg-grey hover:text-header transition-all ease-in-out w-full md:w-auto overflow-ellipsis my-4"
                            >
                              Ir al producto
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start justify-start h-full w-20 pt-2">
                      <div>
                        {" "}
                        <Link
                          to={`/admin/products/form/${item._id}`}
                          className=" p-1 flex justify-center items-center text-header text-base ml-1 w-8 h-8"
                        >
                          <MdOutlineEdit
                            className="w-full h-full"
                            fontSize={16}
                          />
                        </Link>
                      </div>

                      <button
                        name="deleteProduct"
                        className=" flex justify-center items-center text-header text-lg ml-2 w-8 h-8 "
                        onClick={toggleModal}
                      >
                        <MdDeleteOutline
                          className="w-full h-full"
                          fontSize={16}
                          onClick={() => {
                            setItemToDelete({
                              nombre: item.codigo,
                              id: item._id,
                            });
                            setSection("Productos");
                          }}
                        />
                      </button>
                    </div>
                  </div>
                ))}
              <dialog ref={modalProductRef} className="modal bg-grey/40">
                <div className="modal-box bg-white">
                  <button
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-header text-xl"
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
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
