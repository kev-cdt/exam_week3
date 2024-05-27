import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import themeSlice from './slice/themeSlice';

const middlewareEnhancer = (getDefaultMiddleware) => getDefaultMiddleware().concat(logger);
const store = configureStore({
    reducer: {
        theme: themeSlice,
    },
middleware: middlewareEnhancer,

});

export default store