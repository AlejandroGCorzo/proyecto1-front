import { createSlice } from "@reduxjs/toolkit";

const clientSlice = createSlice({
  name: "client",
  initialState: {
    clients: [],
    loading: false,
    error: null,
  },
  reducers: {
    getClientsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getClientsSuccess: (state, action) => {
      state.loading = false;
      state.clients = action.payload;
    },
    getClientsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { getClientsStart, getClientsSuccess, getClientsFailure } =
  clientSlice.actions;

export default clientSlice.reducer;
