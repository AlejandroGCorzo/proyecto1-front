import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  userId: "",
  userRole: [],
  token: "",
  isLoggedIn: false,
  userError: "",
  loading: false,
  name: "",
  lastName: "",
  phone: "",
  image: "",
  dni: "",
  calle: "",
  numeroDeCalle: "",
  infoAdicional: "",
  codigoPostal: "",
  ciudad: "",
  provincia: "",
  pais: "",
  destinatario: "",
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
        state.calle = action.payload.user.calle || "";
        state.numeroDeCalle = action.payload.user.numeroDeCalle || "";
        state.infoAdicional = action.payload.user.infoAdicional || "";
        state.codigoPostal = action.payload.user.codigoPostal || "";
        state.ciudad = action.payload.user.ciudad || "";
        state.provincia = action.payload.user.provincia || "";
        state.pais = action.payload.user.pais || "";
        state.destinatario = action.payload.user.destinatario || "";
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
        state.calle = action.payload.calle || "";
        state.numeroDeCalle = action.payload.numeroDeCalle || "";
        state.infoAdicional = action.payload.infoAdicional || "";
        state.codigoPostal = action.payload.codigoPostal || "";
        state.ciudad = action.payload.ciudad || "";
        state.provincia = action.payload.provincia || "";
        state.pais = action.payload.pais || "";
        state.destinatario = action.payload.destinatario || "";
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
