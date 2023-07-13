import axios from "axios";
import {
  setLoading,
  setError,
  setOrdersAccepted,
  setOrdersCanceled,
  setOrdersPendings,
} from "./ordersSlice";
const url = import.meta.env.VITE_REACT_APP_API;

export const getOrdersAcceptedAction = (offset, status) => {
  return async function (dispatch) {
    try {
      dispatch(setLoading(true));
      const res = await axios.get(
        `${url}/orden?offset=${offset}&status=${status}`
      );
      dispatch(setOrdersAccepted(res.data));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setError(error.message));
    }
  };
};
export const getOrdersCanceledAction = (offset, status) => {
  return async function (dispatch) {
    try {
      dispatch(setLoading(true));
      const res = await axios.get(
        `${url}/orden?offset=${offset}&status=${status}`
      );
      dispatch(setOrdersCanceled(res.data));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setError(error.message));
    }
  };
};
export const getOrdersPendingAction = (offset, status) => {
  return async function (dispatch) {
    try {
      dispatch(setLoading(true));
      const res = await axios.get(
        `${url}/orden?offset=${offset}&status=${status}`
      );
      dispatch(setOrdersPendings(res.data));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setError(error.message));
    }
  };
};
