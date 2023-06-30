import { configureStore } from "@reduxjs/toolkit";
import users from "./userSlice";
import products from "./productSlice";
import categories from "./categoriesSlice";
import cart from "./shopingCartSlice";

export const store = configureStore({
  reducer: {
    users: users,
    products: products,
    categories: categories,
    cart: cart,
  },
});
