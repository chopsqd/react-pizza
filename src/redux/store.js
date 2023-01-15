import { configureStore } from '@reduxjs/toolkit'
import {filterSlice} from "./slices/filterSlice";

// Создали хранилище
export const store = configureStore({
    reducer: {
        filter: filterSlice
    },
})