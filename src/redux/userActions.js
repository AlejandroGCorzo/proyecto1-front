import axios from "axios";
import { logout, setUser, setUserError, setUserLoading } from "./userSlice";
const url = import.meta.env.VITE_REACT_APP_API;

//acciones de creacion de usuario
export const sendCodeAction = (email) => {
  return async function (dispatch) {
    try {
      const res = await axios.post(`${url}/user`, email);
    } catch (error) {
      if (error.response) {
        dispatch(setUserError(error.response.data?.message));
      } else {
        dispatch(setUserError(error.message));
      }
    }
  };
};
export const signUpAction = (values) => {
  return async function (dispatch) {
    try {
      dispatch(setUserLoading(true));
      const res = await axios.post(`${url}/user/register`, values);
      dispatch(setUser(res.data));
      dispatch(setUserLoading(false));
    } catch (error) {
      dispatch(setUserLoading(false));
      if (error.response) {
        dispatch(setUserError(error.response.data?.message));
      } else {
        dispatch(setUserError(error.message));
      }
    }
  };
};

//acciones de inicio de sesion
export const logInAction = (values) => {
  return async function (dispatch) {
    try {
      dispatch(setUserLoading(true));
      const res = await axios.post(`${url}/user/login`, values);
      dispatch(setUser(res.data));
      dispatch(setUserLoading(false));
    } catch (error) {
      dispatch(setUserLoading(false));
      if (error.response) {
        dispatch(setUserError(error.response.data?.message));
      } else {
        dispatch(setUserError(error.message));
      }
    }
  };
};

export const logInSetNewCodeAction = (email) => {
  return async function (dispatch) {
    try {
      const res = await axios.post(`${url}/user/newCode`, email);
    } catch (error) {
      if (error.response) {
        dispatch(setUserError(error.response.data?.message));
      } else {
        dispatch(setUserError(error.message));
      }
    }
  };
};
export const logInWithCodeAction = (code) => {
  return async function (dispatch) {
    try {
      dispatch(setUserLoading(true));
      const res = await axios.post(`${url}/user/loginWithCode`, code);
      dispatch(setUser(res.data));
      dispatch(setUserLoading(false));
    } catch (error) {
      dispatch(setUserLoading(false));
      if (error.response) {
        dispatch(setUserError(error.response.data?.message));
      } else {
        dispatch(setUserError(error.message));
      }
    }
  };
};

//acciones de cambio de contraseña
export const resetPasswordCodeAction = (values) => {
  return async function (dispatch) {
    try {
      const res = await axios.post(`${url}/user/newCode`, values);
    } catch (error) {
      if (error.response) {
        dispatch(setUserError(error.response.data?.message));
      } else {
        dispatch(setUserError(error.message));
      }
    }
  };
};
export const resetPasswordAction = (values) => {
  return async function (dispatch) {
    try {
      dispatch(setUserLoading(true));
      const res = await axios.patch(`${url}/user/changePassword`, values);
      dispatch(setUser(res.data));
      dispatch(setUserLoading(false));
    } catch (error) {
      dispatch(setUserLoading(false));
      if (error.response) {
        dispatch(setUserError(error.response.data?.message));
      } else {
        dispatch(setUserError(error.message));
      }
    }
  };
};

//accion de cerrar sesion
export const logOutAction = () => {
  return async function (dispatch) {
    try {
      dispatch(logout());
    } catch (error) {
      if (error.response) {
        dispatch(setUserError(error.response.data?.message));
      } else {
        dispatch(setUserError(error.message));
      }
    }
  };
};
