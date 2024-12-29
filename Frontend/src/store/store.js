import { configureStore } from '@reduxjs/toolkit';
import authSlice from './Slices/auth.slice.js';

const store = configureStore({
    reducer: {
        auth : authSlice,
    },
});

export default store;