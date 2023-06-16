import axios from "axios";
import {
  setErrorCategory,
  setSuccessCategory,
  setErrorSubCategory,
  setSuccessSubCategory,
  setLoading,
  addCategory,
  setCategory,
  updateCategory,
  deleteSubFromCategories,
  deleteCategory,
  addSubCategory,
  setSubCategory,
  updateSubCategory,
  deleteSubCategory,
  addSubToCategory,
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
//accion de agregar subcategorias
export const postSubToCategoryAction = (values, token) => {
  return async function (dispatch) {
    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        `${url}/categorias/addSubcategoria`,
        values /* {
        headers: {
          authorization: `Bearer ${token}`,
        },
        data: values,
      } */
      );

      dispatch(addSubToCategory(res.data));
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
//accion de edicion de categorias
export const patchCategoryAction = (values, token, id) => {
  return async function (dispatch) {
    try {
      dispatch(setLoading(true));
      const res = await axios.patch(`${url}/categorias/${id}`, values, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${token}`,
        },
      });
      dispatch(updateCategory(res.data));
      dispatch(setLoading(false));
      dispatch(setSuccessCategory("Categoría actualizada con exito."));
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
//accion para eliminar las categorias
export const deleteCategoriesAction = (id, token) => {
  return async function (dispatch) {
    try {
      dispatch(setLoading(true));
      const res = await axios.delete(`${url}/categorias/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      dispatch(deleteCategory(res.data));
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
//accion para eliminar las subcategorias de una categoria
export const deleteCategoriesSubCategoryAction = (values, token) => {
  return async function (dispatch) {
    try {
      dispatch(setLoading(true));
      const res = await axios.delete(
        `${url}/categorias/removeSubcategory`,

        {
          headers: {
            authorization: `Bearer ${token}`,
          },
          data: values,
        }
      );
      dispatch(deleteSubFromCategories(res.data));
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
        dispatch(setErrorSubCategory(error.response.data?.message));
      } else {
        dispatch(setErrorSubCategory(error.message));
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
      dispatch(setSuccessSubCategory("Subcategoría creada con exito."));
    } catch (error) {
      dispatch(setLoading(false));
      if (error.response) {
        dispatch(setErrorSubCategory(error.response.data?.message));
      } else {
        dispatch(setErrorSubCategory(error.message));
      }
    }
  };
};

//accion para eliminar las subcategorias
export const deleteSubCategoriesAction = (id, token) => {
  return async function (dispatch) {
    try {
      dispatch(setLoading(true));
      const res = await axios.delete(
        `${url}/categorias/sub/Subcategoria/${id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(deleteSubCategory(res.data));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      if (error.response) {
        dispatch(setErrorSubCategory(error.response.data?.message));
      } else {
        dispatch(setErrorSubCategory(error.message));
      }
    }
  };
};
