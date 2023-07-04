import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  userId: "",
  userRole: [],
  token: "",
  isLoggedIn: false,
  userError: "",
  loading: false,
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
      } else {
        state.email = action.payload.email;
        state.userId = action.payload._id;
        state.userRole = action.payload.role;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      }
      localStorage.setItem("token", action.payload.token);
    },
    setUserError: (state, action) => {
      state.userError = action.payload;
    },
    setUserLoading: (state, action) => {
      state.loading = action.payload;
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

export const { setUser, setUserError, setUserLoading, logout } =
  userSlice.actions;

export default userSlice.reducer;
