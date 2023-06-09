import React, { useRef, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";
import { postCategoryAction } from "../../../redux/categoriesActions";
import { useDispatch, useSelector } from "react-redux";
import ServerError from "../../../utils/ServerError";
import ServerSuccess from "../../../utils/ServerSuccess";
import {
  setErrorCategory,
  setSuccessCategory,
} from "../../../redux/categoriesSlice";

const CategoriesForm = () => {
  const formData = new FormData();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const { error, success, categories } = useSelector(
    (state) => state.categories
  );
  const categoriesNames = categories.map((item) => item.nombre);
  const token = localStorage.getItem("token");
  const [errorName, setErrorName] = useState({});
  const [errorImage, setErrorImage] = useState({});
  const [image, setImage] = useState({});
  const [form, setForm] = useState({
    nombre: "",
    imagen: [],
  });

  const clearReducer = () => {
    dispatch(setErrorCategory(""));
    dispatch(setSuccessCategory(""));
  };
  const clearForm = () => {
    setForm({
      nombre: "",
      imagen: [],
    });
    setImage({});
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Limpiar el valor del input
    }
    dispatch(setErrorCategory(""));
    dispatch(setSuccessCategory(""));
  };
  const validateName = (input) => {
    let error = {};
    if (categoriesNames.includes(input.nombre)) {
      error.nombre = "La Categoría ya existente, ingrese un nombre diferente.";
    }
    if (!input.nombre) {
      error.nombre = "El campo Nombre no puede estar vacío.";
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
    if (name === "nombre") {
      let errorFormValidation = validateName({ [name]: value });
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
    if (name === "nombre") {
      setForm({ nombre: value, imagen: [] });
      let errorFormValidation = validateName({ [name]: value });
      setErrorName(errorFormValidation);
    }
  };
  const handleSubmitForm = (e) => {
    e.preventDefault();
    async function post() {
      formData.append("data", JSON.stringify(form));
      formData.append("files", image);
      await dispatch(postCategoryAction(formData, token));
    }
    post();
    clearForm();
  };

  let isFormDisabled =
    !Object.values(form).join("").length ||
    !image ||
    Object.values(errorName).join("").length ||
    Object.values(errorImage).join("").length
      ? true
      : false;

  return (
    <div className="flex flex-col w-full justify-start items-center">
      <div
        className="w-full p-2 flex flex-col sm:flex-row sm:self-start justify-center items-center sm:justify-between sm:mt-0
        text-xl text-blue-400 ml-4 mt-4"
      >
        <Link
          to="/admin/categories"
          className="flex items-center "
          onClick={clearReducer}
        >
          <AiOutlineArrowLeft className="pr-1" fontSize={20} /> Volver
        </Link>
        <button
          className="btn mt-1 2xl:mt-0 text-white hover:bg-grey hover:text-fontDark transition-all ease-in-out self-center justify-end"
          onClick={clearForm}
        >
          Limpiar formulario
        </button>
      </div>
      <h2 className="pt-2 h-10 font-semibold text-fontDark underline text-xl md:text-2xl flex self-center sm:w-2/3">
        Crear categoría:{" "}
      </h2>
      <form
        className="form-control w-2/3 gap-4 p-4 text-fontDark text-lg flex flex-col justify-between items-start "
        onSubmit={handleSubmitForm}
      >
        <div className="flex flex-col w-40 sm:w-full">
          <label className="label pt-2 pb-0">
            <span>Categoría</span>
          </label>
          <input
            type="text"
            className="input bg-fontGrey"
            name="nombre"
            value={form.nombre}
            onChange={handleChangeForm}
            onBlur={validateOnBlur}
            placeholder="Nombre de la categoría"
          />
          {errorName?.nombre ? (
            <small className="h-6 text-red-600 w-full flex self-start mb-1">
              {errorName.nombre}
            </small>
          ) : null}
        </div>
        <div className="flex flex-col w-40 sm:w-full">
          <label className="label pt-2 pb-0">
            <span>Imagen</span>
          </label>
          <input
            ref={fileInputRef}
            type="file"
            className="file-input-xs sm:file-input bg-fontGrey w-full text-white"
            name="imagenFile"
            onChange={handleChangeForm}
            onBlur={validateOnBlur}
          />
          <small className="h-auto text-gray-500 w-full flex self-start mb-1">
            * Al agregar una nueva imagen, se reemplazara la imagen agregada
            previamente.
          </small>
          {errorImage?.image ? (
            <small className="h-6 text-red-600 w-full flex self-start mb-1">
              {errorImage.image}
            </small>
          ) : null}
        </div>
        <button
          type="submit"
          className="btn mt-1 2xl:mt-0 text-white hover:bg-grey hover:text-fontDark transition-all ease-in-out disabled:bg-header/80 disabled:text-fontLigth"
          disabled={isFormDisabled}
        >
          Añadir
        </button>
      </form>
      {error && <ServerError error={error} />}
      {success && <ServerSuccess success={success} />}
    </div>
  );
};

export default CategoriesForm;
