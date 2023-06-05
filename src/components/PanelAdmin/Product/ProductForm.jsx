import React, { useState } from "react";

const validateColor = (input) => {
  let errorsColor = {};

  if (!input) {
    errorsColor.color = "El campo Color no puede estar vacío.";
  }

  return errorsColor;
};

const ProductForm = () => {
  const [color, setColor] = useState("");
  const [errorColor, setErrorColor] = useState({});
  const [size, setSize] = useState({ talle: "", cantidad: "" });
  const [errorSize, setErrorSize] = useState({ talle: "", cantidad: "" });
  const [form, setForm] = useState({
    tipo: "",
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

  const handleColorChange = (e) => {
    e.preventDefault();
    console.log("error1", errorColor);
    const { value, name } = e.target;
    let errorColorValidation = validateColor({ color, [name]: value });
    console.log("error2", errorColor);
    setErrorColor(errorColorValidation);
    console.log("error2", errorColorValidation);
    if (value) {
      setColor(value);
      console.log(value);
    }
  };

  const handleColorSubmit = (e) => {
    e.preventDefault();
    if (errorColor && !color) {
      console.log(errorColor);
    }
    console.log(color);
  };

  const handleSizeChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
  };
  const handleSizeSubmit = (e) => {
    e.preventDefault();
    console.log(size);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
    let errorObj = validateProduct({
      ...form,
      [name]: value,
    });
    setFormErrors(errorObj);
  };
  return (
    <div className="flex flex-col w-full justify-start items-center">
      <h2 className="h-10 font-semibold text-2xl">Crear producto: </h2>
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
            placeholder="Talle"
          />
        </div>
        <div>
          <label className="label pt-2 pb-0">
            <span>Cantidad</span>
          </label>
          <input
            type="text"
            className="input bg-fontGrey"
            name="cantidad"
            value={size.cantidad}
            onChange={handleSizeChange}
            placeholder="Cantidad"
          />
        </div>
        <button
          type="submit"
          className="btn mt-1 2xl:mt-0 text-white hover:bg-grey hover:text-fontDark transition-all ease-in-out"
        >
          Añadir
        </button>
      </form>
      <form className="form-control w-2/3 gap-4 p-4 text-fontDark text-lg">
        <label className="label pt-2 pb-0">
          <span>Tipo de producto</span>
        </label>
        <input
          type="text"
          className="input bg-fontGrey"
          placeholder="Tipo de producto"
          name="tipo"
          value={form.tipo}
          onChange={handleChange}
        />
        <label className="label pt-2 pb-0">
          <span>Marca</span>
        </label>
        <input
          type="text"
          className="input bg-fontGrey"
          name="marca"
          value={form.marca}
          onChange={handleChange}
          placeholder="Marca"
        />
        <label className="label pt-2 pb-0">
          <span>Descripción</span>
        </label>
        <input
          type="text"
          className="textarea h-20 bg-fontGrey"
          name="descripcion"
          value={form.descripcion}
          onChange={handleChange}
          placeholder="Descripción"
        />

        <label className="label pt-2 pb-0">
          <span>Precio</span>
        </label>
        <input
          type="text"
          className="input bg-fontGrey"
          name="precio"
          value={form.precio}
          onChange={handleChange}
          placeholder="Precio"
        />
        <label className="label pt-2 pb-0">
          <span>Código</span>
        </label>
        <input
          type="text"
          className="input bg-fontGrey"
          name="productCode"
          value={form.codigo}
          onChange={handleChange}
          placeholder="Código"
        />
        <label className="label pt-2 pb-0">
          <span>Género</span>
        </label>
        <input
          type="text"
          className="input bg-fontGrey"
          name="genero"
          value={form.genero}
          onChange={handleChange}
          placeholder="Género"
        />
        <label className="label pt-2 pb-0">
          <span>Proveedor</span>
        </label>
        <input
          type="text"
          className="input bg-fontGrey"
          name="proveedor"
          value={form.proveedor}
          onChange={handleChange}
          placeholder="Proveedor"
        />
        <label className="label pt-2 pb-0">
          <span>Disciplina</span>
        </label>
        <input
          type="text"
          className="input bg-fontGrey mb-4"
          name="disciplina"
          value={form.disciplina}
          onChange={handleChange}
          placeholder="Disciplina"
        />

        <button
          type="submit"
          className="btn text-white hover:bg-grey hover:text-fontDark transition-all ease-in-out disabled:bg-header/80 disabled:text-fontLigth"
        >
          Crear producto
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
