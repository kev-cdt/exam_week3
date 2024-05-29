import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
}




const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct: (state, action) => {
            const { id, title, price, category, description, image, quantity } = action.payload;
            const existingProduct = state.cart.find(product => product.id === id);
            // const productQuantity = state.cart.
            if (existingProduct) {
                existingProduct.quantity += quantity;
            } else {
                state.cart.push({ id, title, price, category, description, image, quantity });
            }
        },
    }
})

export const { addProduct } = cartSlice.actions;
export default cartSlice.reducer;