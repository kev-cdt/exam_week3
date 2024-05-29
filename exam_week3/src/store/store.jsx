import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import themeSlice from './slice/themeSlice';
import productsSlice from './slice/productsSlice';
import userProfileSlice from './slice/userProfileSlice';
import cartSlice from './slice/cartSlice';
import totalProductsSlice from './slice/totalProductsSlice';

const middlewareEnhancer = (getDefaultMiddleware) => getDefaultMiddleware().concat(logger);
const store = configureStore({
    reducer: {
        theme: themeSlice,
        products: productsSlice,
        user: userProfileSlice,
        cart: cartSlice,
        totalProducts: totalProductsSlice,
    },
middleware: middlewareEnhancer,

});

export default store