import React, { useEffect, useRef, useState } from "react";
import { RiShoppingBagFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatearPrecio } from "../../utils/formatPrice";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { postCartAction } from "../../redux/shoppingCartActions";
import Loading from "../../utils/Loading";
import {
  clearCart,
  clearOrder,
  setLoading,
} from "../../redux/shopingCartSlice";
import { BsFillCheckCircleFill } from "react-icons/bs";

function CheckoutForm({ productsData = [] }) {
  const modalRef = useRef(null);
  const toggleModal = (e) => {
    modalRef?.current?.classList?.toggle("modal-open");
    document?.activeElement?.blur();
  };
  const dispatch = useDispatch();
  let getUserData;
  const { loading, productos, totalSinDescuento, totalConDescuento, order } =
    useSelector((state) => state.cart);
  const { products } = useSelector((state) => state.products);
  const [productsInCart, setProductsInCart] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    cuit: "",
    dni: "",
  });
  const [errorForm, setErrorForm] = useState({
    nombre: "",
    correo: "",
    cuit: "",
    dni: "",
  });
  const [secondForm, setSecondForm] = useState({
    direccion: "",
    departamento: "",
    ciudad: "",
    provincia: "",
    codigoPostal: "",
    pais: "",
  });
  const [errorSecondForm, setErrorSecondForm] = useState({
    direccion: "",
    departamento: "",
    ciudad: "",
    provincia: "",
    codigoPostal: "",
    pais: "",
  });

  const [mostrarSegundoForm, setMostrarSegundoForm] = useState(false);

  useEffect(() => {
    getUserData = JSON.parse(localStorage.getItem("userData"));

    if (
      getUserData?.nombre?.length ||
      getUserData?.correo?.length ||
      getUserData?.cuit?.length ||
      getUserData?.dni?.length
    ) {
      setForm({
        nombre: getUserData.nombre?.length ? getUserData.nombre : "",
        cuit: getUserData.cuit?.length ? getUserData.cuit : "",
        correo: getUserData.correo?.length ? getUserData.correo : "",
        dni: getUserData.dni?.length ? getUserData.dni : "",
      });
    }
    if (
      getUserData?.direccion?.length ||
      getUserData?.departamento?.length ||
      getUserData?.ciudad?.length ||
      getUserData?.provincia?.length ||
      getUserData?.codigoPostal?.length ||
      getUserData?.pais?.length
    ) {
      setSecondForm({
        direccion: getUserData?.direccion?.length ? getUserData.direccion : "",
        departamento: getUserData?.departamento?.length
          ? getUserData.departamento
          : "",
        ciudad: getUserData?.ciudad?.length ? getUserData.ciudad : "",
        provincia: getUserData?.provincia?.length ? getUserData.provincia : "",
        codigoPostal: getUserData?.codigoPostal?.length
          ? getUserData.codigoPostal
          : "",
        pais: getUserData?.pais?.length ? getUserData.pais : "",
      });
    }
  }, [getUserData]);

  useEffect(() => {
    if (!productsData?.length && productos?.length && products?.length) {
      let foundProduct = [];
      for (let i = 0; i < productos?.length; i++) {
        foundProduct.push(
          products?.find((elem) => elem._id === productos[i].producto)
        );
      }
      foundProduct = foundProduct?.sort((a, b) =>
        a.descripcion.localeCompare(b.descripcion)
      );
      if (foundProduct?.length) {
        setProductsInCart(foundProduct);
      }
    } else if (productsData?.length) {
      setProductsInCart(
        productsData?.sort((a, b) => a.descripcion.localeCompare(b.descripcion))
      );
    } else if (!productos?.length && productsData?.length) {
      setProductsInCart([]);
    }
  }, [products, productos]);

  useEffect(() => {
    // Verifica si el usuario ya ha sido redirigido.
    if (!order?.linkMP?.length) {
      localStorage.setItem("alreadyRedirected", "false");
    }
    if (
      localStorage.getItem("alreadyRedirected") === "false" &&
      order?.linkMP?.length
    ) {
      // Redirecciona al usuario.

      const redirect = async () => {
        window.open(order.linkMP, "_blank");
        await dispatch(setLoading(false));
        toggleModal();
        // Guarda en localStorage que el usuario ya ha sido redirigido.
        localStorage.setItem("alreadyRedirected", "true");
      };
      redirect();
    }
  }, [order.linkMP]);

  const validarEmail = (input) => {
    // Patrón básico de validación de correo electrónico
    let error = {};
    var re = /\S+@\S+\.\S+/;
    if (!input.correo) {
      error.correo = "Debe ingresar el correo.";
    }

    if (!re.test(input.correo)) {
      error.correo = "Correo invalido.";
    }
    if (input.correo.length && re.test(input.correo)) {
      error.correo = "";
    }
    return error;
  };

  const validarNombre = (input) => {
    // Validaciones requeridas
    let error = {};
    if (!input.nombre) {
      error.nombre = "Debe ingresar un nombre.";
    } else {
      error.nombre = "";
    }

    return error;
  };
  const validarDNI = (input) => {
    // Validaciones requeridas
    let error = {};

    if (!input.dni) {
      error.dni = "Debe ingresar un DNI.";
    } else {
      error.dni = "";
    }

    return error;
  };
  const validarCUIT = (input) => {
    // Validaciones requeridas
    let error = {};

    if (!input.cuit) {
      error.cuit = "Debe ingresar un CUIT/CUIL.";
    } else {
      error.cuit = "";
    }

    return error;
  };

  const validarDireccion = (input) => {
    let error = {};

    if (!input.direccion.length) {
      error.direccion = "Debe ingresar una Dirección.";
    } else {
      error.direccion = "";
    }

    return error;
  };
  const validarCiudad = (input) => {
    let error = {};

    if (!input.ciudad?.length) {
      error.ciudad = "Debe ingresar una Ciudad.";
    } else {
      error.ciudad = "";
    }

    return error;
  };
  const validarCodigoPostal = (input) => {
    let error = {};

    if (!input.codigoPostal?.length) {
      error.codigoPostal = "Debe ingresar un Código postal.";
    } else if (!Number(input.codigoPostal)) {
      error.codigoPostal = "El Código postal solo debe contener números.";
    } else {
      error.codigoPostal = "";
    }

    return error;
  };
  const validarProvincia = (input) => {
    let error = {};

    if (!input.provincia?.length) {
      error.provincia = "Debe ingresar una Provincia.";
    } else {
      error.provincia = "";
    }

    return error;
  };
  const validarPais = (input) => {
    let error = {};

    if (!input.pais?.length) {
      error.pais = "Debe ingresar un País.";
    } else {
      error.pais = "";
    }

    return error;
  };

  const validateOnFocus = (e) => {
    e.preventDefault();
    const { name, value, files } = e.target;
    if (name === "nombre") {
      let errorFormValidation = validarNombre({ [name]: value });
      setForm((prev) => ({ ...prev, [name]: value }));
      setErrorForm((prev) => ({ ...prev, ...errorFormValidation }));
    } else if (name === "dni") {
      let errorFormValidation = validarDNI({ [name]: value });
      setForm((prev) => ({ ...prev, [name]: value }));
      setErrorForm((prev) => ({ ...prev, ...errorFormValidation }));
    } else if (name === "cuit") {
      let errorFormValidation = validarCUIT({ [name]: value });
      setForm((prev) => ({ ...prev, [name]: value }));
      setErrorForm((prev) => ({ ...prev, ...errorFormValidation }));
    } else if (name === "correo") {
      let errorFormValidation = validarEmail({ [name]: value });
      setForm((prev) => ({ ...prev, [name]: value }));
      setErrorForm((prev) => ({ ...prev, ...errorFormValidation }));
    } else if (name === "direccion") {
      let errorFormValidation = validarDireccion({ [name]: value });
      setSecondForm((prev) => ({ ...prev, [name]: value }));
      setErrorSecondForm((prev) => ({ ...prev, ...errorFormValidation }));
    } else if (name === "ciudad") {
      let errorFormValidation = validarCiudad({ [name]: value });
      setSecondForm((prev) => ({ ...prev, [name]: value }));
      setErrorSecondForm((prev) => ({ ...prev, ...errorFormValidation }));
    } else if (name === "provincia") {
      let errorFormValidation = validarProvincia({ [name]: value });
      setSecondForm((prev) => ({ ...prev, [name]: value }));
      setErrorSecondForm((prev) => ({ ...prev, ...errorFormValidation }));
    } else if (name === "pais") {
      let errorFormValidation = validarPais({ [name]: value });
      setSecondForm((prev) => ({ ...prev, [name]: value }));
      setErrorSecondForm((prev) => ({ ...prev, ...errorFormValidation }));
    } else if (name === "codigoPostal") {
      let errorFormValidation = validarCodigoPostal({ [name]: value });
      setSecondForm((prev) => ({ ...prev, [name]: value }));
      setErrorSecondForm((prev) => ({ ...prev, ...errorFormValidation }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "correo") {
      let error = validarEmail({ [name]: value });
      setErrorForm((prev) => ({ ...prev, ...error }));
      setForm((prev) => ({ ...prev, [name]: value.trim() }));
    }
    if (name === "nombre") {
      let error = validarNombre({ [name]: value });
      setErrorForm((prev) => ({ ...prev, ...error }));
      setForm((prev) => ({ ...prev, [name]: value }));
    }
    if (name === "dni") {
      let error = validarDNI({ [name]: value });
      setErrorForm((prev) => ({ ...prev, ...error }));
      setForm((prev) => ({ ...prev, [name]: value.trim() }));
    }
    if (name === "cuit") {
      let error = validarCUIT({ [name]: value });
      setErrorForm((prev) => ({ ...prev, ...error }));
      setForm((prev) => ({ ...prev, [name]: value.trim() }));
    }
    if (name === "direccion") {
      let error = validarDireccion({ [name]: value });
      setErrorSecondForm((prev) => ({ ...prev, ...error }));
      setSecondForm((prev) => ({ ...prev, [name]: value }));
    }
    if (name === "codigoPostal") {
      let error = validarCodigoPostal({ [name]: value });
      setErrorSecondForm((prev) => ({ ...prev, ...error }));
      setSecondForm((prev) => ({ ...prev, [name]: value.trim() }));
    }
    if (name === "provincia") {
      let error = validarProvincia({ [name]: value });
      setErrorSecondForm((prev) => ({ ...prev, ...error }));
      setSecondForm((prev) => ({ ...prev, [name]: value }));
    }
    if (name === "pais") {
      let error = validarPais({ [name]: value });
      setErrorSecondForm((prev) => ({ ...prev, ...error }));
      setSecondForm((prev) => ({ ...prev, [name]: value }));
    }
    if (name === "ciudad") {
      let error = validarCiudad({ [name]: value });
      setErrorSecondForm((prev) => ({ ...prev, ...error }));
      setSecondForm((prev) => ({ ...prev, [name]: value }));
    }
    if (name === "departamento") {
      setSecondForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem(
      "userData",
      JSON.stringify({ ...form, ...secondForm })
    );

    if (
      Object.values(form)?.length === 4 &&
      Object.values(secondForm)?.length >= 5 &&
      mostrarSegundoForm
    ) {
      //post
      dispatch(
        postCartAction({
          products: productos.map((item) => ({
            product: item.producto,
            quantity: item.cantidad,
          })),
          Customer: {
            fullName: form.nombre,
            email: form.correo,
            dni: form.dni,
            cuit: form.cuit,
            address: secondForm.direccion,
            city: secondForm.ciudad,
            province: secondForm.provincia,
            country: secondForm.pais,
            zipCode: secondForm.codigoPostal,
            paymentMethod: "MERCADOPAGO",
          },
          payType: "MERCADOPAGO",
          shiping: true,
          isFacturaA: false,
        })
      );
    }
    setMostrarSegundoForm(true);
  };

  const handleBack = () => {
    /*  localStorage.removeItem("alreadyRedirected");
    dispatch(clearOrder()); */
  };

  let disabled =
    !form?.correo?.length ||
    !form?.nombre?.length ||
    !form?.cuit?.length ||
    !form?.dni?.length ||
    errorForm?.correo?.length ||
    errorForm?.nombre?.length ||
    errorForm?.cuit?.length ||
    errorForm?.dni?.length
      ? true
      : false;
  let disabledSecond =
    !secondForm?.direccion?.length ||
    !secondForm?.provincia?.length ||
    !secondForm?.ciudad?.length ||
    !secondForm?.pais?.length ||
    !secondForm?.codigoPostal?.length ||
    errorSecondForm?.codigoPostal?.length ||
    errorSecondForm?.pais?.length ||
    errorSecondForm?.ciudad?.length ||
    errorSecondForm?.provincia?.length ||
    errorSecondForm?.direccion?.length
      ? true
      : false;
  return (
    <div className="flex flex-col  items-center justify-start min-h-[450px] sm:min-h-[650px] md:min-h-[450px] w-full border border-yellow">
      <dialog ref={modalRef} className="modal bg-grey/40">
        <div className="modal-box bg-white">
          <div className="w-full flex flex-col justify-center items-center text-header">
            <div className="py-4 flex flex-col justify-center items-center">
              <BsFillCheckCircleFill fontSize={45} className="text-green-400" />
              <h2 className="text-center w-full text-4xl font-semibold py-4">
                Felicidades!
              </h2>
              <div className="flex flex-col justify-center items-start py-2">
                <p className="text-lg">
                  Por favor, completa tu compra en la nueva pestaña que se ha
                  abierto.
                </p>
                <span className="text-header/70">
                  *También puedes hacerlo desde este link
                </span>
                <a
                  href={order.linkMP}
                  target="_blank"
                  className="text-lg underline text-blue-500 font-semibold"
                >
                  Ir a MercadoPago
                </a>
              </div>
            </div>
            <Link
              to="/"
              className="w-full text-center border hover:border-header bg-yellow/70 border-transparent text-header font-semibold py-1 px-4 rounded text-lg hover:text-header transition-all"
              onClick={handleBack}
            >
              Volver al Inicio
            </Link>
          </div>
        </div>
      </dialog>
      <div className=" w-full h-full p-4 text-3xl flex flex-col justify-center items-center sm:items-start bg-yellow/60 text-header/70 mt-8 sm:mt-0 ">
        <span className="text-lg flex items-center ">
          Estas a unos pasos de completar tu pedido.
        </span>
        <h1 className="font-bold flex items-center text-center sm:text-start">
          Ve detalles y agrega los datos:
        </h1>
      </div>

      <div className="w-full flex sm:flex-row flex-col justify-center items-start p-4 gap-4 ">
        {loading ? (
          <div className="flex flex-col w-full h-96 sm:w-1/2  justify-center items-center">
            <div className="py-4">
              <Loading />
            </div>
            <span className="text-header text-lg">Procesando orden...</span>
          </div>
        ) : (
          <aside className="flex flex-col w-full sm:w-1/2  justify-center items-center">
            {!mostrarSegundoForm ? (
              <div className="flex flex-col w-full justify-center items-center">
                <h2 className="w-auto text-2xl text-header font-semibold text-center sm:text-start">
                  Completa con tus datos para continuar.{" "}
                </h2>
                <form
                  onSubmit={handleSubmit}
                  className="w-full flex flex-col items-start justify-center text-lg md:pr-14 2xl:pr-0 max-w-3xl"
                >
                  <div className="mb-2 sm:max-w-xs lg:max-w-full w-full">
                    <label className="block text-header my-2">
                      Nombre completo:
                      <input
                        autoComplete="off"
                        className=" appearance-none  rounded w-full py-2 px-3 text-header bg-white border-2 focus:outline-none my-1"
                        type="text"
                        name="nombre"
                        value={form.nombre}
                        onChange={handleChange}
                        onBlur={validateOnFocus}
                        required
                      />
                      {errorForm?.nombre?.length ? (
                        <small className="h-6 text-red-600 w-full flex self-start mb-1">
                          {errorForm.nombre}
                        </small>
                      ) : null}
                    </label>
                  </div>
                  <div className="mb-2 sm:max-w-xs w-full lg:max-w-full ">
                    <label className="block text-header my-2">
                      Correo electrónico:
                      <input
                        autoComplete="off"
                        className=" appearance-none  rounded w-full py-2 px-3 text-header bg-white border-2 focus:outline-none my-1"
                        type="email"
                        name="correo"
                        value={form.correo}
                        onBlur={validateOnFocus}
                        onChange={handleChange}
                        required
                      />
                      {errorForm?.correo?.length ? (
                        <small className="h-6 text-red-600 w-full flex self-start mb-1">
                          {errorForm.correo}
                        </small>
                      ) : null}
                    </label>
                  </div>
                  <div className="mb-2 sm:max-w-xs w-full lg:max-w-full ">
                    <label className="block text-header mb-4">
                      DNI:
                      <input
                        autoComplete="off"
                        className=" appearance-none  rounded w-full py-2 px-3 text-header bg-white border-2 focus:outline-none my-1"
                        type="text"
                        name="dni"
                        value={form.dni}
                        onBlur={validateOnFocus}
                        onChange={handleChange}
                        required
                      />
                      {errorForm?.dni?.length ? (
                        <small className="h-6 text-red-600 w-full flex self-start mb-1">
                          {errorForm.dni}
                        </small>
                      ) : null}
                    </label>
                  </div>
                  <div className="mb-2 sm:max-w-xs w-full lg:max-w-full ">
                    <label className="block text-header mb-4">
                      CUIT/CUIL:
                      <input
                        autoComplete="off"
                        className=" appearance-none  rounded w-full py-2 px-3 text-header bg-white border-2 focus:outline-none my-1"
                        type="text"
                        name="cuit"
                        value={form.cuit}
                        onBlur={validateOnFocus}
                        onChange={handleChange}
                        required
                      />
                      {errorForm?.cuit?.length ? (
                        <small className="h-6 text-red-600 w-full flex self-start mb-1">
                          {errorForm.cuit}
                        </small>
                      ) : null}
                    </label>
                  </div>
                  <div className="flex items-center self-end w-auto">
                    <button
                      className="bg-yellow border
                    disabled:bg-yellow/40 border-yellow hover:bg-yellow/80  text-header py-2 px-4 rounded focus:outline-none flex flex-row-reverse items-center justify-between w-36 font-semibold"
                      type="submit"
                      disabled={disabled}
                    >
                      <AiOutlineArrowRight
                        className="flex self-center"
                        fontSize={20}
                      />
                      Continuar
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="flex flex-col w-full py-4 justify-center items-center">
                <h2 className="w-auto text-2xl text-header font-semibold text-center sm:text-start">
                  Ingresa tu dirección de envío.{" "}
                </h2>
                <form
                  onSubmit={handleSubmit}
                  className="w-full flex flex-col items-start justify-center text-lg md:pr-14 xl:pr-0 max-w-3xl"
                >
                  <div className="mb-2 max-w-lg w-full lg:max-w-full">
                    <label className="block text-header my-2">
                      Dirección:
                      <input
                        autoComplete="off"
                        className=" appearance-none  rounded w-full py-2 px-3 text-header bg-white border-2 focus:outline-none my-1"
                        type="text"
                        name="direccion"
                        value={secondForm.direccion}
                        onChange={handleChange}
                        onBlur={validateOnFocus}
                        required
                      />
                      {errorSecondForm?.direccion?.length ? (
                        <small className="h-6 text-red-600 w-full flex self-start mb-1">
                          {errorSecondForm.direccion}
                        </small>
                      ) : null}
                    </label>
                  </div>
                  <div className="mb-2 max-w-lg w-full lg:max-w-full">
                    <label className="block text-header my-2">
                      Departamento/Piso (opcional):
                      <input
                        autoComplete="off"
                        className=" appearance-none  rounded w-full py-2 px-3 text-header bg-white border-2 focus:outline-none my-1"
                        type="text"
                        name="departamento"
                        value={secondForm.departamento}
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                  <div className="mb-2 max-w-lg w-full lg:max-w-full">
                    <label className="block text-header mb-4">
                      Ciudad:
                      <input
                        autoComplete="off"
                        className=" appearance-none  rounded w-full py-2 px-3 text-header bg-white border-2 focus:outline-none my-1"
                        type="text"
                        name="ciudad"
                        value={secondForm.ciudad}
                        onBlur={validateOnFocus}
                        onChange={handleChange}
                        required
                      />
                      {errorSecondForm?.ciudad?.length ? (
                        <small className="h-6 text-red-600 w-full flex self-start mb-1">
                          {errorSecondForm.ciudad}
                        </small>
                      ) : null}
                    </label>
                  </div>

                  <div className="mb-2 max-w-lg w-full lg:max-w-full flex flex-row gap-4 justify-between items-center">
                    <label className="block text-header mb-4">
                      Provincia:
                      <input
                        autoComplete="off"
                        className=" appearance-none  rounded w-full py-2 px-3 text-header bg-white border-2 focus:outline-none my-1"
                        type="text"
                        name="provincia"
                        value={secondForm.provincia}
                        onBlur={validateOnFocus}
                        onChange={handleChange}
                        required
                      />
                      {errorSecondForm?.provincia?.length ? (
                        <small className="h-6 text-red-600 w-full flex self-start mb-1">
                          {errorSecondForm.provincia}
                        </small>
                      ) : null}
                    </label>

                    <label className="block text-header mb-4">
                      Código postal:
                      <input
                        autoComplete="off"
                        className=" appearance-none  rounded w-full py-2 px-3 text-header bg-white border-2 focus:outline-none my-1"
                        type="text"
                        name="codigoPostal"
                        value={secondForm.codigoPostal}
                        onBlur={validateOnFocus}
                        onChange={handleChange}
                        required
                      />
                      {errorSecondForm?.codigoPostal?.length ? (
                        <small className="h-6 text-red-600 w-full flex self-start mb-1">
                          {errorSecondForm.codigoPostal}
                        </small>
                      ) : null}
                    </label>
                  </div>
                  <div className="mb-2 max-w-lg w-full lg:max-w-full">
                    <label className="block text-header mb-4">
                      País:
                      <input
                        autoComplete="off"
                        className=" appearance-none  rounded w-full py-2 px-3 text-header bg-white border-2 focus:outline-none my-1"
                        type="text"
                        name="pais"
                        value={secondForm.pais}
                        onBlur={validateOnFocus}
                        onChange={handleChange}
                        required
                      />
                      {errorSecondForm?.pais?.length ? (
                        <small className="h-6 text-red-600 w-full flex self-start mb-1">
                          {errorSecondForm.pais}
                        </small>
                      ) : null}
                    </label>
                  </div>
                  <div className="flex items-center self-end w-full justify-between">
                    <button
                      className="bg-header border
                    disabled:bg-header/40 border-yellow hover:bg-header/80  text-yellow py-2 px-4 rounded focus:outline-none flex flex-row-reverse items-center justify-between w-28 font-semibold"
                      onClick={() => setMostrarSegundoForm(false)}
                    >
                      Atrás
                      <AiOutlineArrowLeft
                        className="flex self-center"
                        fontSize={20}
                      />
                    </button>
                    <button
                      className="bg-yellow border
                    disabled:bg-yellow/40 border-yellow hover:bg-yellow/80  text-header py-2 px-4 rounded focus:outline-none flex flex-row-reverse items-center justify-between w-36 font-semibold"
                      type="submit"
                      disabled={disabledSecond}
                    >
                      <AiOutlineArrowRight
                        className="flex self-center"
                        fontSize={20}
                      />
                      Continuar
                    </button>
                  </div>
                </form>
              </div>
            )}
          </aside>
        )}
        <aside
          className="flex 
          w-full sm:w-1/2 flex-row justify-center"
        >
          <div className="h-full flex flex-col w-full justify-between border-x-2 border-2 max-w-xl">
            <h2 className="w-full text-center uppercase text-xl text-header font-semibold py-2 bg-grey rounded-tl-md rounded-tr-md">
              Resumen de cuenta
            </h2>
            <div className="h-full min-h-[200px] bg-white p-2 gap-2">
              {productsInCart &&
                productsInCart?.length > 0 &&
                productsInCart?.map((elem) => (
                  <div
                    key={elem._id + "cartPage"}
                    className=" flex flex-row  justify-center items-center
                      w-auto h-28 border-y  bg-white"
                  >
                    <div className="flex h-20 w-20 py-1 border">
                      <img
                        className="h-16 w-full object-contain aspect-auto"
                        src={elem?.imagen?.length ? elem.imagen : elem.imagenes}
                        alt={elem.descripcion}
                      />
                    </div>
                    <div className="w-2/3  flex flex-col sm:flex-row justify-center items-center px-2">
                      <Link to={`/product/${elem._id}`}>
                        <h2 className="text-header uppercase text-center w-40 lg:w-44  hover:text-blue-400">
                          {elem.descripcion}
                        </h2>
                      </Link>

                      {productos?.find((item) => item.producto === elem._id)
                        ?.precio < elem.precio ? (
                        <div className="flex flex-col w-full gap-2">
                          <p className="text-lg pb-1 font-medium text-header/60 w-full text-center line-through">
                            {formatearPrecio(elem.precio)}
                          </p>
                          <p className="text-lg pb-1 font-medium text-header w-full text-center">
                            {formatearPrecio(
                              productos?.find(
                                (item) => item.producto === elem._id
                              ).precio
                            )}
                          </p>
                        </div>
                      ) : (
                        <p className="text-lg pb-1 font-medium text-header w-full text-center">
                          {formatearPrecio(elem.precio)}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
            </div>
            {/* <div className="flex justify-center items-center py-4 bg-white">
                    {!showDiscount ? (
                      <button
                        className="py-2 px-4 border w-3/4 bg-grey rounded-sm text-header flex justify-center items-center"
                        onClick={() => setShowDiscount(true)}
                      >
                        <TbShoppingCartDiscount />{" "}
                        <span className="px-2">Ingresar descuento</span>
                      </button>
                    ) : (
                      <Discount />
                    )}
                  </div> */}
            {/* <div className="h-auto lg:h-80 w-full flex flex-col justify-start items-start px-6 py-4  bg-white"> */}
            <div className="flex flex-col w-full bg-white justify-center items-center">
              <div className="flex  flex-row justify-around text-header text-lg bg-white border-b w-2/3">
                <span>Subtotal</span>{" "}
                <span>{formatearPrecio(totalSinDescuento)}</span>
              </div>

              <div className=" flex  flex-row justify-around py-2 text-header text-xl bg-white w-2/3">
                <span className="uppercase">total</span>{" "}
                <span>{formatearPrecio(totalSinDescuento)}</span>
              </div>
            </div>
            {/* <button className="uppercase border-2 bg-white text-header/70 w-full py-2 rounded-md font-medium ">
                      Calcular envío
                    </button> */}
            {/*  </div> */}
            {/*   <div className="flex flex-col justify-start items-center  py-4 px-4 gap-6 bg-white rounded-bl-md rounded-br-md">
              <button className="btn bg-header hover:opacity-70 text-white w-full flex justify-center items-center text-[17px]">
                <RiShoppingBagFill /> Finalizar compra
              </button>
            </div> */}
            {/* <div className="w-full justify-center flex py-4 text-blue-400 text-lg font-medium">
            <Link to={"/"}>{"< Continuar comprando"}</Link>
          </div> */}
          </div>
        </aside>
      </div>
    </div>
  );
}

export default CheckoutForm;
