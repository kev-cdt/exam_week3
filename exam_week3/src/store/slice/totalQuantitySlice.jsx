// import { useSelector } from "react-redux";

// const cartProducts = useSelector(cart);

// const totalProducts = () => {
//     let total = 0;
//     cartProducts.map(product => (total += product.quantity))
//     return total;
// }

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalProducts: [],
}

const totalProductsSlice = createSlice({
    name: 'totalProducts',
    initialState,
    reducers: {
        incrementProductQuantity: (state, action) => {
            const { id, title, price, category, description, image, quantity } = action.payload;
            const existingProduct = state.totalProducts.find(product => product.id === id);
            if (existingProduct) {
                existingProduct.quantity += quantity;
            } else {
                state.totalProducts.push({ id, title, price, category, description, image, quantity });
            }
        },
    }
})

export const { addProduct } = totalProductsSlice.actions;
export default totalProductsSlice.reducer;