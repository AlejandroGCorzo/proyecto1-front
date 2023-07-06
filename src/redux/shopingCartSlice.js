import { createSlice } from "@reduxjs/toolkit";

let getStorage = JSON.parse(localStorage.getItem("cart"));

const initialState = {
  loading: false,
  productos:
    getStorage?.productos && getStorage.productos?.length > 0
      ? getStorage.productos
      : [], // Array de productos en el carrito
  totalSinDescuento:
    getStorage?.totalSinDescuento && getStorage?.totalSinDescuento > 0
      ? getStorage?.totalSinDescuento
      : 0, // Valor total de la compra
  totalConDescuento: 0,
  tipoDePago:
    getStorage?.tipoDePago && getStorage.tipoDePago.length
      ? getStorage.tipoDePago
      : "MERCADOPAGO",
  envio: getStorage?.envio && getStorage.envio > 0 ? getStorage.envio : true,
  isFacturaA:
    getStorage?.isFacturaA && getStorage.isFacturaA > 0
      ? getStorage.isFacturaA
      : false,
  cupon: null,
  errorCupon: "",
  successCupon: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    addItem: (state, action) => {
      let newItem = action.payload;
      let existingItem;

      if (newItem.id?.length) {
        existingItem = state.productos.find((item) => item.id === newItem.id);
      }

      if (existingItem) {
        // Si el producto ya existe en el carrito, incrementa su cantidad
        existingItem.quantity += newItem.quantity;
      } else {
        // Si el producto no existe, agrégalo al carrito
        state.productos.push(newItem);
      }

      // Actualiza el valor total de la compra
      state.totalSinDescuento += newItem.precio * newItem.quantity;

      localStorage.setItem(
        "cart",
        JSON.stringify({
          productos: state.productos,
          totalSinDescuento: state.totalSinDescuento,
          totalConDescuento: 0,
          tipoDePago: "MERCADOPAGO",
          envio: true,
          isFacturaA: false,
        })
      );
    },
    removeItem: (state, action) => {
      const itemId = action.payload.id;
      const itemToRemove = state.productos.find((item) => item.id === itemId);

      if (itemToRemove) {
        // Reduce el valor total de la compra
        state.totalSinDescuento -= itemToRemove.precio * itemToRemove.quantity;

        state.productos = state.productos.filter(
          (item) => item.id !== itemToRemove.id
        );

        localStorage.setItem(
          "cart",
          JSON.stringify({
            productos: state.productos,
            totalSinDescuento: state.totalSinDescuento,
            totalConDescuento: 0,
            tipoDePago: "MERCADOPAGO",
            envio: true,
            isFacturaA: false,
          })
        );
      }
    },
    updateQuantity: (state, action) => {
      const { itemId, quantity } = action.payload;
      const itemToUpdate = state.productos.find((item) => item.id === itemId);

      if (itemToUpdate) {
        // Actualiza la cantidad del producto y recalcula el valor total de la compra
        state.totalSinDescuento =
          state.totalSinDescuento -
          itemToUpdate.precio * itemToUpdate.quantity +
          itemToUpdate.precio * quantity;

        itemToUpdate.quantity = quantity;

        localStorage.setItem(
          "cart",
          JSON.stringify({
            productos: state.productos,
            totalSinDescuento: state.totalSinDescuento,
            totalConDescuento: 0,
            tipoDePago: "MERCADOPAGO",
            envio: true,
            isFacturaA: false,
          })
        );
      }
    },
    setCupon: (state, action) => {
      state.cupon = action.payload;
    },
    setErrorCupon: (state, action) => {
      state.errorCupon = action.payload;
    },
    setSuccessCupon: (state, action) => {
      state.successCupon = action.payload;
    },
    clearCart: (state, action) => {
      state = initialState;
    },
  },
});

export const {
  setLoading,
  setCupon,
  setErrorCupon,
  setSuccessCupon,
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
