import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../config/routes.config";
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
  onFetchError:"",
};

export const fetchProducts = createAsyncThunk("fetchProducts", async () => {
  try {
      const res = await axios.get(`${baseUrl}/products`)
      return res.data;
    } catch (error) {
      initialState.onFetchError = error;
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
        state.onFetchError = "Oops! Something went wrong. Please try again later.";
      });
  },
});

export default productSlice.reducer;