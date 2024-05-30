// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   totalProducts: [],
// };

// const totalProductsSlice = createSlice({
//   name: "totalProducts",
//   initialState,
//   reducers: {
//     incrementProductQuantity: (state, action) => {
//       const { id, title, price, category, description, image, quantity } =
//         action.payload;
//       const existingProduct = state.totalProducts.find(
//         (product) => product.id === id
//       );
//       if (existingProduct) {
//         existingProduct.quantity += quantity;
//       } else {
//         state.totalProducts.push({
//           id,
//           title,
//           price,
//           category,
//           description,
//           image,
//           quantity,
//         });
//       }
//     },
//   },
// });

// export const { incrementProductQuantity } = totalProductsSlice.actions;
// export default totalProductsSlice.reducer;