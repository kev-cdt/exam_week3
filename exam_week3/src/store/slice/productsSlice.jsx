import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    products: [],
    product: {
        id:1,
        title:'',
        price:'',
        category:'',
        description:'',
        image:''
    }
}

export const fetchProducts = createAsyncThunk(
    'fetchProducts',
    async () => {
        const res = await axios.get('https://fakestoreapi.com/products')
        return res.data
    }
)

const productSlice = createSlice({
    name: 'product',
    initialState,
    // reducers: {},
    loading: 'idle', // 'idle' | 'loading' | 'error'
    extraReducers: (builder) => {
        builder
        .addCase(fetchProducts.pending, (state, action) => {
            state.loadingState = 'pending'
            state.products = []
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
            state.products = action.payload
            state.loadingState = "loaded"
        })
        .addCase(fetchProducts.rejected, (state, action) => {
            state.loadingState = "error"
            state.products = []
        })
        }
    },
)

export default productSlice.reducer