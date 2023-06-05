import axios from "axios";
import { logout, setUser } from "./userSlice";
const url = import.meta.env.VITE_REACT_APP_API;

//acciones de creacion de usuario
export const sendCodeAction = (email) => {
  return async function (dispatch) {
    try {
      const res = await axios.post(`${url}/user`, email);
    } catch (error) {
      console.log(error);
    }
  };
};
export const signUpAction = (values) => {
  return async function (dispatch) {
    try {
      const res = await axios.post(`${url}/user/register`, values);
      dispatch(setUser(res.data));
    } catch (error) {
      console.log(error);
    }
  };
};

//acciones de inicio de sesion
export const logInAction = (values) => {
  return async function (dispatch) {
    try {
      const res = await axios.post(`${url}/user/login`, values);
      dispatch(setUser(res.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const logInSetNewCodeAction = (email) => {
  return async function (dispatch) {
    try {
      const res = await axios.post(`${url}/user/newCode`, email);
    } catch (error) {
      console.log(error);
    }
  };
};
export const logInWithCodeAction = (code) => {
  return async function (dispatch) {
    try {
      const res = await axios.post(`${url}/user/loginWithCode`, Number(code));
      dispatch(setUser(res.data));
    } catch (error) {
      console.log(error);
    }
  };
};

//acciones de cambio de contraseña
export const resetPasswordCodeAction = (values) => {
  return async function (dispatch) {
    try {
      const res = await axios.post(`${url}/user/newCode`, values);
    } catch (error) {
      console.log(error);
    }
  };
};
export const resetPasswordAction = (values) => {
  return async function (dispatch) {
    try {
      const res = await axios.patch(`${url}/user/changePassword`, values);
      dispatch(setUser(res.data));
    } catch (error) {
      console.log();
    }
  };
};

//accion de cerrar sesion
export const logOutAction = () => {
  return async function (dispatch) {
    try {
      dispatch(logout());
    } catch (error) {
      console.log(error);
    }
  };
};
