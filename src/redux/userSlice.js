import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  userId: "",
  userRole: [],
  token: "",
  isLoggedIn: false,
  name: "",
  lastName: "",
  phone: "",
  image: "",
  dni: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      if (action.payload.user) {
        state.email = action.payload.user.email;
        state.userId = action.payload.user._id;
        state.userRole = action.payload.user.role;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.name = action.payload.user.name || "";
        state.lastName = action.payload.user.lastName || ""; 
        state.phone = action.payload.user.phone || ""; 
        state.image = action.payload.user.image || ""; 
        state.dni = action.payload.user.dni || ""; 
      } else {
        state.email = action.payload.email;
        state.userId = action.payload._id;
        state.userRole = action.payload.role;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.name = action.payload.name || ""; 
        state.lastName = action.payload.lastName || ""; 
        state.phone = action.payload.phone || ""; 
        state.image = action.payload.image || ""; 
        state.dni = action.payload.dni || "";
      }
      localStorage.setItem("token", action.payload.token);
    },

    logout: (state) => {
      state.isLoggedIn = false;
      state.userId = "";
      state.userRole = "";
      state.email = "";
      state.token = "";
      localStorage.removeItem("token");
    },
  },
});

export const { setUser, setPassword, setCode, login, logout } =
  userSlice.actions;

export default userSlice.reducer;
