import axios from "axios";
import { setLoading, setOrders, setError } from "./ordersSlice";
const url = import.meta.env.VITE_REACT_APP_API;



export const getOrdersAction = (offset) => {
    return async function (dispatch) {
      try {
        dispatch(setLoading(true));
        const res = await axios.get(`${url}/orden?offset=${offset}`);
        dispatch(setOrders(res.data.orders));
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setLoading(false));
        dispatch(setError(error.message));
      }
    };
  };
  
  