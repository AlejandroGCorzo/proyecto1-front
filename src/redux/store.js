import { configureStore } from "@reduxjs/toolkit";
import users from "./userSlice";
import products from "./productSlice";
import categories from "./categoriesSlice";
import cart from "./shopingCartSlice";
import wishList from "./wishListSlice";
import ordersReducer from "./ordersSlice";
import clientReducer from "./clientSlice";

export const store = configureStore({
  reducer: {
    users: users,
    products: products,
    categories: categories,
    cart: cart,
    wishlist: wishList,
    orders: ordersReducer,
    client: clientReducer,
  },
});
