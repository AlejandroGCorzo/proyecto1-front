import React, { useRef, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import {
  deleteImgCategoriesAction,
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

import { toBase64 } from "../../../utils/FileToBase64";
import { ConfirmationComponent } from "../../../utils/DeleteSteps";
import Loading from "../../../utils/Loading";

const CategoriesForm = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const selectInputRef = useRef(null);
  const { error, success, categories, loading } = useSelector(
    (state) => state.categories
  );
  const categoryToUpdate = categories.find((item) => item._id === params.id);
  const categoriesNames = categories.map((item) => item.nombre.toUpperCase());
  const modalRef = useRef(null);
  const token = localStorage.getItem("token");
  const [errorName, setErrorName] = useState({});
  const [errorImage, setErrorImage] = useState({});
  const [image, setImage] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    imagen: [],
  });
  const [formUpdate, setFormUpdate] = useState({});
  const [onDelete, setOnDelete] = useState(null);
  const [itemToDelete, setItemToDelete] = useState({ nombre: "", id: "" });
  const [section, setSection] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const toggleModal = (e) => {
    modalRef.current.classList.toggle("modal-open");
    document.activeElement.blur();
    setOnDelete(!onDelete);
    if (confirmed) {
      setConfirmed(false);
    }
  };

  const clearReducer = () => {
    dispatch(setErrorCategory(""));
    dispatch(setSuccessCategory(""));
  };
  const clearForm = () => {
    setForm({
      nombre: "",
      imagen: [],
    });
    setImage([]);
    if (Object.values(formUpdate).length) {
      setFormUpdate({});
    }
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
    if (
      categoriesNames?.length &&
      categoriesNames?.includes(input.nombre?.toUpperCase())
    ) {
      error.nombre = "La Categoría ya existente, ingrese un nombre diferente.";
    }
    if (!input.nombre && !categoryToUpdate?.nombre?.length) {
      error.nombre = "El campo Nombre no puede estar vacío.";
    }
    return error;
  };

  const validateImage = (input) => {
    let error = {};
    if (categoryToUpdate?.imagen?.length) {
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
      if (categoryToUpdate?.imagen?.length) {
        setItemToDelete({
          nombre: "imagen",
          idCategory: categoryToUpdate._id,
          id: categoryToUpdate.imagen[0],
        });
        setSection("inputCategoria");
        toggleModal();
      } else {
        let errorFormValidation = validateImage(files[0]);
        setErrorImage(errorFormValidation);
      }
    }
  };

  const handleImageRemove = (index) => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Limpiar el valor del input
    }
    setImage((prevImages) => prevImages.filter((img, i) => i !== index));
    setForm((prev) => ({ ...prev, imagen: [] }));
    return;
  };
  const handleChangeForm = async (e) => {
    e.preventDefault();
    const { name, value, files } = e.target;
    if (files?.length) {
      let eventualState = [];
      const previewFiles = [];
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();

        reader.onload = () => {
          if (typeof reader.result === "string") {
            previewFiles.push(reader.result);
            if (previewFiles.length === files.length) {
              setImage(previewFiles);
            }
          }
        };
        toBase64(files[i])
          .then((res) => eventualState.push(res))
          .catch((e) => console.log(e));
        reader.readAsDataURL(files[i]);
      }
      if (!params?.id?.length) {
        let validatedImage = validateImage(files);
        setErrorImage(validatedImage);
        setForm((prev) => ({ ...prev, imagen: eventualState }));
      } else {
        let validatedImage = validateImage(files);
        setErrorImage(validatedImage);
        setFormUpdate((prev) => ({ ...prev, imagen: eventualState }));
      }
    }

    if (name === "nombre") {
      if (!params?.id?.length) {
        setForm((prev) => ({ ...prev, nombre: value }));
      } else {
        setFormUpdate((prev) => ({ ...prev, nombre: value }));
      }
      let errorFormValidation = validateName({ [name]: value });
      setErrorName(errorFormValidation);
    }
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    async function post() {
      if (categoryToUpdate?._id?.length) {
        await dispatch(
          patchCategoryAction(formUpdate, token, categoryToUpdate._id)
        );
      } else {
        await dispatch(postCategoryAction(form, token));
      }
    }

    post();
    clearForm();
  };

  let isFormDisabled =
    !form.nombre.length ||
    !form.imagen.length ||
    !image.length ||
    Object.values(errorName).join("").length ||
    Object.values(errorImage).join("").length
      ? true
      : false;
  let isFormUpdateDisabled =
    !Object.values(formUpdate).join("").length ||
    (!categoryToUpdate?.imagen?.length && !formUpdate?.imagen?.length) ||
    Object.values(errorName).join("").length ||
    Object.values(errorImage).join("").length
      ? true
      : false;

  return (
    <>
      {loading ? (
        <div className="h-96 flex justify-center items-center">
          <Loading />
        </div>
      ) : (
        <div className="flex flex-col w-full justify-start items-center">
          <div
            className="w-full py-2 px-8 flex flex-col sm:flex-row sm:self-start justify-center items-center sm:justify-between 
        text-xl text-blue-400 ml-4 my-4"
          >
            <Link
              to="/admin/categories"
              className="flex items-center "
              onClick={clearReducer}
            >
              <AiOutlineArrowLeft className="pr-1" fontSize={20} /> Volver
            </Link>
            <button
              className="btn mt-1 2xl:mt-0 text-white hover:bg-white hover:text-header transition-all ease-in-out self-center justify-end"
              onClick={clearForm}
            >
              Limpiar formulario
            </button>
          </div>
          {error.length > 0 && <ServerError error={error} />}
          {success.length > 0 && <ServerSuccess success={success} />}
          <h2 className="pt-2 h-10 font-semibold text-header underline text-xl md:text-2xl flex self-center sm:w-2/3">
            {categoryToUpdate?._id?.length
              ? "Editar categoría:"
              : "Crear categoría:"}
          </h2>
          <form
            className="form-control w-2/3 gap-4 p-4 text-header text-lg flex flex-col justify-between items-start "
            onSubmit={handleSubmitForm}
          >
            <div className="flex flex-col w-40 sm:w-full">
              <label className="label pt-2 pb-0">
                <span>Categoría</span>
              </label>
              <input
                type="text"
                className="input bg-white"
                name="nombre"
                value={params?.id?.length ? formUpdate.nombre : form.nombre}
                onChange={handleChangeForm}
                onFocus={validateOnBlur}
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
                className="file-input-xs sm:file-input bg-white w-full text-white"
                name="imagenFile"
                onChange={handleChangeForm}
                onFocus={validateOnBlur}
              />
              {errorImage?.image?.length ? (
                <small className="h-6 text-red-600 w-full flex self-start mb-1">
                  {errorImage.image}
                </small>
              ) : (
                !image.length && (
                  <small className="h-6 text-red-600 w-full flex self-start mb-1">
                    * Campo requerido
                  </small>
                )
              )}
            </div>
            <div className="flex flex-wrap justify-center items-center mt-4 gap-2 w-full">
              {image?.length > 0 &&
                image.map((img, index) => (
                  <div
                    key={index}
                    className="flex flex-col-reverse w-1/4 h-72 border rounded justify-end items-end p-2 bg-white"
                  >
                    <img
                      src={img}
                      alt={`preview ${index}`}
                      className="w-full h-full object-contain rounded-md  "
                    />
                    <button
                      className="border rounded-full hover:bg-nav hover:text-grey bg-white text-header text-xl relative flex px-2 transition-all"
                      type="button"
                      onClick={() => handleImageRemove(index)}
                    >
                      X
                    </button>
                  </div>
                ))}
              {categoryToUpdate?.imagen?.length > 0 &&
                image.length === 0 &&
                categoryToUpdate.imagen.map((img, index) => (
                  <div
                    key={img}
                    className="flex flex-col-reverse w-1/4 h-72 border rounded justify-end items-end p-2 bg-white"
                  >
                    <img
                      src={img}
                      alt={`edit ${index}`}
                      className="w-full h-full object-contain rounded-md  "
                    />
                    <button
                      className="border rounded-full hover:bg-nav hover:text-grey bg-white text-header text-xl relative flex px-2 transition-all"
                      type="button"
                      onClick={() => {
                        setItemToDelete({
                          nombre: "imagen",
                          idCategory: categoryToUpdate._id,
                          id: img,
                        });
                        setSection("formCategoria");
                        toggleModal();
                      }}
                    >
                      X
                    </button>
                  </div>
                ))}
            </div>
            <button
              type="submit"
              className="btn mt-1 2xl:mt-0 text-white hover:bg-white hover:text-header transition-all ease-in-out disabled:bg-header/80 disabled:text-fontGrey"
              disabled={
                params?.id?.length ? isFormUpdateDisabled : isFormDisabled
              }
            >
              Añadir
            </button>
          </form>
          {!params?.id?.length && <SubCategoriesForm />}
          <dialog ref={modalRef} className="modal bg-white/40">
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
    </>
  );
};

export default CategoriesForm;
