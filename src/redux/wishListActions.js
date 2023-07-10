import {
  addProduct,
  clearWishlist,
  removeProduct,
  setLoading,
} from "./wishListSlice";

export const addProductToWishlist = (product) => {
  return function (dispatch) {
    dispatch(addProduct(product));
  };
};

export const removeProductFromWishlist = (values) => {
  return function (dispatch) {
    dispatch(setLoading(true));
    dispatch(removeProduct(values));
    setTimeout(() => dispatch(setLoading(false)), 500);
  };
};
export const clearWishlistAction = () => {
  return function (dispatch) {
    dispatch(clearWishlist());
  };
};
