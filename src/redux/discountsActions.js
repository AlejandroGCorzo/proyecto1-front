const url = import.meta.env.VITE_REACT_APP_API;
import axios from "axios";
import { setErrorCupon, setSuccessCupon } from "./shopingCartSlice";
import {
  addCupon,
  removeCupon,
  searchCupones,
  setCupones,
  setError,
  setLoading,
  setSuccess,
  updateCupon,
} from "./discountsSlice";

//acciones CRUD descuentos
export const getCuponesAction = () => {
  return async function (dispatch) {
    try {
      dispatch(setLoading(true));
      const res = await axios.get(`${url}/cupon`);

      dispatch(setCupones(res.data));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      if (error.response) {
        dispatch(setError(error.response.data?.message));
      } else {
        dispatch(setError(error.message));
      }
    }
  };
};
export const postCuponesAction = (values) => {
  return async function (dispatch) {
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${url}/cupon`, values, {
        headers: {
          "Content-Type": "application/json",
          /* authorization: `Bearer ${token}`, */
        },
      });

      dispatch(addCupon(res.data));
      dispatch(setSuccess("Cupón creado con exito."));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      if (error.response) {
        dispatch(setError(error.response.data?.message));
      } else {
        dispatch(setError(error.message));
      }
    }
  };
};
export const patchCuponesAction = (values, id) => {
  return async function (dispatch) {
    try {
      dispatch(setLoading(true));
      const res = await axios.patch(`${url}/cupon/${id}`, values, {
        headers: {
          "Content-Type": "application/json",
          /*    authorization: `Bearer ${token}`, */
        },
      });
      dispatch(updateCupon(res.data));
      dispatch(setSuccess("Cupón editado con exito."));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      if (error.response) {
        dispatch(setError(error.response.data?.message));
      } else {
        dispatch(setError(error.message));
      }
    }
  };
};
export const deleteCuponesAction = (id) => {
  return async function (dispatch) {
    try {
      dispatch(setLoading(true));
      const res = await axios.delete(`${url}/cupon/${id}`);
      dispatch(removeCupon(res.data));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      if (error.response) {
        dispatch(setError(error.response.data?.message));
      } else {
        dispatch(setError(error.message));
      }
    }
  };
};

//accion para buscar cupones
export const searchCuponesAction = (value) => {
  return async function (dispatch) {
    dispatch(setLoading(true));

    dispatch(searchCupones(value));
    dispatch(setLoading(false));
  };
};

///acciones para validar y agregar cupon a la orden
export const validateCupon = (values) => {
  return async function (dispatch) {
    try {
      setLoading(true);
      const res = await axios.post(`${url}/cupon/validar/descuento`, values);

      if (res) {
        addCuponToOrder(values);
      }
    } catch (error) {
      dispatch(setLoading(false));
      if (error.response) {
        dispatch(setErrorCupon(error.response.data?.message));
      } else {
        dispatch(setErrorCupon(error.message));
      }
    }
  };
};
export const addCuponToOrder = (values) => {
  return async function (dispatch) {
    try {
      setLoading(true);
      const res = await axios.post(`${url}/cupon/aplicar/descuento`, values);
      console.log(res, values);
      /* dispatch(setCupon(values)); */
      setLoading(true);
      dispatch(setSuccessCupon("Cupón agregado con éxito"));
    } catch (error) {
      dispatch(setLoading(false));
      if (error.response) {
        dispatch(setErrorCupon(error.response.data?.message));
      } else {
        dispatch(setErrorCupon(error.message));
      }
    }
  };
};
