import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProductAction } from "../../../redux/productActions";
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
const Products = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const modalProductRef = useRef(null);
  const { products, loading } = useSelector((state) => state.products);
  const [onDelete, setOnDelete] = useState(null);
  const [itemToDelete, setItemToDelete] = useState({ nombre: "", id: "" });
  const [section, setSection] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  useEffect(() => {
    const getProducts = () => {
      dispatch(getProductAction());
    };
    const getCategories = () => {
      dispatch(getCategoriesAction());
      dispatch(getSubCategoriesAction());
    };

    getCategories();

    getProducts();
  }, []);
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
      <div className="flex flex-col mt-6 w-full max-w-full h-full justify-center items-center p-6">
        <div className="w-full max-w-[350px] sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl h-auto flex justify-start mb-2">
          <Link
            to="/admin/products/form"
            className="btn text-white hover:bg-grey hover:text-fontDark transition-all ease-in-out"
          >
            Crear producto
          </Link>
        </div>
        <div className="flex flex-nowrap w-full xl:flex-wrap max-w-[350px] sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl h-auto">
          {loading ? (
            <Loading />
          ) : (
            <div className="overflow-x-auto w-full flex-col flex px-4">
              {products &&
                products.map((item, index) => (
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
                          <div className="max-w-[100px] w-20 sm:max-w-full sm:w-full">
                            <p className="overflow-ellipsis">
                              {item.descripcion
                                ?.slice(0, 1)
                                .toUpperCase()
                                .concat(item.descripcion.slice(1))}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="collapse-content text-fontDark">
                        {/*  */}
                        <div className="flex flex-col lg:flex-row flex-wrap lg:gap-6 justify-center items-start w-full">
                          <div className="flex flex-col w-full lg:w-auto lg:h-full justify-start items-start lg:items-center border-y lg:border-none py-2">
                            <h2 className="underline py-1">Imagenes:</h2>

                            {item.imagenes?.length ? (
                              item.imagenes.map((image, index) => (
                                <a
                                  key={index + "imagen"}
                                  href={image}
                                  target="_blank"
                                  className="w-52 max-w-xs overflow-hidden"
                                >
                                  {image}
                                </a>
                              ))
                            ) : (
                              <p>No hay una imagen agregada.</p>
                            )}
                          </div>
                          <div className="flex flex-col w-full lg:w-auto lg:h-full justify-start items-start lg:items-center border-y lg:border-none py-2">
                            <h2 className="underline py-1">Tipo:</h2>
                            <p>
                              {item.tipo
                                .slice(0, 1)
                                .toUpperCase()
                                .concat(item.tipo.slice(1).toLowerCase())}
                            </p>
                          </div>
                          <div className="flex flex-col w-full lg:w-auto lg:h-full justify-start items-start lg:items-center border-y lg:border-none py-2">
                            <h2 className="underline py-1">Marca:</h2>
                            <p>
                              {item.marca
                                .slice(0, 1)
                                .toUpperCase()
                                .concat(item.marca.slice(1))}
                            </p>
                          </div>
                          <div className="flex flex-col w-full lg:w-auto lg:h-full justify-start items-start lg:items-center border-y lg:border-none py-2">
                            <h2 className="underline py-1">Colores:</h2>
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
                          <div className="flex flex-col w-full lg:w-auto lg:h-full justify-start items-start lg:items-center border-y lg:border-none py-2">
                            <h2 className="underline py-1">Talles:</h2>
                            {item.talle.length > 0 ? (
                              item.talle.map((talle, index) => (
                                <div key={index + "talles"}>
                                  <p>{talle.talle}</p>
                                  <p>{talle.cantidad}</p>
                                </div>
                              ))
                            ) : (
                              <p>No se agregaron talles.</p>
                            )}
                          </div>
                          <div className="flex flex-col w-full lg:w-auto lg:h-full justify-start items-start lg:items-center border-y lg:border-none py-2">
                            <h2 className="underline py-1">Precio:</h2>
                            <p>{item.precio}</p>
                          </div>
                          <div className="flex flex-col w-full lg:w-auto lg:h-full justify-start items-start lg:items-center border-y lg:border-none py-2">
                            <h2 className="underline py-1">Código:</h2>
                            <p>{item.codigo}</p>
                          </div>
                          <div className="flex flex-col w-full lg:w-auto lg:h-full justify-start items-start lg:items-center border-y lg:border-none py-2">
                            <h2 className="underline py-1">Género:</h2>
                            <p>
                              {item.genero
                                .slice(0, 1)
                                .toUpperCase()
                                .concat(item.genero.slice(1).toLowerCase())}
                            </p>
                          </div>
                          <div className="flex flex-col w-full lg:w-auto lg:h-full justify-start items-start lg:items-center border-y lg:border-none py-2">
                            <h2 className="underline py-1">Proveedor:</h2>
                            <p>{item.proveedor}</p>
                          </div>
                          <div className="flex flex-col w-full lg:w-auto lg:h-full justify-start items-start lg:items-center border-y lg:border-none py-2">
                            <h2 className="underline py-1">Disciplina:</h2>
                            <p>
                              {item.disciplina
                                .slice(0, 1)
                                .toUpperCase()
                                .concat(item.disciplina.slice(1).toLowerCase())}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start justify-start h-full w-20 pt-2">
                      <div>
                        {" "}
                        <Link
                          to={`/admin/products/form/${item._id}`}
                          className=" p-1 flex justify-center items-center text-fontDark text-base ml-1 w-8 h-8"
                        >
                          <MdOutlineEdit
                            className="w-full h-full"
                            fontSize={16}
                          />
                        </Link>
                      </div>

                      <button
                        name="deleteProduct"
                        className=" flex justify-center items-center text-fontDark text-lg ml-2 w-8 h-8 "
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
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
