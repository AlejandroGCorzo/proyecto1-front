import React, { useRef, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteImgProductsAction,
  patchProductAction,
  postProductAction,
} from "../../../redux/productActions";
import {
  setErrorProduct,
  setSuccessProduct,
} from "../../../redux/productSlice";
import ServerError from "../../../utils/ServerError";
import ServerSuccess from "../../../utils/ServerSuccess";
import { MdOutlineClose } from "react-icons/md";
import { toBase64 } from "../../../utils/FileToBase64";
import { ConfirmationComponent } from "../../../utils/DeleteSteps";
import Loading from "../../../utils/Loading";

function validateImage(input) {
  let errorsImage = {};

  if (!input) {
    errorsImage.image = "Cargar mínimo una imagen al campo Imagen.";
  }

  return errorsImage;
}
function validateColor(input, form = null) {
  let errorsColor = {};

  if (form?.colores.includes(input.toUpperCase().trim())) {
    errorsColor.color = "El Color ya existe, ingrese un valor diferente.";
  }

  if (!input) {
    errorsColor.color = "El campo Color no puede estar vacío.";
  }

  return errorsColor;
}
function validateSize(input, form = null) {
  let errorsSize = {};
  if (!input.talle && !input.cantidad) {
    errorsSize.talle = "El campo Talle no puede estar vacío.";
    errorsSize.cantidad = "El campo Cantidad no puede estar vacío.";
  }

  if (form && form.talle.map((item) => item.talle).includes(input.talle)) {
    errorsSize.talle = "El Talle ya existe, ingrese un valor diferente.";
  }
  if (!input.talle) {
    errorsSize.talle = "El campo Talle no puede estar vacío.";
  }
  if (!input.cantidad) {
    errorsSize.cantidad = "El campo Cantidad no puede estar vacío.";
  }

  return errorsSize;
}
function validateProduct(input, products) {
  let errorsProduct = {};
  if (
    input.tipo === "Elige una categoría" &&
    !input.marca &&
    !input.descripcion &&
    !input.colores &&
    !input.talle &&
    !input.modelo &&
    !input.precio &&
    !input.codigo &&
    !input.genero &&
    !input.proveedor &&
    !input.disciplina
  ) {
    errorsProduct.tipo = "Seleccione una categoría.";
    errorsProduct.marca = "Seleccione una subcategoría.";
    errorsProduct.descripcion = "El campo Descripción no puede estar vacío.";
    errorsProduct.colores = "Añadir al menos un color.";
    errorsProduct.talle = "Añadir al menos un Talle y una Cantidad.";
    errorsProduct.modelo = "El campo Modelo no puede estar vacío.";
    errorsProduct.precio = "El campo Precio no puede estar vacío.";
    errorsProduct.codigo = "El campo Código no puede estar vacío.";
    errorsProduct.genero = "El campo Género no puede estar vacío.";
    errorsProduct.proveedor = "El campo Proveedor no puede estar vacío.";
    errorsProduct.disciplina = "El campo Disciplina no puede estar vacío.";
  }

  if (!input.tipo || input.tipo === "Elige un tipo de producto") {
    errorsProduct.tipo = "Seleccione un tipo de producto.";
  }
  if (products.map((item) => item.modelo).includes(input.modelo)) {
    errorsProduct.modelo = "El Modelo ya existe, ingrese un valor diferente.";
  }
  if (!input.modelo) {
    errorsProduct.modelo = "El campo Modelo no puede estar vacío.";
  }

  if (!input.marca.length || input.marca === "Elige una marca") {
    errorsProduct.marca = "Seleccione una marca.";
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

function validateDiscount(input) {
  let error = {};
  if (input && input > 100) {
    error.descuento = "El Descuento no puede ser mayor al 100%";
  }
  return error;
}

const ProductForm = () => {
  const params = useParams();
  const fileInputRef = useRef(null);
  const selectInputRefTipo = useRef(null);
  const selectInputRefMarca = useRef(null);
  const modalProductRef = useRef(null);
  const dispatch = useDispatch();
  const { error, success, products, loading } = useSelector(
    (state) => state.products
  );
  const { categories } = useSelector((state) => state.categories);
  const categoriesNameAndId = categories.map((item) => ({
    nombre: item.nombre,
    id: item._id,
    subcategorias: item.subcategorias,
  }));
  const productToUpdate = products.find((item) => item._id === params.id);
  const token = localStorage.getItem("token");
  const [onDelete, setOnDelete] = useState(null);
  const [itemToDelete, setItemToDelete] = useState({ idProduct: "", id: "" });
  const [section, setSection] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [currentSubcategories, setCurrentSubcategories] = useState([]);
  const [image, setImage] = useState([]);
  const [errorImage, setErrorImage] = useState({});
  const [color, setColor] = useState("");
  const [errorColor, setErrorColor] = useState({});
  const [size, setSize] = useState({ talle: "Único", cantidad: "" });
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
    isActive: true,
    destacado: false,
    descuento: "",
  });

  const [formUpdate, setFormUpdate] = useState({
    talle: productToUpdate?.talle?.length
      ? productToUpdate.talle.map((item) => ({
          talle: item.talle,
          cantidad: Number(item.cantidad),
        }))
      : [],
    colores: productToUpdate?.colores?.length ? productToUpdate.colores : [],
    descuento: productToUpdate?.descuento > 0 ? productToUpdate.descuento : "",
    isActive: true,
    destacado: false,
  });
  const [errorsForm, setErrorsForm] = useState({});

  const toggleModal = (e) => {
    modalProductRef.current.classList.toggle("modal-open");
    document.activeElement.blur();
    setOnDelete(!onDelete);
    if (confirmed) {
      setConfirmed(false);
    }
  };

  const validateOnBlur = (e) => {
    const { value, name, files } = e.target;
    if (!params?.id?.length) {
      if (name === "color") {
        let errorColorValidation = validateColor(value, form);
        setErrorColor(errorColorValidation);
      } else if (name === "talle" || name === "cantidad") {
        let errorSizeValidation = validateSize({ ...size, [name]: value });
        setErrorSize(errorSizeValidation);
      } else if (name === "image") {
        let validatedImage = validateImage(files[0]);
        setErrorImage(validatedImage);
      } else {
        let errorFormValidation = validateProduct(
          { ...form, [name]: value },
          products
        );
        setErrorsForm((prev) => ({ ...prev, ...errorFormValidation }));
      }
    }
    if (name === "talle" || name === "cantidad") {
      let errorSizeValidation = validateSize({ ...size, [name]: value });
      setErrorSize(errorSizeValidation);
    }
    if (name === "color") {
      let errorColorValidation = validateColor(value, formUpdate);
      setErrorColor(errorColorValidation);
    }
    return;
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
      selectInputRefMarca.current.value = "Seleccione un tipo de producto"; // Limpiar el valor del input
    }
    if (selectInputRefTipo.current) {
      selectInputRefTipo.current.value = "Elige un tipo de producto"; // Limpiar el valor del input
    }
    setColor("");
    setImage([]);
    setSize({ talle: "Único", cantidad: "" });
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
      isActive: true,
      destacado: false,
      descuento: "",
    });
    if (params?.id?.length) {
      setFormUpdate({ descuento: "", isActive: true, destacado: false });
    }
    setErrorColor({});
    setErrorSize({});
    setErrorImage({});
    setErrorsForm({});
    dispatch(setErrorProduct(""));
    dispatch(setSuccessProduct(""));
  };

  const handleImageChange = async (e) => {
    const { files, name } = e.target;

    let eventualState = [];
    const previewFiles = [];

    if (!files.length) return;
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();

      reader.onload = () => {
        if (typeof reader.result === "string") {
          previewFiles.push(reader.result);

          setImage((prev) => [...prev, reader.result]);
        }
      };
      try {
        const res = await toBase64(files[i]);
        eventualState = [...eventualState, res];
      } catch (e) {
        console.log(e);
      }
      reader.readAsDataURL(files[i]);
    }
    if (!params?.id?.length) {
      let validatedImage = validateImage(files);
      setErrorImage(validatedImage);
      if (!form.imagenes.length) {
        setForm((prev) => ({ ...prev, imagenes: eventualState }));
      } else {
        setForm((prev) => ({
          ...prev,
          imagenes: [...prev.imagenes, ...eventualState],
        }));
      }
    } else {
      if (!formUpdate?.imagenes?.length) {
        setFormUpdate((prev) => ({ ...prev, imagenes: eventualState }));
      } else {
        setFormUpdate((prev) => ({
          ...prev,
          imagenes: [...prev.imagenes, ...eventualState],
        }));
      }
    }
  };

  const handleImageRemove = (index) => {
    setImage((prevImages) => prevImages.filter((img, i) => i !== index));
    return;
  };

  const handleColorChange = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    setColor(value);
    if (!productToUpdate?.colores?.length) {
      let errorColorValidation = validateColor(value, form);
      setErrorColor(errorColorValidation);
    } else {
      let errorColorValidation = validateColor(value, formUpdate);

      setErrorColor(errorColorValidation);
    }
  };
  const handleColorSubmit = (e) => {
    e.preventDefault();

    if (!params?.id?.length) {
      if (!form.colores.length) {
        setForm((prev) => ({ ...prev, colores: [color.toUpperCase()] }));
      } else {
        setForm((prev) => ({
          ...prev,
          colores: [...prev.colores, color.toUpperCase()],
        }));
      }
    } else {
      if (!formUpdate?.colores?.length) {
        setFormUpdate((prev) => ({ ...prev, colores: [color.toUpperCase()] }));
      } else {
        setFormUpdate((prev) => ({
          ...prev,
          colores: [...prev.colores, color.toUpperCase()],
        }));
      }
    }
    setColor("");
  };

  const handleSizeChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (name === "cantidad") {
      setSize((prev) => ({ ...prev, cantidad: Number(value) }));
    }
    if (name === "talle") {
      setSize((prev) => ({ ...prev, talle: value }));
    }
    let currentForm = params?.id?.length ? formUpdate : form;
    let errorSizeValidation = validateSize(
      { ...size, [name]: value },
      currentForm
    );
    setErrorSize(errorSizeValidation);

    if (size.talle && size.cantidad) {
      setErrorSize({ talle: "", cantidad: "" });
    }
  };

  const handleSizeEdition = (e) => {
    e.preventDefault();
    const arr = e.target.value.split(",");
    const obj = arr.reduce((acc, item) => {
      const [key, value] = item.split(":");
      acc[key.trim()] = value.trim();
      return acc;
    }, {});
    let filteredSize;

    if (!params?.id?.length) {
      filteredSize = form.talle.filter((item) => item.talle !== obj.talle);
      setForm((prev) => ({ ...prev, talle: filteredSize }));
    } else if (formUpdate?.talle?.length) {
      filteredSize = formUpdate.talle.filter(
        (item) => item.talle !== obj.talle
      );
      setFormUpdate((prev) => ({ ...prev, talle: filteredSize }));
    }
  };

  const handleSizeSubmit = (e) => {
    e.preventDefault();

    if (!params?.id?.length) {
      if (!form.talle.length) {
        setForm((prev) => ({ ...prev, talle: [size] }));
      } else {
        setForm((prev) => ({ ...prev, talle: [...prev.talle, size] }));
      }
    } else {
      if (!formUpdate?.talle?.length) {
        setFormUpdate((prev) => ({ ...prev, talle: [size] }));
      } else {
        setFormUpdate((prev) => ({ ...prev, talle: [...prev.talle, size] }));
      }
    }
    setSize({ talle: "", cantidad: "" });
  };
  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    if (name === "tipo") {
      setCurrentSubcategories(
        categoriesNameAndId.find((category) => category.id === value)
      );
      if (currentSubcategories?.subcategorias?.length === 1) {
        if (params?.id?.length) {
          setFormUpdate((prev) => ({
            ...prev,
            marca: currentSubcategories.subcategorias[0]._id,
          }));
        } else {
          setForm((prev) => ({
            ...prev,
            marca: currentSubcategories.subcategorias[0]._id,
          }));
        }
      }
    }

    if (params?.id?.length) {
      if (name === "destacado") {
        setFormUpdate((prev) => ({ ...prev, [name]: !formUpdate.destacado }));
      } else if (name === "isActive") {
        setFormUpdate((prev) => ({ ...prev, [name]: !formUpdate.isActive }));
      } else if (name === "descuento" && value) {
        setFormUpdate((prev) => ({ ...prev, [name]: Number(value) }));
        if (value > 100) {
          let errorObj = validateDiscount(value);
          setErrorsForm((prev) => ({ ...prev, ...errorObj }));
        } else {
          setErrorsForm((prev) => ({ ...prev, descuento: "" }));
        }
      } else {
        setFormUpdate((prev) => ({ ...prev, [name]: value }));
      }
    } else {
      if (name === "destacado") {
        setForm((prev) => ({ ...prev, [name]: !form.destacado }));
      } else if (name === "isActive") {
        setForm((prev) => ({ ...prev, [name]: !form.isActive }));
      } else if (name === "descuento" && value) {
        setForm((prev) => ({ ...prev, [name]: Number(value) }));
        if (value > 100) {
          let errorObj = validateDiscount(value);
          setErrorsForm((prev) => ({ ...prev, ...errorObj }));
        } else {
          setErrorsForm((prev) => ({ ...prev, descuento: "" }));
        }
      } else {
        setForm((prev) => ({
          ...prev,
          [name]: value,
        }));
      }

      let errorObj = validateProduct({ ...form, [name]: value }, products);
      if (errorObj?.descuento?.length) {
        setErrorsForm((prev) => ({ ...prev, ...errorObj }));
      }
      setErrorsForm(errorObj);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let formToSubmit = productToUpdate?._id?.length
      ? formUpdate?.precio?.length
        ? {
            ...formUpdate,
            precio: Number(formUpdate.precio),
            descuento: Number(formUpdate.descuento),
          }
        : { ...formUpdate, descuento: Number(formUpdate.descuento) }
      : {
          ...form,
          precio: Number(form.precio),
          descuento: Number(form.descuento),
        };
    async function post() {
      await dispatch(postProductAction(formToSubmit, token));
    }

    async function patch() {
      await dispatch(
        patchProductAction(formToSubmit, token, productToUpdate._id)
      );
    }
    if (productToUpdate?._id?.length) {
      patch();
    } else {
      post();
    }
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
  let isFormUpdateDisabled =
    !Object.values(formUpdate).join("").length ||
    Object.values(errorColor).join("").length ||
    Object.values(errorSize).join("").length ||
    Object.values(errorsForm).join("").length
      ? true
      : false;

  return (
    <>
      {loading ? (
        <div className="h-96 flex justify-center items-center">
          <Loading />
        </div>
      ) : (
        <div className="flex flex-col w-full justify-start items-center mt-4">
          {error && <ServerError error={error} />}
          {success && <ServerSuccess success={success} />}
          <>
            <div
              className="w-full py-2 px-8 flex flex-col sm:flex-row sm:self-start justify-center items-center sm:justify-between sm:mt-0
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
              {productToUpdate?._id?.length
                ? "Editar producto:"
                : "Crear producto:"}
            </h2>

            <form
              className="form-control w-2/3 gap-4 p-4 text-fontDark text-lg flex flex-col lg:flex-row justify-around items-start lg:items-end"
              onSubmit={handleColorSubmit}
            >
              <div className="flex flex-col w-40 sm:w-full">
                <label className="label pt-2 pb-0">
                  <span>Color</span>
                </label>
                <input
                  autoComplete="off"
                  type="text"
                  className="input bg-fontGrey w-full"
                  name="color"
                  value={color}
                  onChange={handleColorChange}
                  onFocus={validateOnBlur}
                  placeholder="Color"
                />
                {errorColor?.color?.length > 0 && (
                  <small className="h-6 text-red-600 w-full flex self-start mb-1">
                    {errorColor.color}
                  </small>
                )}
              </div>
              <button
                type="submit"
                className="btn mt-1 lg:mt-0  text-white hover:bg-grey hover:text-fontDark transition-all ease-in-out disabled:bg-header/80 disabled:text-fontLigth"
                disabled={isColorDisabled}
              >
                Añadir
              </button>
            </form>

            <div className="flex flex-col w-1/3 justify-center items-center">
              {form?.colores?.length > 0 &&
                form.colores.map((item, index) => (
                  <div
                    className="w-2/3 flex justify-center items-center border rounded p-2"
                    key={index + "talle"}
                  >
                    <div className="w-full flex items-center justify-around text-lg text-fontDark">
                      {" "}
                      <span>Color: {item}</span>
                    </div>
                    <button
                      className="btn btn-circle hover:bg-grey hover:text-fontDark text-xl"
                      onClick={() =>
                        setForm((prev) => ({
                          ...prev,
                          colores: form.colores.filter(
                            (color) => color !== item
                          ),
                        }))
                      }
                    >
                      x
                    </button>
                  </div>
                ))}
              {formUpdate?.colores?.length > 0 &&
                formUpdate.colores.map((item, index) => (
                  <div
                    className="w-2/3 flex justify-between items-center border rounded p-2"
                    key={index + "talle"}
                  >
                    <div className="w-2/3 flex items-center justify-between px-4 text-lg text-fontDark">
                      {" "}
                      <span>Color: {item}</span>
                    </div>
                    <button
                      className="btn btn-circle hover:bg-grey hover:text-fontDark text-xl"
                      onClick={() =>
                        setFormUpdate((prev) => ({
                          ...prev,
                          colores: formUpdate.colores.filter(
                            (color) => color !== item
                          ),
                        }))
                      }
                    >
                      x
                    </button>
                  </div>
                ))}
            </div>

            <form
              className="form-control w-2/3 gap-4 p-4 text-fontDark text-lg flex flex-col justify-between items-start 2xl:flex-row 2xl:items-end"
              onSubmit={handleSizeSubmit}
            >
              <div className="flex flex-col w-40 sm:w-full lg:w-1/2">
                <label className="label pt-2 pb-0">
                  <span>Talle</span>
                </label>
                <input
                  autoComplete="off"
                  type="text"
                  className="input bg-fontGrey"
                  name="talle"
                  value={size.talle}
                  onChange={handleSizeChange}
                  onFocus={validateOnBlur}
                  placeholder="Talle"
                />
                {errorSize?.talle?.length > 0 ? (
                  <small className="h-6 text-red-600 w-full flex self-start mb-1">
                    {errorSize.talle}
                  </small>
                ) : (
                  <small className="h-auto text-gray-500 w-full flex self-start ">
                    * Si no se ingresa Talle el valor del mismo será Talle:
                    único.
                  </small>
                )}
              </div>
              <div
                className={`flex flex-col w-40 sm:w-full lg:w-1/2 ${
                  errorSize.cantidad?.length > 0 ? "pb-0" : "2xl:pb-7"
                }`}
              >
                <label className="label pt-2 pb-0">
                  <span>Cantidad</span>
                </label>
                <input
                  autoComplete="off"
                  type="text"
                  className="input bg-fontGrey"
                  name="cantidad"
                  value={size.cantidad}
                  onChange={handleSizeChange}
                  onFocus={validateOnBlur}
                  placeholder="Cantidad"
                />
                {errorSize?.cantidad?.length > 0 && (
                  <small className="h-6 text-red-600 w-full flex self-start mb-1">
                    {errorSize.cantidad}
                  </small>
                )}
              </div>
              <button
                type="submit"
                className="btn mt-1 2xl:mb-8 2xl:mt-0 text-white hover:bg-grey hover:text-fontDark transition-all ease-in-out disabled:bg-header/80 disabled:text-fontLigth"
                disabled={isSizeDisabled}
              >
                Añadir
              </button>
            </form>
            <div className="flex flex-col w-2/3 justify-center items-center">
              {form?.talle?.length > 0 &&
                form.talle.map((item, index) => (
                  <div
                    className="w-2/3 flex justify-center items-center border rounded p-4"
                    key={index + "talle"}
                  >
                    <div className="w-full flex items-center justify-around text-lg text-fontDark">
                      {" "}
                      <span>Talle: {item.talle}</span>{" "}
                      <span>Cantidad: {item.cantidad}</span>
                    </div>
                    <button
                      type="button"
                      className="btn btn-circle hover:bg-grey hover:text-fontDark text-xl"
                      onClick={handleSizeEdition}
                      value={`talle: ${item.talle}, cantidad: ${item.cantidad}`}
                    >
                      x
                    </button>
                  </div>
                ))}
              {formUpdate?.talle?.length > 0 &&
                formUpdate.talle.map((item, index) => (
                  <div
                    className="w-2/3 flex justify-between items-center border rounded p-2"
                    key={index + "talle"}
                  >
                    <div className="w-2/3 flex items-center justify-between px-4 text-lg text-fontDark">
                      {" "}
                      <span>Talle: {item.talle}</span>{" "}
                      <span>Cantidad: {item.cantidad}</span>
                    </div>
                    <button
                      type="button"
                      className="btn btn-circle hover:bg-grey hover:text-fontDark text-xl"
                      onClick={handleSizeEdition}
                      value={`talle: ${item.talle}, cantidad: ${item.cantidad}`}
                    >
                      x
                    </button>
                  </div>
                ))}
            </div>
            <form
              className="form-control w-2/3 gap-4 p-4 text-fontDark text-lg"
              onSubmit={handleFormSubmit}
            >
              <div className="flex flex-col w-40 sm:w-full">
                <label className="label  text-fontDark ">
                  <span>Imagen</span>
                </label>
                <input
                  type="file"
                  className="file-input-xs sm:file-input bg-fontGrey w-full text-white"
                  name="image"
                  onChange={handleImageChange}
                  onFocus={validateOnBlur}
                  placeholder="Imagen"
                  ref={fileInputRef}
                />
                {errorImage?.image?.length > 0 && (
                  <small className="h-6 text-red-600 w-full flex self-start mb-1">
                    {errorImage.image}
                  </small>
                )}
              </div>
              <div className="flex flex-wrap justify-center items-start mt-4 gap-2">
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
                        className="border rounded-full hover:bg-nav hover:text-grey bg-grey text-fontDark text-xl relative flex px-2 transition-all"
                        type="button"
                        onClick={() => handleImageRemove(index)}
                      >
                        X
                      </button>
                    </div>
                  ))}
                {productToUpdate?.imagenes?.length > 0 &&
                  productToUpdate.imagenes.map((img, index) => (
                    <div
                      key={img}
                      className="flex flex-col-reverse w-1/4 h-72 border rounded justify-end items-end p-2 bg-white"
                    >
                      <img
                        src={img}
                        alt={`edit ${index}`}
                        className="w-full h-64 object-contain rounded-md  "
                      />
                      <button
                        className="border rounded-full hover:bg-nav hover:text-grey bg-grey text-fontDark text-xl relative flex px-2 transition-all"
                        type="button"
                        onClick={() => {
                          setItemToDelete({
                            nombre: "imagen",
                            idProduct: productToUpdate._id,
                            id: img,
                          });
                          setSection("formProductos");
                          toggleModal();
                        }}
                      >
                        X
                      </button>
                    </div>
                  ))}
              </div>
              <label className="label pt-2 pb-0">
                <span>Tipo de producto</span>
              </label>
              <select
                ref={selectInputRefTipo}
                className="input bg-fontGrey"
                placeholder="Tipo de producto"
                name="tipo"
                onChange={handleChangeForm}
                onFocus={validateOnBlur}
                defaultValue="Elige un tipo de producto"
              >
                <option disabled>Elige un tipo de producto</option>
                {categoriesNameAndId.map((item) => (
                  <option key={item.id + "productForm"} value={item.id}>
                    {item?.nombre
                      ?.slice(0, 1)
                      .toUpperCase()
                      .concat(item.nombre.slice(1).toLowerCase())}
                  </option>
                ))}
              </select>
              {errorsForm?.tipo?.length > 0 && (
                <small className="h-6 text-red-600 w-full flex self-start mb-1">
                  {errorsForm.tipo}
                </small>
              )}
              <label className="label pt-2 pb-0">
                <span>Modelo</span>
              </label>
              <input
                autoComplete="off"
                type="text"
                className="input bg-fontGrey"
                placeholder="Modelo"
                name="modelo"
                value={
                  productToUpdate?._id?.length ? formUpdate.modelo : form.modelo
                }
                onChange={handleChangeForm}
                onFocus={validateOnBlur}
              />
              {errorsForm?.modelo?.length > 0 && (
                <small className="h-6 text-red-600 w-full flex self-start mb-1">
                  {errorsForm.modelo}
                </small>
              )}
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
                defaultValue="Seleccione un tipo de producto"
              >
                {form.tipo?.length ? (
                  currentSubcategories?.subcategorias?.length ? (
                    <>
                      <option disabled>Elige una marca</option>
                      {currentSubcategories?.subcategorias.map((item) => (
                        <option key={item._id} value={item._id}>
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
                  <option disabled>Seleccione un tipo de producto</option>
                )}
              </select>
              {errorsForm?.marca?.length > 0 && (
                <small className="h-6 text-red-600 w-full flex self-start mb-1">
                  {errorsForm.marca}
                </small>
              )}
              <label className="label pt-2 pb-0">
                <span>Descripción</span>
              </label>
              <input
                type="text"
                autoComplete="off"
                className="textarea h-20 bg-fontGrey"
                name="descripcion"
                value={
                  productToUpdate?._id?.length
                    ? formUpdate.descripcion
                    : form.descripcion
                }
                onChange={handleChangeForm}
                onFocus={validateOnBlur}
                placeholder="Descripción"
              />
              {errorsForm?.descripcion?.length > 0 && (
                <small className="h-6 text-red-600 w-full flex self-start mb-1">
                  {errorsForm.descripcion}
                </small>
              )}
              <label className="label pt-2 pb-0">
                <span>Precio</span>
              </label>
              <input
                type="text"
                autoComplete="off"
                className="input bg-fontGrey"
                name="precio"
                value={
                  productToUpdate?._id?.length ? formUpdate.precio : form.precio
                }
                onChange={handleChangeForm}
                onFocus={validateOnBlur}
                placeholder="Precio"
              />
              {errorsForm?.precio?.length > 0 && (
                <small className="h-6 text-red-600 w-full flex self-start mb-1">
                  {errorsForm.precio}
                </small>
              )}
              <div className={`flex flex-col w-full `}>
                <label className="label pt-2 pb-0">
                  <span>Aplicar descuento</span>
                </label>
                <input
                  autoComplete="off"
                  type="number"
                  min={0}
                  className="input bg-fontGrey"
                  name="descuento"
                  value={
                    productToUpdate?._id?.length
                      ? formUpdate.descuento
                      : form.descuento
                  }
                  onChange={handleChangeForm}
                  placeholder="Ingresar descuento"
                />
                {errorsForm?.descuento?.length > 0 && (
                  <small className="h-6 text-red-600 w-full flex self-start mb-1">
                    {errorsForm.descuento}
                  </small>
                )}
              </div>
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="flex flex-row items-center gap-2 pt-4 px-2">
                  <input
                    className="checkbox checkbox-warning checkbox-sm rounded"
                    type="checkbox"
                    name="destacado"
                    onChange={handleChangeForm}
                    checked={
                      productToUpdate?._id?.length
                        ? formUpdate.destacado
                        : form.destacado
                    }
                  />
                  <span>Destacar producto</span>
                </div>
                <div className="flex flex-row items-center gap-2 pt-4 px-2">
                  <input
                    className="checkbox checkbox-warning checkbox-sm rounded"
                    type="checkbox"
                    name="isActive"
                    onChange={handleChangeForm}
                    checked={
                      productToUpdate?._id?.length
                        ? formUpdate.isActive
                        : form.isActive
                    }
                  />
                  <span>Activar o desactivar producto</span>
                </div>
              </div>
              <label className="label pt-2 pb-0">
                <span>Código</span>
              </label>
              <input
                autoComplete="off"
                type="text"
                className="input bg-fontGrey"
                name="codigo"
                value={
                  productToUpdate?._id?.length ? formUpdate.codigo : form.codigo
                }
                onChange={handleChangeForm}
                onFocus={validateOnBlur}
                placeholder="Código"
              />
              {errorsForm?.codigo?.length > 0 && (
                <small className="h-6 text-red-600 w-full flex self-start mb-1">
                  {errorsForm.codigo}
                </small>
              )}
              <label className="label pt-2 pb-0">
                <span>Género</span>
              </label>
              <input
                type="text"
                autoComplete="off"
                className="input bg-fontGrey"
                name="genero"
                value={
                  productToUpdate?._id?.length ? formUpdate.genero : form.genero
                }
                onChange={handleChangeForm}
                onFocus={validateOnBlur}
                placeholder="Género"
              />
              {errorsForm?.genero?.length > 0 && (
                <small className="h-6 text-red-600 w-full flex self-start mb-1">
                  {errorsForm.genero}
                </small>
              )}
              <label className="label pt-2 pb-0">
                <span>Proveedor</span>
              </label>
              <input
                type="text"
                autoComplete="off"
                className="input bg-fontGrey"
                name="proveedor"
                value={
                  productToUpdate?._id?.length
                    ? formUpdate.proveedor
                    : form.proveedor
                }
                onChange={handleChangeForm}
                onFocus={validateOnBlur}
                placeholder="Proveedor"
              />
              {errorsForm?.proveedor?.length > 0 && (
                <small className="h-6 text-red-600 w-full flex self-start mb-1">
                  {errorsForm.proveedor}
                </small>
              )}
              <label className="label pt-2 pb-0">
                <span>Disciplina</span>
              </label>
              <input
                type="text"
                autoComplete="off"
                className="input bg-fontGrey mb-4"
                name="disciplina"
                value={
                  productToUpdate?._id?.length
                    ? formUpdate.disciplina
                    : form.disciplina
                }
                onChange={handleChangeForm}
                onFocus={validateOnBlur}
                placeholder="Disciplina"
              />
              {errorsForm?.disciplina?.length > 0 && (
                <small className="h-6 text-red-600 w-full flex self-start mb-1">
                  {errorsForm.disciplina}
                </small>
              )}
              <button
                type="submit"
                className="btn text-white hover:bg-grey hover:text-fontDark transition-all ease-in-out disabled:bg-header/80 disabled:text-fontLigth"
                disabled={
                  productToUpdate?._id?.length
                    ? isFormUpdateDisabled
                    : isFormDisabled
                }
              >
                {params?.id?.length ? "Editar producto" : "Crear producto"}
              </button>
            </form>
          </>
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
    </>
  );
};

export default ProductForm;
