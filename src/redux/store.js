import { configureStore } from "@reduxjs/toolkit";
import users from "./userSlice";
import products from "./productSlice";
export const store = configureStore({
  reducer: {
    users: users,
    products: products,
  },
});
