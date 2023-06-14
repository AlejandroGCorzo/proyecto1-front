import React, { useRef, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import {
  patchCategoryAction,
  postCategoryAction,
} from "../../../redux/categoriesActions";
import { useDispatch, useSelector } from "react-redux";
import ServerError from "../../../utils/ServerError";
import ServerSuccess from "../../../utils/ServerSuccess";
import {
  setErrorCategory,
  setSuccessCategory,
} from "../../../redux/categoriesSlice";
import SubCategoriesForm from "../SubCategory/SubCategoriesForm";

const CategoriesForm = () => {
  const params = useParams();
  const formData = new FormData();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const selectInputRef = useRef(null);
  const { error, success, categories, subcategorias } = useSelector(
    (state) => state.categories
  );
  const categoryToUpdate = categories.find((item) => item._id === params.id);
  const categoriesNames = categories.map((item) => item.nombre);
  const subcategoriesNames =
    categoryToUpdate?.subcategorias?.length > 0
      ? subcategorias.filter((subcategoria) => {
          return !categoryToUpdate.subcategorias.some(
            (elem) => elem._id === subcategoria._id
          );
        })
      : subcategorias.map((item) => ({
          nombre: item.nombre,
          _id: item._id,
        }));

  const token = localStorage.getItem("token");
  const [errorName, setErrorName] = useState({});
  const [errorImage, setErrorImage] = useState({});
  const [image, setImage] = useState({});
  const [form, setForm] = useState({
    nombre: categoryToUpdate?.nombre?.length ? categoryToUpdate.nombre : "",
    imagen: categoryToUpdate?.imagen?.length ? categoryToUpdate.imagen : [],
    subcategorias: categoryToUpdate?.subcategorias?.length
      ? categoryToUpdate.subcategorias
      : [],
  });

  const clearReducer = () => {
    dispatch(setErrorCategory(""));
    dispatch(setSuccessCategory(""));
  };
  const clearForm = () => {
    setForm({
      nombre: "",
      imagen: [],
      subcategorias: [],
    });
    setImage({});
    setErrorName({});
    setErrorImage({});
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Limpiar el valor del input
    }
    if (selectInputRef.current) {
      selectInputRef.current.value = "Elige una Subcategoría"; // Limpiar el valor del input
    }
    dispatch(setErrorCategory(""));
    dispatch(setSuccessCategory(""));
  };
  const validateName = (input) => {
    let error = {};
    if (categoriesNames.includes(input.nombre) && !categoryToUpdate?.nombre) {
      error.nombre = "La Categoría ya existente, ingrese un nombre diferente.";
    }
    if (!input.nombre) {
      error.nombre = "El campo Nombre no puede estar vacío.";
    }
    return error;
  };

  const validateImage = (input) => {
    let error = {};
    if (categoryToUpdate?.nombre?.length) {
      if (!input && !categoryToUpdate?.imagen?.length) {
        error.image = "Debe ingresar una imagen";
      }
    } else if (!input) {
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
      if (name === "imagenFile" && file?.name) {
        setImage(file);
        let errorFormValidation = validateImage(file);
        setErrorImage(errorFormValidation);
      }
    }
    if (name === "nombre" && !categoryToUpdate?.imagen?.length) {
      setForm((prev) => ({ ...prev, nombre: value }));
      let errorFormValidation = validateName({ [name]: value });
      setErrorName(errorFormValidation);
    } else if (name === "nombre" && categoryToUpdate?.imagen?.length) {
      setForm((prev) => ({ ...prev, nombre: value }));
      let errorFormValidation = validateName({ [name]: value });
      setErrorName(errorFormValidation);
    }
    if (name === "subcategoria") {
      if (form.subcategorias.length) {
        setForm((prev) => ({
          ...prev,
          subcategorias: [...prev.subcategorias, value],
        }));
      } else {
        setForm((prev) => ({ ...prev, subcategorias: [value] }));
      }
    }
  };
  const handleSubmitForm = (e) => {
    e.preventDefault();
    async function post() {
      if (image?.name?.length) {
        formData.append("files", image);
      }
      formData.append("data", JSON.stringify(form));
      if (categoryToUpdate?._id?.length) {
        await dispatch(
          patchCategoryAction(formData, token, categoryToUpdate._id)
        );
      } else {
        await dispatch(postCategoryAction(formData, token));
      }
    }
    post();
    clearForm();
  };

  let isFormDisabled =
    !Object.values(form).join("").length ||
    !image?.name?.length ||
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
      {error.length > 0 && <ServerError error={error} />}
      {success.length > 0 && <ServerSuccess success={success} />}
      <h2 className="pt-2 h-10 font-semibold text-fontDark underline text-xl md:text-2xl flex self-center sm:w-2/3">
        {categoryToUpdate?._id?.length
          ? "Editar categoría:"
          : "Crear categoría:"}
      </h2>
      <form
        className="form-control w-2/3 gap-4 p-4 text-fontDark text-lg flex flex-col justify-between items-start "
        onSubmit={handleSubmitForm}
      >
        <div className="flex flex-col w-40 sm:w-full ">
          <label className="label">
            <span>Subcategorías</span>
          </label>
          <small className="h-auto text-gray-500 w-full flex self-start mb-1">
            * Al seleccionar una subcategoría, la misma se guardara dentro de la
            categoría creada.
          </small>
          <select
            className="select select-bordered bg-fontGrey"
            name="subcategoria"
            ref={selectInputRef}
            onChange={handleChangeForm}
            onBlur={validateOnBlur}
            defaultValue="Elige una Subcategoría"
          >
            <option disabled>Elige una Subcategoría</option>
            {subcategoriesNames.map((item) => (
              <option key={item._id} value={item.nombre}>
                {item?.nombre
                  ?.slice(0, 1)
                  .toUpperCase()
                  .concat(item.nombre.slice(1))}
              </option>
            ))}
          </select>{" "}
        </div>
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
          {errorName?.nombre?.length ? (
            <small className="h-6 text-red-600 w-full flex self-start mb-1">
              {errorName.nombre}
            </small>
          ) : (
            form.nombre.length === 0 && (
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
      <SubCategoriesForm />
    </div>
  );
};

export default CategoriesForm;
