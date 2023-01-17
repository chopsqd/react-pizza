import {configureStore} from '@reduxjs/toolkit'
import filter from "./slices/filterSlice";

// Создали хранилище
export const store = configureStore({
    reducer: {
        filter
    },
})