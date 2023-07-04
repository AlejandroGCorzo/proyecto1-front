import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postSubToCategoryAction } from "../../../redux/categoriesActions";

const AddSubcategory = ({ subForm, setSubForm, errorSub, setErrorSub }) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const selectInputRef = useRef(null);
  const { categories, subcategorias, loading } = useSelector(
    (state) => state.categories
  );
  const categoryToUpdate = categories.find(
    (cat) => cat._id === subForm.categoriaId
  );

  const addedCategories = categoryToUpdate?.subcategorias?.map(
    (item) => item._id
  );

  const validate = (input) => {
    let error = {};
    if (addedCategories.length && addedCategories.includes(input)) {
      error.subcategoria =
        "La subcategoría ya se encuentra dentro de la categoría, elija una diferente.";
    }
    if (!input || input === "Elige una Subcategoría") {
      error.subcategoria = "Selecciona una subcategoría";
    }
    return error;
  };
  const handleChangeForm = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    setSubForm((prev) => ({ ...prev, subcategoriaId: value }));
    let errorSub = validate(value);
    setErrorSub(errorSub);
  };
  const validateOnBlur = (e) => {
    const { value, name } = e.target;
    if (value === "Elige una Subcategoría") {
      let errorSub = validate(value);
      setErrorSub(errorSub);
    } else {
      setSubForm((prev) => ({ ...prev, subcategoriaId: value }));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postSubToCategoryAction(subForm));
    setSubForm({
      categoriaId: "",
      subcategoriaId: "",
    });
    setErrorSub({ subcategoria: "" });
  };
  let isFormDisabled =
    Object.values(errorSub).length || Object.values(subForm).length !== 2
      ? true
      : false;

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="flex flex-col w-40 sm:w-full mb-4">
          <label className="label text-xl text-header font-medium">
            <span>Añadir subcategorías.</span>
          </label>
          <small className="h-auto text-gray-500 w-full flex self-start mb-1 text-base">
            * Al seleccionar una subcategoría, la misma se guardara dentro de la
            categoría seleccionada.
          </small>
          <select
            className="select select-bordered bg-header mt-2"
            name="subcategoria"
            ref={selectInputRef}
            onChange={handleChangeForm}
            onBlur={validateOnBlur}
            defaultValue="Elige una Subcategoría"
          >
            <option disabled>Elige una Subcategoría</option>
            {subcategorias.map((item) => (
              <option key={item._id + "addSub"} value={item._id}>
                {item?.nombre
                  ?.slice(0, 1)
                  .toUpperCase()
                  .concat(item.nombre.slice(1))}
              </option>
            ))}
          </select>
          {errorSub?.subcategoria?.length ? (
            <small className="h-6 text-red-600 w-full flex self-start mb-1">
              {errorSub.subcategoria}
            </small>
          ) : (
            subForm?.subcategoriaId?.length === 0 && (
              <small className="h-6 text-red-600 w-full flex self-start mb-1">
                * Campo requerido
              </small>
            )
          )}
        </div>
        <button
          type="submit"
          className="btn mt-1 2xl:mt-0 text-white hover:bg-white hover:text-header transition-all ease-in-out disabled:bg-header/80 disabled:text-fontGrey max-w-[25%]"
          disabled={isFormDisabled}
        >
          Añadir
        </button>
      </form>
    </>
  );
};

export default AddSubcategory;
