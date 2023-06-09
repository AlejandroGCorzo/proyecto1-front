import axios from "axios";
import {
  addCategory,
  setErrorCategory,
  setSuccessCategory,
  setLoading,
  setCategory,
  addSubCategory,
  setSubCategory,
} from "./categoriesSlice";
const url = import.meta.env.VITE_REACT_APP_API;

//accion para obtener las categorias
export const getCategoriesAction = () => {
  return async function (dispatch) {
    try {
      dispatch(setLoading(true));
      const res = await axios.get(`${url}/categorias`);
      dispatch(setCategory(res.data));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      if (error.response) {
        dispatch(setErrorCategory(error.response.data?.message));
      } else {
        dispatch(setErrorCategory(error.message));
      }
    }
  };
};
//accion de creacion de categorias
export const postCategoryAction = (values, token) => {
  return async function (dispatch) {
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${url}/categorias`, values, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${token}`,
        },
      });
      dispatch(addCategory(res.data));
      dispatch(setLoading(false));
      dispatch(setSuccessCategory("Categoría creada con exito."));
    } catch (error) {
      dispatch(setLoading(false));
      if (error.response) {
        dispatch(setErrorCategory(error.response.data?.message));
      } else {
        dispatch(setErrorCategory(error.message));
      }
    }
  };
};

//accion para obtener las subcategorias
export const getSubCategoriesAction = () => {
  return async function (dispatch) {
    try {
      dispatch(setLoading(true));
      const res = await axios.get(`${url}/categorias/sub/subcategoria`);
      dispatch(setSubCategory(res.data));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      if (error.response) {
        dispatch(setErrorCategory(error.response.data?.message));
      } else {
        dispatch(setErrorCategory(error.message));
      }
    }
  };
};

//accion de creacion de subcategorias
export const postSubCategoryAction = (values, token) => {
  return async function (dispatch) {
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${url}/categorias/subcategoria`, values, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${token}`,
        },
      });
      dispatch(addSubCategory(res.data));
      dispatch(setLoading(false));
      dispatch(setSuccessCategory("Subcategoría creada con exito."));
    } catch (error) {
      dispatch(setLoading(false));
      if (error.response) {
        dispatch(setErrorCategory(error.response.data?.message));
      } else {
        dispatch(setErrorCategory(error.message));
      }
    }
  };
};
