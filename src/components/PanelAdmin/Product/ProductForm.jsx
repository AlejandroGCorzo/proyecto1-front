import React, { useRef, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postProductAction } from "../../../redux/productActions";
import {
  setErrorProduct,
  setSuccessProduct,
} from "../../../redux/productSlice";
import ServerError from "../../../utils/ServerError";
import ServerSuccess from "../../../utils/ServerSuccess";

function validateImage(input) {
  let errorsImage = {};

  if (!input) {
    errorsImage.image = "Cargar mínimo una imagen al campo Imagen.";
  }

  return errorsImage;
}
function validateColor(input) {
  let errorsColor = {};

  if (!input) {
    errorsColor.color = "El campo Color no puede estar vacío.";
  }

  return errorsColor;
}
function validateSize(input) {
  let errorsSize = {};
  if (!input.talle && !input.cantidad) {
    errorsSize.talle = "El campo Talle no puede estar vacío.";
    errorsSize.cantidad = "El campo Cantidad no puede estar vacío.";
  }

  if (!input.talle) {
    errorsSize.talle = "El campo Talle no puede estar vacío.";
  }
  if (!input.cantidad) {
    errorsSize.cantidad = "El campo Cantidad no puede estar vacío.";
  }

  return errorsSize;
}
function validateProduct(input) {
  let errorsProduct = {};
  if (
    input.tipo === "Elige una categoría" &&
    !input.marca &&
    !input.descripcion &&
    !input.colores &&
    !input.talle &&
    !input.precio &&
    !input.codigo &&
    !input.genero &&
    !input.proveedor &&
    !input.disciplina
  ) {
    errorsProduct.tipo = "Seleccione una categoría.";
    errorsProduct.marca = "El campo Marca no puede estar vacío.";
    errorsProduct.descripcion = "El campo Descripción no puede estar vacío.";
    errorsProduct.colores = "Añadir al menos un color.";
    errorsProduct.talle = "Añadir al menos un Talle y una Cantidad.";
    errorsProduct.precio = "El campo Precio no puede estar vacío.";
    errorsProduct.codigo = "El campo Código no puede estar vacío.";
    errorsProduct.genero = "El campo Género no puede estar vacío.";
    errorsProduct.proveedor = "El campo Proveedor no puede estar vacío.";
    errorsProduct.disciplina = "El campo Disciplina no puede estar vacío.";
  }

  if (!input.tipo || input.tipo === "Elige un tipo de producto") {
    errorsProduct.tipo = "Selecciona un tipo de producto.";
  }
  if (!input.modelo) {
    errorsProduct.modelo = "El campo Modelo no puede estar vacío.";
  }
  /*  if (
    input.marca === "No existen marcas agregadas a la categoría seleccionada"
  ) {
    errorsProduct.marca =
      "Debe asociar una subcategoría a la categoría seleccionada.";
  } */
  if (!input.marca || input.marca === "Elige una marca") {
    errorsProduct.marca = "Selecciona una marca.";
  }
  if (!input.descripcion) {
    errorsProduct.descripcion = "El campo Descripción no puede estar vacío.";
  }

  if (input.precio && !Number(input.precio)) {
    errorsProduct.precio = "El campo Precio solo debe contener numeros.";
  }
  if (!input.precio) {
    errorsProduct.precio = "El campo Precio no puede estar vacío.";
  }
  if (!input.codigo) {
    errorsProduct.codigo = "El campo Código no puede estar vacío.";
  }
  if (!input.genero) {
    errorsProduct.genero = "El campo Género no puede estar vacío.";
  }
  if (input.proveedor !== input.codigo) {
    errorsProduct.proveedor = "El campo Proveedor debe ser igual al Código.";
  }
  if (!input.proveedor) {
    errorsProduct.proveedor = "El campo Proveedor no puede estar vacío.";
  }
  if (!input.disciplina) {
    errorsProduct.disciplina = "El campo Disciplina no puede estar vacío.";
  }

  return errorsProduct;
}
const ProductForm = () => {
  const formData = new FormData();
  const fileInputRef = useRef(null);
  const selectInputRefTipo = useRef(null);
  const selectInputRefMarca = useRef(null);
  const dispatch = useDispatch();
  const { error, success } = useSelector((state) => state.products);
  const { categories, loading } = useSelector((state) => state.categories);
  const categoriesNameAndId = categories.map((item) => ({
    nombre: item.nombre.toUpperCase(),
    id: item._id,
    subcategorias: item.subcategorias,
  }));

  const token = localStorage.getItem("token");
  const [currentSubcategories, setCurrentSubcategories] = useState([]);
  const [image, setImage] = useState([]);
  const [errorImage, setErrorImage] = useState({});
  const [color, setColor] = useState("");
  const [errorColor, setErrorColor] = useState({});
  const [size, setSize] = useState({ talle: "", cantidad: 0 });
  const [errorSize, setErrorSize] = useState({ talle: "", cantidad: "" });
  const [form, setForm] = useState({
    imagenes: [],
    tipo: "",
    modelo: "",
    marca: "",
    descripcion: "",
    colores: [],
    talle: [],
    precio: "",
    codigo: "",
    genero: "",
    proveedor: "",
    disciplina: "",
  });
  const [errorsForm, setErrorsForm] = useState({});

  const validateOnBlur = (e) => {
    const { value, name, files } = e.target;
    if (name === "color") {
      let errorColorValidation = validateColor(color);
      setErrorColor(errorColorValidation);
    } else if (name === "talle" || name === "cantidad") {
      let errorSizeValidation = validateSize(size);
      setErrorSize(errorSizeValidation);
    } else if (name === "image") {
      let validatedImage = validateImage(files[0]);
      setErrorImage(validatedImage);
    } else {
      let errorFormValidation = validateProduct(form);
      setErrorsForm(errorFormValidation);
    }
  };

  const clearReducer = () => {
    dispatch(setErrorProduct(""));
    dispatch(setSuccessProduct(""));
  };
  const clearForm = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Limpiar el valor del input
    }
    if (selectInputRefMarca.current) {
      selectInputRefMarca.current.value = "Selecciona un tipo de producto"; // Limpiar el valor del input
    }
    if (selectInputRefTipo.current) {
      selectInputRefTipo.current.value = "Elige un tipo de producto"; // Limpiar el valor del input
    }
    setColor("");
    setImage([]);
    setSize({ talle: "", cantidad: 0 });
    setForm({
      imagenes: [],
      tipo: "",
      modelo: "",
      marca: "",
      descripcion: "",
      colores: [],
      talle: [],
      precio: "",
      codigo: "",
      genero: "",
      proveedor: "",
      disciplina: "",
    });
    setErrorColor({});
    setErrorSize({});
    setErrorImage({});
    setErrorsForm({});
    dispatch(setErrorProduct(""));
    dispatch(setSuccessProduct(""));
  };

  const handleImageChange = (e) => {
    const { files, name } = e.target;
    let file = files[0];
    if (file) {
      if (image.length) {
        setImage((prev) => [...prev, file]);
      } else {
        setImage([file]);
      }
    }
    let validatedImage = validateImage(file);
    setErrorImage(validatedImage);
  };
  const handleImageSubmit = (e) => {
    e.preventDefault();
    for (let index = 0; index < image.length; index++) {
      formData.append("files", image[index]);
    }
  };
  const handleColorChange = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    setColor(value);
    let errorColorValidation = validateColor(color);
    setErrorColor(errorColorValidation);
    if (color) {
      setErrorColor({ color: "" });
    }
  };
  const handleColorSubmit = (e) => {
    e.preventDefault();

    if (!form.colores.length) {
      setForm((prev) => ({ ...prev, colores: [color] }));
    } else {
      setForm((prev) => ({ ...prev, colores: [...prev.colores, color] }));
    }
    setColor("");
  };

  const handleSizeChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setSize((prev) => ({ ...prev, [name]: value }));
    let errorSizeValidation = validateSize(size);
    setErrorSize(errorSizeValidation);
    if (size.talle && size.cantidad) {
      setErrorSize({ talle: "", cantidad: "" });
    }
  };

  const handleSizeSubmit = (e) => {
    e.preventDefault();
    if (!form.talle.length) {
      setForm((prev) => ({ ...prev, talle: [size] }));
    } else {
      setForm((prev) => ({ ...prev, talle: [...prev.talle, size] }));
    }
    setSize({ talle: "", cantidad: 0 });
  };
  const handleChangeForm = (e) => {
    const { name, value } = e.target;

    if (name === "tipo") {
      setCurrentSubcategories(
        categoriesNameAndId.find((item) => item.nombre === value).subcategorias
      );
    }

    setForm({
      ...form,
      [name]: value,
    });
    let errorObj = validateProduct({
      ...form,
      [name]: value,
    });
    setErrorsForm(errorObj);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    async function post() {
      formData.append("data", JSON.stringify(form));
      for (let index = 0; index < image.length; index++) {
        formData.append("files", image[index]);
      }

      await dispatch(postProductAction(formData, token));
    }
    post();
    clearForm();
  };

  let isColorDisabled =
    !color.length || Object.values(errorColor).join("").length ? true : false;
  let isImageDisabled =
    !image.length || Object.values(errorImage).join("").length ? true : false;

  let isSizeDisabled =
    !Object.values(size).every((value) => !!value) ||
    Object.values(errorSize).join("").length
      ? true
      : false;

  let isFormDisabled =
    !Object.values(form).join("").length ||
    Object.values(errorColor).join("").length ||
    Object.values(errorSize).join("").length ||
    Object.values(errorsForm).join("").length
      ? true
      : false;

  return (
    <div className="flex flex-col w-full justify-start items-center">
      <>
        <div
          className="w-full p-2 flex flex-col sm:flex-row sm:self-start justify-center items-center sm:justify-between sm:mt-0
        text-xl text-blue-400 ml-4 mt-4"
        >
          <Link
            to="/admin/products"
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
        <h2 className="pt-2 h-10 font-semibold text-fontDark underline text-2xl flex self-center sm:w-2/3">
          Crear producto:{" "}
        </h2>
        <form
          className="form-control w-2/3 gap-4 p-4 text-lg flex flex-col lg:flex-row justify-around items-start lg:items-end"
          onSubmit={handleImageSubmit}
        >
          <div className="flex flex-col w-40 sm:w-full">
            <label className="label pt-2 pb-0 text-fontDark ">
              <span>Imagen</span>
            </label>
            <input
              type="file"
              className="file-input-xs sm:file-input bg-fontGrey w-full text-white"
              name="image"
              onChange={handleImageChange}
              onBlur={validateOnBlur}
              placeholder="Imagen"
              ref={fileInputRef}
            />
            {errorImage?.image?.length ? (
              <small className="h-6 text-red-600 w-full flex self-start mb-1">
                {errorImage.image}
              </small>
            ) : null}
          </div>
          <button
            type="submit"
            className="btn mt-1 lg:mt-0  text-white hover:bg-grey hover:text-fontDark transition-all ease-in-out disabled:bg-header/80 disabled:text-fontLigth"
            disabled={isImageDisabled}
          >
            Añadir
          </button>
        </form>
        <form
          className="form-control w-2/3 gap-4 p-4 text-fontDark text-lg flex flex-col lg:flex-row justify-around items-start lg:items-end"
          onSubmit={handleColorSubmit}
        >
          <div className="flex flex-col w-40 sm:w-full">
            <label className="label pt-2 pb-0">
              <span>Color</span>
            </label>
            <input
              type="text"
              className="input bg-fontGrey w-full"
              name="color"
              value={color}
              onChange={handleColorChange}
              onBlur={validateOnBlur}
              placeholder="Color"
            />
            {errorColor?.color?.length ? (
              <small className="h-6 text-red-600 w-full flex self-start mb-1">
                {errorColor.color}
              </small>
            ) : null}
          </div>
          <button
            type="submit"
            className="btn mt-1 lg:mt-0  text-white hover:bg-grey hover:text-fontDark transition-all ease-in-out disabled:bg-header/80 disabled:text-fontLigth"
            disabled={isColorDisabled}
          >
            Añadir
          </button>
        </form>
        <form
          className="form-control w-2/3 gap-4 p-4 text-fontDark text-lg flex flex-col justify-between items-start 2xl:flex-row 2xl:items-end"
          onSubmit={handleSizeSubmit}
        >
          <div className="flex flex-col w-40 sm:w-1/2">
            <label className="label pt-2 pb-0">
              <span>Talle</span>
            </label>
            <input
              type="text"
              className="input bg-fontGrey"
              name="talle"
              value={size.talle}
              onChange={handleSizeChange}
              onBlur={validateOnBlur}
              placeholder="Talle"
            />
            {errorSize?.talle?.length ? (
              <small className="h-6 text-red-600 w-full flex self-start mb-1">
                {errorSize.talle}
              </small>
            ) : null}
          </div>
          <div className="flex flex-col w-40 sm:w-1/2">
            <label className="label pt-2 pb-0">
              <span>Cantidad</span>
            </label>
            <input
              type="number"
              className="input bg-fontGrey"
              name="cantidad"
              min={1}
              value={size.cantidad}
              onChange={handleSizeChange}
              onBlur={validateOnBlur}
              placeholder="Cantidad"
            />
            {errorSize?.cantidad?.length ? (
              <small className="h-6 text-red-600 w-full flex self-start mb-1">
                {errorSize.cantidad}
              </small>
            ) : null}
          </div>
          <button
            type="submit"
            className="btn mt-1 2xl:mt-0 text-white hover:bg-grey hover:text-fontDark transition-all ease-in-out disabled:bg-header/80 disabled:text-fontLigth"
            disabled={isSizeDisabled}
          >
            Añadir
          </button>
        </form>
        <form
          className="form-control w-2/3 gap-4 p-4 text-fontDark text-lg"
          onSubmit={handleFormSubmit}
        >
          <label className="label pt-2 pb-0">
            <span>Tipo de producto</span>
          </label>
          <select
            ref={selectInputRefTipo}
            className="input bg-fontGrey"
            placeholder="Tipo de producto"
            name="tipo"
            onChange={handleChangeForm}
            onBlur={validateOnBlur}
            defaultValue="Elige un tipo de producto"
          >
            <option disabled>Elige un tipo de producto</option>
            {categoriesNameAndId.map((item) => (
              <option key={item.id} value={item.nombre}>
                {item?.nombre
                  ?.slice(0, 1)
                  .concat(item.nombre.slice(1).toLowerCase())}
              </option>
            ))}
          </select>
          {errorsForm?.tipo?.length ? (
            <small className="h-6 text-red-600 w-full flex self-start mb-1">
              {errorsForm.tipo}
            </small>
          ) : null}
          <label className="label pt-2 pb-0">
            <span>Modelo</span>
          </label>
          <input
            type="text"
            className="input bg-fontGrey"
            placeholder="Modelo"
            name="modelo"
            value={form.modelo}
            onChange={handleChangeForm}
            onBlur={validateOnBlur}
          />
          {errorsForm?.modelo?.length ? (
            <small className="h-6 text-red-600 w-full flex self-start mb-1">
              {errorsForm.modelo}
            </small>
          ) : null}
          <label className="label pt-2 pb-0">
            <span>Marca</span>
          </label>
          <select
            ref={selectInputRefMarca}
            className="input bg-fontGrey"
            placeholder="Marca"
            name="marca"
            onChange={handleChangeForm}
            onBlur={validateOnBlur}
            defaultValue="Selecciona un tipo de producto"
          >
            {form.tipo.length ? (
              currentSubcategories.length ? (
                <>
                  <option disabled>Elige una marca</option>
                  {currentSubcategories.map((item) => (
                    <option key={item._id} value={item.nombre}>
                      {item.nombre
                        ?.slice(0, 1)
                        .toUpperCase()
                        .concat(item.nombre.slice(1).toLowerCase())}
                    </option>
                  ))}
                </>
              ) : (
                <option disabled>
                  No existen marcas agregadas a la categoría seleccionada.
                </option>
              )
            ) : (
              <option disabled>Selecciona un tipo de producto</option>
            )}
          </select>
          {errorsForm?.marca?.length ? (
            <small className="h-6 text-red-600 w-full flex self-start mb-1">
              {errorsForm.marca}
            </small>
          ) : null}
          <label className="label pt-2 pb-0">
            <span>Descripción</span>
          </label>
          <input
            type="text"
            className="textarea h-20 bg-fontGrey"
            name="descripcion"
            value={form.descripcion}
            onChange={handleChangeForm}
            onBlur={validateOnBlur}
            placeholder="Descripción"
          />
          {errorsForm?.descripcion?.length ? (
            <small className="h-6 text-red-600 w-full flex self-start mb-1">
              {errorsForm.descripcion}
            </small>
          ) : null}
          <label className="label pt-2 pb-0">
            <span>Precio</span>
          </label>
          <input
            type="text"
            className="input bg-fontGrey"
            name="precio"
            value={form.precio}
            onChange={handleChangeForm}
            onBlur={validateOnBlur}
            placeholder="Precio"
          />
          {errorsForm?.precio?.length ? (
            <small className="h-6 text-red-600 w-full flex self-start mb-1">
              {errorsForm.precio}
            </small>
          ) : null}
          <label className="label pt-2 pb-0">
            <span>Código</span>
          </label>
          <input
            type="text"
            className="input bg-fontGrey"
            name="codigo"
            value={form.codigo}
            onChange={handleChangeForm}
            onBlur={validateOnBlur}
            placeholder="Código"
          />
          {errorsForm?.codigo?.length ? (
            <small className="h-6 text-red-600 w-full flex self-start mb-1">
              {errorsForm.codigo}
            </small>
          ) : null}
          <label className="label pt-2 pb-0">
            <span>Género</span>
          </label>
          <input
            type="text"
            className="input bg-fontGrey"
            name="genero"
            value={form.genero}
            onChange={handleChangeForm}
            onBlur={validateOnBlur}
            placeholder="Género"
          />
          {errorsForm?.genero?.length ? (
            <small className="h-6 text-red-600 w-full flex self-start mb-1">
              {errorsForm.genero}
            </small>
          ) : null}
          <label className="label pt-2 pb-0">
            <span>Proveedor</span>
          </label>
          <input
            type="text"
            className="input bg-fontGrey"
            name="proveedor"
            value={form.proveedor}
            onChange={handleChangeForm}
            onBlur={validateOnBlur}
            placeholder="Proveedor"
          />
          {errorsForm?.proveedor?.length ? (
            <small className="h-6 text-red-600 w-full flex self-start mb-1">
              {errorsForm.proveedor}
            </small>
          ) : null}
          <label className="label pt-2 pb-0">
            <span>Disciplina</span>
          </label>
          <input
            type="text"
            className="input bg-fontGrey mb-4"
            name="disciplina"
            value={form.disciplina}
            onChange={handleChangeForm}
            onBlur={validateOnBlur}
            placeholder="Disciplina"
          />
          {errorsForm?.disciplina?.length ? (
            <small className="h-6 text-red-600 w-full flex self-start mb-1">
              {errorsForm.disciplina}
            </small>
          ) : null}
          <button
            type="submit"
            className="btn text-white hover:bg-grey hover:text-fontDark transition-all ease-in-out disabled:bg-header/80 disabled:text-fontLigth"
            disabled={isFormDisabled}
          >
            Crear producto
          </button>
        </form>
      </>
      {error && <ServerError error={error} />}
      {success && <ServerSuccess success={success} />}
    </div>
  );
};

export default ProductForm;
