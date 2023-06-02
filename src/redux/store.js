import { configureStore } from "@reduxjs/toolkit";
import users from "./userSlice";
import productReducer from "./productSlice";
export const store = configureStore({
  reducer: {
    users: users,
    product: productReducer,
  },
});
