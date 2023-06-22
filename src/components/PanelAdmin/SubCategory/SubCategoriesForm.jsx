import React, { useRef, useState } from "react";
import { postSubCategoryAction } from "../../../redux/categoriesActions";
import { useDispatch, useSelector } from "react-redux";
import ServerError from "../../../utils/ServerError";
import ServerSuccess from "../../../utils/ServerSuccess";
import {
  setErrorSubCategory,
  setSuccessSubCategory,
} from "../../../redux/categoriesSlice";

const SubCategoriesForm = () => {
  const formData = new FormData();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const selectInputRef = useRef(null);
  const { errorSub, successSub, categories, subcategorias } = useSelector(
    (state) => state.categories
  );
  const categoriesNameAndId = categories.map((item) => ({
    name: item.nombre,
    id: item._id,
    subcategories: item.subcategorias,
  }));
  const subcategoriesNames = subcategorias.map((item) =>
    item.nombre.toUpperCase()
  );
  const token = localStorage.getItem("token");
  const [errorName, setErrorName] = useState({});
  const [errorImage, setErrorImage] = useState({});
  const [image, setImage] = useState({});
  const [form, setForm] = useState({
    categoria: "",
    nombre: "",
    imagen: [],
  });

  const clearForm = () => {
    setErrorName({});
    setErrorImage({});
    setForm({
      categoria: "",
      nombre: "",
      imagen: [],
    });
    setImage({});
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Limpiar el valor del input
    }
    if (selectInputRef.current) {
      selectInputRef.current.value = "Elige una categoría"; // Limpiar el valor del input
    }
    dispatch(setErrorSubCategory(""));
    dispatch(setSuccessSubCategory(""));
  };
  const validateName = (input) => {
    let error = {};

    if (input.name === "nombre") {
      if (subcategoriesNames.includes(input.value.toUpperCase())) {
        error.nombre =
          "La Subcategoría ya existente, ingrese un nombre diferente.";
      }
      if (!input.value) {
        error.nombre = "El campo Nombre no puede estar vacío.";
      }
    }
    if (input.name === "categoria") {
      if (input.value === "Elige una categoría" || !input.value) {
        error.categoria = "Debe seleccionar una categoría.";
      }
    }
    return error;
  };

  const validateImage = (input) => {
    let error = {};

    if (!input) {
      error.image = "Debe ingresar una imagen";
    }
    return error;
  };

  const validateOnBlur = (e) => {
    e.preventDefault();
    const { name, value, files } = e.target;
    if (name === "nombre" || name === "categoria") {
      let errorFormValidation = validateName(e.target);
      setErrorName(errorFormValidation);
    }
    if (name === "imagenFile") {
      let errorFormValidation = validateImage(files[0]);
      setErrorImage(errorFormValidation);
    }
  };
  const handleChangeForm = (e) => {
    e.preventDefault();
    const { name, value, files } = e.target;
    if (files) {
      let file = files[0];
      if (name === "imagenFile" && file) {
        setImage(file);
        let errorFormValidation = validateImage(file);
        setErrorImage(errorFormValidation);
      }
    }

    if (name === "nombre" || name === "categoria") {
      setForm((prev) => ({ ...prev, [name]: value }));
      let errorFormValidation = validateName(e.target);
      setErrorName(errorFormValidation);
    }
  };
  const handleSubmitForm = (e) => {
    e.preventDefault();

    async function post() {
      formData.append("data", JSON.stringify(form));
      formData.append("files", image);
      await dispatch(postSubCategoryAction(formData, token));
    }
    post();
    clearForm();
  };

  let isFormDisabled =
    !Object.values(form).join("").length ||
    !form?.categoria?.length ||
    !image?.name?.length ||
    Object.values(errorName).join("").length ||
    Object.values(errorImage).join("").length
      ? true
      : false;

  return (
    <div className="flex flex-col w-full justify-start items-center">
      <div
        className="w-full p-2 flex flex-col sm:flex-row sm:self-start justify-center items-center sm:justify-end sm:mt-0
          text-xl text-blue-400 ml-4 mt-4"
      >
        <button
          className="btn mt-1 2xl:mt-0 text-white hover:bg-grey hover:text-fontDark transition-all ease-in-out self-center justify-end"
          onClick={clearForm}
        >
          Limpiar formulario
        </button>
      </div>
      {errorSub.length > 0 && <ServerError error={errorSub} />}
      {successSub.length > 0 && <ServerSuccess success={successSub} />}
      <h2 className="pt-2 h-10 font-semibold text-fontDark underline text-xl md:text-2xl flex self-center sm:w-2/3">
        Crear Subcategoría:{" "}
      </h2>
      <form
        className="form-control w-2/3 gap-4 p-4 text-fontDark text-lg flex flex-col justify-between items-start "
        onSubmit={handleSubmitForm}
      >
        <div className="flex flex-col w-40 sm:w-full ">
          <label className="label">
            <span>Categorías</span>
          </label>
          <small className="h-auto text-gray-500 w-full flex self-start mb-1">
            * Al seleccionar una categoría, la subcategoría creada se asociara
            automáticamente a la categoría elegida.
          </small>
          <select
            className="select select-bordered bg-fontGrey"
            name="categoria"
            ref={selectInputRef}
            onChange={handleChangeForm}
            onBlur={validateOnBlur}
            defaultValue="Elige una categoría"
          >
            <option disabled>Elige una categoría</option>
            {categoriesNameAndId.map((item) => (
              <option key={item.id + "subForm"} value={item.id}>
                {item?.name
                  ?.slice(0, 1)
                  .toUpperCase()
                  .concat(item.name.slice(1))}
              </option>
            ))}
          </select>{" "}
          {errorName?.categoria?.length ? (
            <small className="h-6 text-red-600 w-full flex self-start mb-1">
              {errorName.categoria}
            </small>
          ) : (
            form?.categoria?.length === 0 && (
              <small className="h-6 text-red-600 w-full flex self-start mb-1">
                * Campo requerido
              </small>
            )
          )}
        </div>
        <div className="flex flex-col w-40 sm:w-full">
          <label className="label pt-2 pb-0">
            <span>Subcategoría</span>
          </label>
          <input
            type="text"
            className="input bg-fontGrey"
            name="nombre"
            value={form.nombre}
            onChange={handleChangeForm}
            onBlur={validateOnBlur}
            placeholder="Nombre de la subcategoria"
          />
          {errorName?.nombre?.length ? (
            <small className="h-6 text-red-600 w-full flex self-start mb-1">
              {errorName.nombre}
            </small>
          ) : (
            form?.nombre?.length === 0 && (
              <small className="h-6 text-red-600 w-full flex self-start mb-1">
                * Campo requerido
              </small>
            )
          )}
        </div>
        <div className="flex flex-col w-40 sm:w-full">
          <label className="label pt-2 pb-0">
            <span>Imagen</span>
          </label>
          <small className="h-auto text-gray-500 w-full flex self-start mb-1">
            * Al agregar una nueva imagen, se reemplazara la imagen agregada
            previamente.
          </small>
          <input
            ref={fileInputRef}
            type="file"
            className="file-input-xs sm:file-input bg-fontGrey w-full text-white"
            name="imagenFile"
            onChange={handleChangeForm}
            onBlur={validateOnBlur}
          />
          {errorImage?.image?.length ? (
            <small className="h-6 text-red-600 w-full flex self-start mb-1">
              {errorImage.image}
            </small>
          ) : (
            !image.name && (
              <small className="h-6 text-red-600 w-full flex self-start mb-1">
                * Campo requerido
              </small>
            )
          )}
        </div>
        <button
          type="submit"
          className="btn mt-1 2xl:mt-0 text-white hover:bg-grey hover:text-fontDark transition-all ease-in-out disabled:bg-header/80 disabled:text-fontLigth"
          disabled={isFormDisabled}
        >
          Añadir
        </button>
      </form>
    </div>
  );
};

export default SubCategoriesForm;