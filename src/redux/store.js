import { configureStore } from "@reduxjs/toolkit";
import users from "./userSlice";
import products from "./productSlice";
import categories from "./categoriesSlice";
export const store = configureStore({
  reducer: {
    users: users,
    products: products,
    categories: categories,
  },
});
