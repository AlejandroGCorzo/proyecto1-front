import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // Array de productos en el carrito
  totalItems: 0, // Total de productos en el carrito
  totalPrice: 0, // Valor total de la compra
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) =>
          item.product._id === newItem.product._id && item.size === newItem.size
      );

      if (existingItem) {
        // Si el producto ya existe en el carrito, incrementa su cantidad
        existingItem.quantity += newItem.quantity;
      } else {
        // Si el producto no existe, agrégalo al carrito
        state.items.push(newItem);
      }

      // Actualiza el total de productos y el valor total de la compra
      state.totalItems += newItem.quantity;
      state.totalPrice += newItem.product.precio * newItem.quantity;

      localStorage.setItem(
        "cart",
        JSON.stringify({
          items: state.items,
          totalPrice: state.totalPrice,
          totalItems: state.totalItems,
        })
      );
    },
    removeItem: (state, action) => {
      const itemId = action.payload.id;
      const itemSize = action.payload.size;
      const itemToRemove = state.items.find(
        (item) => item.size === itemSize && item.product._id === itemId
      );

      if (itemToRemove?.product) {
        // Reduce la cantidad del producto y actualiza el total de productos y el valor total de la compra
        state.totalItems -= itemToRemove.quantity;
        state.totalPrice -= itemToRemove.product.precio * itemToRemove.quantity;

        state.items = state.items.filter(
          (item) => item.size !== itemToRemove.size
        );

        localStorage.setItem(
          "cart",
          JSON.stringify({
            items: state.items,
            totalPrice: state.totalPrice,
            totalItems: state.totalItems,
          })
        );
      }
    },
    updateQuantity: (state, action) => {
      const { itemId, quantity } = action.payload;
      const itemToUpdate = state.items.find(
        (item) => item.product._id === itemId
      );

      /* if (itemToUpdate?.product) {
        // Actualiza la cantidad del producto y recalcula el valor total de la compra
        state.totalItems = state.totalItems - itemToUpdate.quantity + quantity;
        state.totalPrice =
          state.totalPrice -
          itemToUpdate.product.precio * itemToUpdate.quantity +
          itemToUpdate.product.precio * quantity;

        itemToUpdate.quantity = quantity;


      } */
    },
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
