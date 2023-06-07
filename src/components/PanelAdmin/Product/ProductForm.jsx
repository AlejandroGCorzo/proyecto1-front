import React, { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postProductAction } from "../../../redux/productActions";

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
    !input.tipo &&
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
    errorsProduct.tipo = "El campo Tipo no puede estar vacío.";
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

  if (!input.tipo) {
    errorsProduct.tipo = "El campo Tipo no puede estar vacío.";
  }
  if (!input.modelo) {
    errorsProduct.modelo = "El campo Modelo no puede estar vacío.";
  }
  if (!input.marca) {
    errorsProduct.marca = "El campo Marca no puede estar vacío.";
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
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const [color, setColor] = useState("");
  const [errorColor, setErrorColor] = useState({});
  const [size, setSize] = useState({ talle: "", cantidad: 0 });
  const [errorSize, setErrorSize] = useState({ talle: "", cantidad: "" });
  const [form, setForm] = useState({
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
    const { value, name } = e.target;
    if (name === "color") {
      let errorColorValidation = validateColor(color);
      setErrorColor(errorColorValidation);
    } else if (name === "talle" || name === "cantidad") {
      let errorSizeValidation = validateSize(size);
      setErrorSize(errorSizeValidation);
    } else {
      let errorFormValidation = validateProduct(form);
      setErrorsForm(errorFormValidation);
    }
  };
  const clearForm = () => {
    setColor("");
    setSize({ talle: "", cantidad: 0 });
    setForm({
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
      let priceToNumber = Number(form.precio);
      let sizeAmountToNumber = form.talle.map((item) => ({
        talle: item.talle,
        cantidad: Number(item.cantidad),
      }));

      await dispatch(
        postProductAction(
          {
            ...form,
            precio: priceToNumber,
            talle: sizeAmountToNumber,
          },
          token
        )
      );
    }
    post();
    clearForm();
  };

  let isDisabled =
    !Object.values(form).join("").length ||
    Object.values(errorColor).join("").length ||
    Object.values(errorSize).join("").length ||
    Object.values(errorsForm).join("").length
      ? true
      : false;

  return (
    <div className="flex flex-col w-full justify-start items-center">
      <div
        className="w-full p-2 flex flex-row self-start justify-between 
        text-xl text-blue-400 ml-4"
      >
        <Link to="/admin/products" className="flex items-center ">
          <AiOutlineArrowLeft className=" pr-1" fontSize={20} /> Volver
        </Link>
        <button
          className="btn mt-1 2xl:mt-0 text-white hover:bg-grey hover:text-fontDark transition-all ease-in-out self-center justify-end"
          onClick={clearForm}
        >
          Limpiar formulario
        </button>
      </div>
      <h2 className="pt-2 h-10 font-semibold text-fontDark underline text-2xl flex self-center w-2/3">
        Crear producto:{" "}
      </h2>
      <form
        className="form-control w-2/3 gap-4 p-4 text-fontDark text-lg flex flex-col lg:flex-row justify-around items-start lg:items-end"
        onSubmit={handleColorSubmit}
      >
        <div className="w-full">
          <label className="label pt-2 pb-0">
            <span>Color</span>
          </label>
          <input
            type="text"
            className="input bg-fontGrey w-2/3"
            name="color"
            value={color}
            onChange={handleColorChange}
            onBlur={validateOnBlur}
            placeholder="Color"
          />
          {errorColor.color ? (
            <small className="h-6 text-red-600 w-full flex self-start mb-1">
              {errorColor.color}
            </small>
          ) : null}
        </div>
        <button
          type="submit"
          className="btn mt-1 lg:mt-0  text-white hover:bg-grey hover:text-fontDark transition-all ease-in-out"
        >
          Añadir
        </button>
      </form>
      <form
        className="form-control w-2/3 gap-4 p-4 text-fontDark text-lg flex flex-col  justify-between items-start 2xl:flex-row 2xl:items-end"
        onSubmit={handleSizeSubmit}
      >
        <div>
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
          {errorSize.talle ? (
            <small className="h-6 text-red-600 w-full flex self-start mb-1">
              {errorSize.talle}
            </small>
          ) : null}
        </div>
        <div>
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
          {errorSize.cantidad ? (
            <small className="h-6 text-red-600 w-full flex self-start mb-1">
              {errorSize.cantidad}
            </small>
          ) : null}
        </div>
        <button
          type="submit"
          className="btn mt-1 2xl:mt-0 text-white hover:bg-grey hover:text-fontDark transition-all ease-in-out"
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
        <input
          type="text"
          className="input bg-fontGrey"
          placeholder="Tipo de producto"
          name="tipo"
          value={form.tipo}
          onChange={handleChangeForm}
          onBlur={validateOnBlur}
        />
        {errorsForm.tipo ? (
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
        {errorsForm.modelo ? (
          <small className="h-6 text-red-600 w-full flex self-start mb-1">
            {errorsForm.modelo}
          </small>
        ) : null}
        <label className="label pt-2 pb-0">
          <span>Marca</span>
        </label>
        <input
          type="text"
          className="input bg-fontGrey"
          name="marca"
          value={form.marca}
          onChange={handleChangeForm}
          onBlur={validateOnBlur}
          placeholder="Marca"
        />
        {errorsForm.marca ? (
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
        {errorsForm.descripcion ? (
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
        {errorsForm.precio ? (
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
        {errorsForm.codigo ? (
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
        {errorsForm.genero ? (
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
        {errorsForm.proveedor ? (
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
        {errorsForm.disciplina ? (
          <small className="h-6 text-red-600 w-full flex self-start mb-1">
            {errorsForm.disciplina}
          </small>
        ) : null}

        <button
          type="submit"
          className="btn text-white hover:bg-grey hover:text-fontDark transition-all ease-in-out disabled:bg-header/80 disabled:text-fontLigth"
          disabled={isDisabled}
        >
          Crear producto
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
