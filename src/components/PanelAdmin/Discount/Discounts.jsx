import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCuponesAction,
  searchCuponesAction,
} from "../../../redux/discountsActions";
import { Link } from "react-router-dom";
import Loading from "../../../utils/Loading";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import useDebounce from "../../../hooks/useDebounce";
import { setErrorSearch } from "../../../redux/discountsSlice";
import SearchBarAdmin from "../Search/SearchBarAdmin";
import { ConfirmationComponent } from "../../../utils/DeleteSteps";

const Discounts = () => {
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  const { loading, cupones, errorSearch } = useSelector(
    (state) => state.discounts
  );
  const sortedDiscounts = [...cupones].sort(
    (a, b) => a.nombre && b.nombre && a.nombre.localeCompare(b.nombre)
  );
  const [errorSub, setErrorSub] = useState({ subcategoria: "" });
  const [onDelete, setOnDelete] = useState(null);
  const [itemToDelete, setItemToDelete] = useState({ nombre: "", id: "" });
  const [section, setSection] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue);
  useEffect(() => {
    if (!cupones?.length) {
      dispatch(getCuponesAction());
    }
  }, [cupones]);

  useEffect(() => {
    const getCupones = () => {
      if (debouncedSearchValue) {
        if (errorSearch.length) {
          dispatch(setErrorSearch(""));
        }
        dispatch(searchCuponesAction(debouncedSearchValue));
      } else {
        if (errorSearch.length) {
          dispatch(setErrorSearch(""));
        }

        dispatch(getCuponesAction());
      }
    };
    getCupones();
  }, [debouncedSearchValue]);

  const toggleModal = (e) => {
    modalRef.current.classList.toggle("modal-open");
    document.activeElement.blur();
    setOnDelete(!onDelete);
    if (confirmed) {
      setConfirmed(false);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-full h-full justify-start items-center">
      <div className="w-full max-w-[350px] sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl h-auto flex justify-between gap-1 mt-4 sm:mt-0 3xl:mt-4  mb-2">
        <Link
          to="/admin/discounts/form"
          className="btn bg-header text-white hover:bg-grey hover:text-header transition-all ease-in-out w-1/3 md:w-auto"
        >
          Crear cupón
        </Link>
        <SearchBarAdmin
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          error={errorSearch}
        />
      </div>

      <div className="flex flex-nowrap w-full xl:flex-wrap max-w-[400px] sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl h-auto justify-center items-center">
        {loading ? (
          <Loading />
        ) : (
          <div className="overflow-x-auto w-full flex-col flex items-center justify-center  pb-4">
            {sortedDiscounts.length > 0 &&
              sortedDiscounts.map((item, index) => (
                <div
                  key={item._id}
                  className="bg-grey flex flex-row justify-between items-center lg:justify-between  md:text-lg border w-full sm:w-2/3 lg:w-full"
                >
                  <div className="font-medium  text-header w-[95%] p-4 flex flex-row justify-between items-center">
                    <div className="flex flex-row justify-between items-center w-full">
                      <div className="text-header bg-grey w-10">
                        <p>{index + 1}</p>
                      </div>
                      <div className="flex flex-col lg:flex-row w-full justify-between items-center">
                        <div className=" w-40 text-center">
                          <p className="whitespace-nowrap">
                            {item.nombre
                              ?.slice(0, 1)
                              .toUpperCase()
                              .concat(item.nombre.slice(1))}
                          </p>
                        </div>
                        {item.descuento && item.descuento > 0 && (
                          <div className=" w-40 text-center">
                            <p className="whitespace-nowrap">
                              Descuento: {item.descuento}%
                            </p>
                          </div>
                        )}
                        {item.cantidad && (
                          <div className=" w-40 text-center">
                            <p className="whitespace-nowrap">
                              Cantidad: {item.cantidad}
                            </p>
                          </div>
                        )}
                        {item.creacion && (
                          <div className=" w-40 text-center">
                            <p className="whitespace-nowrap">
                              Creado:{" "}
                              {new Date(item.creacion)?.toLocaleDateString()}
                            </p>
                          </div>
                        )}
                        {item.vencimiento && (
                          <div className=" w-40 text-center">
                            <p className="whitespace-nowrap">
                              Vto:{" "}
                              {new Date(item.vencimiento)?.toLocaleDateString()}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center w-20 h-full px-2">
                    <Link
                      to={`/admin/discounts/form/${item._id}`}
                      className=" p-1 flex justify-center items-center text-header text-base ml-1 w-8 h-8"
                    >
                      <MdOutlineEdit className="w-full h-full" fontSize={16} />
                    </Link>

                    <button
                      name="deleteCupon"
                      className=" flex justify-center items-center text-header text-lg w-8 h-8 "
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
                          setSection("Cupones");
                        }}
                      />
                    </button>
                  </div>
                </div>
              ))}
            <dialog ref={modalRef} className="modal bg-grey/40">
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
  );
};

export default Discounts;
