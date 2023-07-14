import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  cupon: null,
  cupones: [],
  errorSearch: "",
  success: null,
  error: null,
};
const discountSlice = createSlice({
  name: "discount",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setCupones: (state, action) => {
      state.cupones = action.payload;
    },
    setCupon: (state, action) => {
      state.cupon = action.payload;
    },
    addCupon: (state, action) => {
      if (state?.cupones?.length) {
        state.cupones = [...state.cupones, action.payload];
      } else {
        state.cupones = [action.payload];
      }
    },
    updateCupon: (state, action) => {
      let filteredCupones = state.cupones.filter(
        (item) => item._id !== action.payload._id
      );

      state.cupones = [...filteredCupones, action.payload];
    },
    removeCupon: (state, action) => {
      let filteredCupones = state.cupones.filter(
        (item) => item._id !== action.payload._id
      );
      state.cupones = filteredCupones;
    },

    setSuccess: (state, action) => {
      state.success = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    searchCupones: (state, action) => {
      let filteredCupones = state.cupones.filter((item) =>
        item.nombre.toLowerCase().includes(action.payload.toLowerCase())
      );

      if (filteredCupones.length) {
        state.cupones = filteredCupones;
      } else {
        state.cupones = state.cupones;
        state.errorSearch = "Cupón no encontrado.";
      }
    },
    setErrorSearch: (state, action) => {
      state.errorSearch = action.payload;
    },
  },
});
export const {
  setLoading,
  setCupon,
  addCupon,
  updateCupon,
  removeCupon,
  setCupones,
  setSuccess,
  setError,
  setErrorSearch,
  searchCupones,
} = discountSlice.actions;

export default discountSlice.reducer;
