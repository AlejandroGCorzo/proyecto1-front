import React, { useRef, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ServerError from "../../../utils/ServerError";
import ServerSuccess from "../../../utils/ServerSuccess";
import { setError, setSuccess } from "../../../redux/discountsSlice";
import { toBase64 } from "../../../utils/FileToBase64";
import { ConfirmationComponent } from "../../../utils/DeleteSteps";
import Loading from "../../../utils/Loading";
import {
  patchCuponesAction,
  postCuponesAction,
} from "../../../redux/discountsActions";

const DiscountsForm = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const { error, success, cupones, loading } = useSelector(
    (state) => state.discounts
  );
  const cuponToUpdate = cupones?.find((item) => item._id === params.id);
  const cuponesNames = cupones?.map((item) => item.nombre.toUpperCase());
  const token = localStorage.getItem("token");
  const [errorForm, setErrorForm] = useState({});
  const [form, setForm] = useState({
    nombre: "",
    cantidad: "",
    descuento: "",
    vencimientoEnDias: "",
  });
  const [formUpdate, setFormUpdate] = useState({
    nombre: "",
    cantidad: "",
    descuento: "",
    vencimientoEnDias: "",
  });

  function eliminarPropiedadesSinValor(objeto) {
    for (let propiedad in objeto) {
      if (
        objeto[propiedad] === null ||
        objeto[propiedad] === undefined ||
        objeto[propiedad] === ""
      ) {
        delete objeto[propiedad];
      }
    }
    return objeto;
  }

  const clearReducer = () => {
    dispatch(setError(""));
    dispatch(setSuccess(""));
  };
  const clearForm = () => {
    setForm({
      nombre: "",
      cantidad: "",
      descuento: "",
      vencimientoEnDias: "",
    });

    if (params?.id?.length) {
      setFormUpdate({
        nombre: "",
        cantidad: "",
        descuento: "",
        vencimientoEnDias: "",
      });
    }
    setErrorForm({});

    dispatch(setError(""));
    dispatch(setSuccess(""));
  };
  const validateName = (input) => {
    let error = {};
    if (
      cuponesNames?.length &&
      cuponesNames?.includes(input.nombre?.toUpperCase())
    ) {
      error.nombre = "El cupón ya existente, ingrese un nombre diferente.";
    } else if (!input.nombre && !params?.id?.length) {
      error.nombre = "El campo Nombre no puede estar vacío.";
    } else {
      error.nombre = "";
    }
    return error;
  };
  const validateDiscount = (input) => {
    let error = {};
    if (input.descuento && !Number(input.descuento)) {
      error.descuento = "Debe ingresar solo números";
    } else if (!input.descuento && !params?.id?.length) {
      error.descuento = "El campo Descuento no puede estar vacío.";
    } else {
      error.descuento = "";
    }
    return error;
  };
  const validateQuantity = (input) => {
    let error = {};
    if (input.cantidad && !Number(input.cantidad)) {
      error.cantidad = "Debe ingresar solo números";
    } else if (!input.cantidad && !params?.id?.length) {
      error.cantidad = "El campo Cantidad no puede estar vacío.";
    } else {
      error.cantidad = "";
    }
    return error;
  };
  const validateVto = (input) => {
    let error = {};
    if (input.vencimientoEnDias && !Number(input.vencimientoEnDias)) {
      error.vencimientoEnDias = "Debe ingresar solo números";
    } else if (!input.vencimientoEnDias && !params?.id?.length) {
      error.vencimientoEnDias = "El campo Vencimiento no puede estar vacío.";
    } else {
      error.vencimientoEnDias = "";
    }
    return error;
  };

  const validateOnBlur = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (name === "nombre") {
      let errorFormValidation = validateName({ [name]: value });
      setErrorForm((prev) => ({ ...prev, ...errorFormValidation }));
    }
    if (name === "descuento") {
      let errorFormValidation = validateDiscount({ [name]: value });
      setErrorForm((prev) => ({ ...prev, ...errorFormValidation }));
    }
    if (name === "cantidad") {
      let errorFormValidation = validateQuantity({ [name]: value });
      setErrorForm((prev) => ({ ...prev, ...errorFormValidation }));
    }
    if (name === "vencimientoEnDias") {
      let errorFormValidation = validateVto({ [name]: value });
      setErrorForm((prev) => ({ ...prev, ...errorFormValidation }));
    }
  };

  const handleChangeForm = async (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    if (name === "nombre") {
      if (!params?.id?.length) {
        setForm((prev) => ({ ...prev, nombre: value }));
      } else {
        setFormUpdate((prev) => ({ ...prev, nombre: value }));
      }
      let errorFormValidation = validateName({ [name]: value });
      setErrorForm((prev) => ({ ...prev, ...errorFormValidation }));
    }
    if (name === "descuento") {
      if (!params?.id?.length) {
        setForm((prev) => ({ ...prev, [name]: value }));
      } else {
        setFormUpdate((prev) => ({ ...prev, [name]: value }));
      }
      let errorFormValidation = validateDiscount({ [name]: value });
      setErrorForm((prev) => ({ ...prev, ...errorFormValidation }));
    }
    if (name === "cantidad") {
      if (!params?.id?.length) {
        setForm((prev) => ({ ...prev, [name]: value }));
      } else {
        setFormUpdate((prev) => ({ ...prev, [name]: value }));
      }
      let errorFormValidation = validateQuantity({ [name]: value });
      setErrorForm((prev) => ({ ...prev, ...errorFormValidation }));
    }
    if (name === "vencimientoEnDias") {
      if (!params?.id?.length) {
        setForm((prev) => ({ ...prev, [name]: value }));
      } else {
        setFormUpdate((prev) => ({ ...prev, [name]: value }));
      }
      let errorFormValidation = validateVto({ [name]: value });
      setErrorForm((prev) => ({ ...prev, ...errorFormValidation }));
    }
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    let formToSubmit;
    if (params?.id?.length) {
      formToSubmit = formUpdate;
      if (formToSubmit?.descuento?.length) {
        formToSubmit = {
          ...formToSubmit,
          descuento: Number(formUpdate.descuento),
        };
      }
      if (formToSubmit?.cantidad?.length) {
        formToSubmit = {
          ...formToSubmit,
          cantidad: Number(formUpdate.cantidad),
        };
      }
      if (formToSubmit?.vencimientoEnDias?.length) {
        formToSubmit = {
          ...formToSubmit,
          vencimientoEnDias: Number(formUpdate.vencimientoEnDias),
        };
      }
      formToSubmit = eliminarPropiedadesSinValor(formToSubmit);
    } else {
      formToSubmit = {
        ...form,
        cantidad: Number(form.cantidad),
        descuento: Number(form.descuento),
        vencimientoEnDias: Number(form.vencimientoEnDias),
      };
    }

    async function post() {
      if (cuponToUpdate?._id?.length) {
        await dispatch(patchCuponesAction(formToSubmit, cuponToUpdate._id));
      } else {
        await dispatch(postCuponesAction(formToSubmit));
      }
    }

    post();
    clearForm();
  };

  let isFormDisabled =
    !Object.values(form).join("").length ||
    Object.values(errorForm).join("").length
      ? true
      : false;
  let isFormUpdateDisabled =
    !Object.values(formUpdate).join("").length ||
    Object.values(errorForm).join("").length
      ? true
      : false;

  return (
    <>
      {loading ? (
        <div className="h-96 flex justify-center items-center">
          <Loading />
        </div>
      ) : (
        <div className="flex flex-col w-full justify-center items-center">
          <div
            className="w-full  px-8 flex flex-row sm:self-start justify-center items-center sm:justify-between 
        text-xl text-blue-400 ml-4 gap-8 sm:gap-0"
          >
            <Link
              to="/admin/discounts"
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
          {error?.length > 0 && <ServerError error={error} />}
          {success?.length > 0 && <ServerSuccess success={success} />}
          <h2 className="pt-2 h-10 font-semibold text-header underline text-xl md:text-2xl flex self-center sm:w-2/3">
            {cuponToUpdate?._id?.length
              ? "Editar cupón de descuento:"
              : "Crear cupón de descuento:"}
          </h2>
          <form
            className="form-control w-full sm:w-2/3 gap-4 p-4 text-header text-lg flex flex-col justify-between items-start "
            onSubmit={handleSubmitForm}
          >
            <div className="flex flex-col w-full">
              <label className="label pt-2 pb-0">
                <span>Nombre del cupón</span>
              </label>
              <input
                autoComplete="off"
                type="text"
                className="input bg-white"
                name="nombre"
                value={params?.id?.length ? formUpdate.nombre : form.nombre}
                onChange={handleChangeForm}
                onBlur={validateOnBlur}
                placeholder="Nombre del cupón"
              />
              {errorForm?.nombre?.length ? (
                <small className="h-6 text-red-600 w-full flex self-start mb-1">
                  {errorForm.nombre}
                </small>
              ) : (
                !params.id?.length &&
                form.nombre.length === 0 && (
                  <small className="h-6 text-red-600 w-full flex self-start mb-1">
                    * Campo requerido
                  </small>
                )
              )}
            </div>
            <div className="flex flex-col w-full">
              <label className="label pt-2 pb-0">
                <span>Cantidad</span>
              </label>
              <input
                autoComplete="off"
                type="text"
                className="input bg-white"
                name="cantidad"
                value={params?.id?.length ? formUpdate.cantidad : form.cantidad}
                onChange={handleChangeForm}
                onBlur={validateOnBlur}
                placeholder="Cantidad de aplicaciones"
              />
              {errorForm?.cantidad?.length ? (
                <small className="h-6 text-red-600 w-full flex self-start mb-1">
                  {errorForm.cantidad}
                </small>
              ) : (
                !params.id?.length &&
                form.cantidad.length === 0 && (
                  <small className="h-6 text-red-600 w-full flex self-start mb-1">
                    * Campo requerido
                  </small>
                )
              )}
            </div>
            <div className="flex flex-col w-full">
              <label className="label pt-2 pb-0">
                <span>Descuento</span>
              </label>
              <input
                autoComplete="off"
                type="text"
                className="input bg-white"
                name="descuento"
                value={
                  params?.id?.length ? formUpdate.descuento : form.descuento
                }
                onChange={handleChangeForm}
                onBlur={validateOnBlur}
                placeholder="Descuento"
              />
              {errorForm?.descuento?.length ? (
                <small className="h-6 text-red-600 w-full flex self-start mb-1">
                  {errorForm.descuento}
                </small>
              ) : (
                !params.id?.length &&
                form.descuento.length === 0 && (
                  <small className="h-6 text-red-600 w-full flex self-start mb-1">
                    * Campo requerido
                  </small>
                )
              )}
            </div>
            <div className="flex flex-col w-full">
              <label className="label pt-2 pb-0">
                <span>Vencimiento</span>
              </label>
              <input
                autoComplete="off"
                type="text"
                className="input bg-white"
                name="vencimientoEnDias"
                value={
                  params?.id?.length
                    ? formUpdate.vencimientoEnDias
                    : form.vencimientoEnDias
                }
                onChange={handleChangeForm}
                onBlur={validateOnBlur}
                placeholder="Vencimiento en días"
              />
              {errorForm?.vencimientoEnDias?.length ? (
                <small className="h-6 text-red-600 w-full flex self-start mb-1">
                  {errorForm.vencimientoEnDias}
                </small>
              ) : (
                !params.id?.length &&
                form.vencimientoEnDias.length === 0 && (
                  <small className="h-6 text-red-600 w-full flex self-start mb-1">
                    * Campo requerido
                  </small>
                )
              )}
            </div>

            <button
              type="submit"
              className="btn mt-1 2xl:mt-0 text-white hover:bg-white hover:text-header transition-all ease-in-out disabled:bg-header/80 disabled:text-fontGrey"
              disabled={
                params?.id?.length ? isFormUpdateDisabled : isFormDisabled
              }
            >
              {params?.id?.length ? "Editar cupón" : "Crear cupón"}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default DiscountsForm;
