import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../ui/utils/slices/authSlice'
import { apiSlice } from "../ui/utils/slices/apiSlice";

export const store = configureStore({

    reducer:{
        auth: authReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true
})

export default store;