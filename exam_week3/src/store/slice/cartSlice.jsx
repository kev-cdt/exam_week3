import { createSlice } from "@reduxjs/toolkit";

const getCartFromLocalStorage = () => {
  try {
    const localStorageCart = localStorage.getItem('currentCart');

    if (localStorageCart === null) {
      return [];
    }

    return JSON.parse(localStorageCart);
  } catch (error) {
    console.error('Error retrieving cart from localStorage:', error);

    return [];
  }
};

const saveCart = (state) => {
  try {
    localStorage.setItem('currentCart', JSON.stringify(state));
  } catch (e) {
    console.warn("Could not save cart items to localStorage", e);
  }
};

const initialState = {
  cart: getCartFromLocalStorage(),
  itemsCounter: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const { id, title, price, category, description, image, quantity } =
        action.payload;
      const existingProduct = state.cart.find((product) => product.id === id);
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        state.cart.push({
          id,
          title,
          price,
          category,
          description,
          image,
          quantity,
        });
      }
    },
    updateProductQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.cart.find((product) => product.id === id);
      if (existingItem) {
        existingItem.quantity = quantity;
      }
      saveCart(state.cart)
    },
    deleteProduct: (state, action) => {
      const id = action.payload;
      state.cart = state.cart.filter((product) => product.id !== id);
      saveCart(state.cart)
    },
    deleteAllProduct: (state) => {
      state.cart = [];
      saveCart(state.cart)
    },
    totalItems: (state) => {
      state.itemsCounter = state.cart.reduce(
        (total, product) => (total = total + product.quantity),
        0
      );
      saveCart(state.cart)
    }
  },
});

export const {
  addProduct,
  updateProductQuantity,
  deleteProduct,
  deleteAllProduct,
  totalItems,
} = cartSlice.actions;
export default cartSlice.reducer;
