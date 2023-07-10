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
  userHaveCart: false,
  errorCart: "",
  successCart: "",
  errorCupon: "",
  successCupon: "",
  usuario: null,
  estadoDeCompra: null,
  nombreCupon: null,
  order: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setOrder: (state, action) => {
      state.order = action.payload;
    },
    addItem: (state, action) => {
      let newItem = action.payload;
      let existingItem;

      if (newItem.producto?.length) {
        existingItem = state.productos.find(
          (item) => item.producto === newItem.producto
        );
      }

      if (existingItem) {
        // Si el producto ya existe en el carrito, incrementa su cantidad
        existingItem.cantidad += newItem.cantidad;
      } else {
        // Si el producto no existe, agrégalo al carrito
        state.productos.push(newItem);
      }

      // Actualiza el valor total de la compra
      state.totalSinDescuento += newItem.precio * newItem.cantidad;

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
      const itemToRemove = state.productos.find(
        (item) => item.producto === itemId
      );

      if (itemToRemove) {
        // Reduce el valor total de la compra
        state.totalSinDescuento -= itemToRemove.precio * itemToRemove.cantidad;

        state.productos = state.productos.filter(
          (item) => item.producto !== itemToRemove.producto
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
      const { itemId, cantidad } = action.payload;
      const itemToUpdate = state.productos.find(
        (item) => item.producto === itemId
      );

      if (itemToUpdate) {
        // Actualiza la cantidad del producto y recalcula el valor total de la compra
        state.totalSinDescuento =
          state.totalSinDescuento -
          itemToUpdate.precio * itemToUpdate.cantidad +
          itemToUpdate.precio * cantidad;

        itemToUpdate.cantidad = cantidad;

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
    setErrorCart: (state, action) => {
      state.errorCart = action.payload;
    },
    setSuccessCart: (state, action) => {
      state.successCart = action.payload;
    },
    setUserHaveCart: (state, action) => {
      state.userHaveCart = action.payload;
    },
    setErrorCupon: (state, action) => {
      state.errorCupon = action.payload;
    },
    setSuccessCupon: (state, action) => {
      state.successCupon = action.payload;
    },
    clearCart: (state, action) => {
      localStorage.removeItem("cart");
      state.loading = false;
      state.productos = [];
      state.totalConDescuento = 0;
      state.totalSinDescuento = 0;
      state.tipoDePago = "MERCADOPAGO";
      state.envio = true;
      state.isFacturaA = false;
      state.cupon = null;
      state.errorCupon = "";
      state.successCupon = "";
    },
    clearOrder: (state, action) => {
      state.order = {};
    },
  },
});

export const {
  setLoading,
  setCupon,
  setErrorCupon,
  setSuccessCupon,
  setErrorCart,
  setSuccessCart,
  setUserHaveCart,
  setOrder,
  clearOrder,
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
