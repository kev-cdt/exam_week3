import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// const initialProduct = {
//     id:1,
//     title:'',
//     price:'',
//     category:'',
//     description:'',
//     image:''
// }

export const fetchProducts = createAsyncThunk(
    'fetchArticles',
    async () => {
        const res = await axios.get('https://fakestoreapi.com/products')
        return res.data
    }
)

const productSlice = createSlice({
    name: 'task',
    initialState: {
    products: [],
    product: {
        id:1,
        title:'',
        price:'',
        category:'',
        description:'',
        image:''
    },
    loading: 'idle', // 'idle' | 'loading' | 'error'
    userIds : []
    },
    // reducers: {
    // setTaskValue(state, action) {
    //     state.task[action.payload.name] = action.payload.value
    // },
    // toggleCompleted(state, action) {
    //     state.tasks.forEach(task => {
    //     if (task.id === action.payload) {
    //         task.completed = !task.completed
    //     }
    //     })
    // }
    // },
    extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state, action) => {
        state.loading = 'loading'
    })
    .addCase(fetchProducts.fulfilled, (state, action) => {
        console.log(action.payload)
        state.products = action.payload
        state.loading = 'idle'
        state.userIds = action.payload.reduce((acc, current) => {
        if (!acc.includes(current.userId)) {
            acc.push(current.userId)
        }
        return acc
        }, [])
    })
    .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = "error"
    })
    }
})

export default productSlice.reducer