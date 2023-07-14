import axios from 'axios';
import { getClientsStart, getClientsSuccess, getClientsFailure } from './clientSlice';
const url = import.meta.env.VITE_REACT_APP_API;

export const getClientsAction = () => {
  return async (dispatch) => {
    try {
      dispatch(getClientsStart());

      
      const response = await axios.get(`${url}/cliente`);
      const data = response.data;

      dispatch(getClientsSuccess(data));
    } catch (error) {
      dispatch(getClientsFailure(error.message));
    }
  };
};
