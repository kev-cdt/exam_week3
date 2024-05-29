import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
    itemsCounter: 0,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct: (state, action) => {
            const { id, title, price, category, description, image, quantity } = action.payload;
            const existingProduct = state.cart.find(product => product.id === id);
            if (existingProduct) {
                existingProduct.quantity += quantity;
            } else {
                state.cart.push({ id, title, price, category, description, image, quantity });
            }
        },
        updateProductQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const existingItem = state.cart.find(product => product.id === id);
            if (existingItem) {
            existingItem.quantity = quantity;
            }
        },
        deleteProduct: (state, action) => {
            const id = action.payload;
            state.cart = state.cart.filter(product => product.id !== id);
        },
        deleteAllProduct: (state, action) => {
            state.cart = initialState.cart;
        },
        totalItems: (state, action) => {
            state.itemsCounter = state.cart.reduce((total, product) => total = total + product.quantity , 0);
        },
    }
})

export const { addProduct, updateProductQuantity, deleteProduct, deleteAllProduct, totalItems } = cartSlice.actions;
export default cartSlice.reducer;