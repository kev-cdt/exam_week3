import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  product: {
    id: 1,
    title: "",
    price: "",
    category: "",
    description: "",
    image: "",
  },
  fecthErrors: "",
};

export const fetchProducts = createAsyncThunk("fetchProducts", async () => {
  try {
      const res = await axios.get("https://fakestoreapi.com/products")
      return res.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      // window.alert('Oops! Something went wrong. Please try again later.', error)
      initialState.fecthErrors = error; // Re-throw the error to propagate it further
    }
})

const productSlice = createSlice({
  name: "product",
  initialState,
  loading: "idle",
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loadingState = "pending";
        state.products = [];
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loadingState = "loaded";
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loadingState = "error";
        state.products = [];
        state.fecthErrors = "Oops! Something went wrong. Please try again later.";
      });
  },
});

export default productSlice.reducer;