import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";

const initialState = {
    items: [],
    status: 'loading' // loading | success | error
}

export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzas',
    async({categoryId, sort, currentPage, orderType, searchValue}) => {
        const {data} = await axios.get(`https://63bbfb2fcf99234bfa6aa932.mockapi.io/items?limit=4&page=${currentPage}&${categoryId ? `category=${categoryId}` : ''}&sortBy=${sort.sortProperty}&order=${orderType ? 'desc' : 'asc'}${searchValue ? `&search=${searchValue}` : ''}`)
        return data
    }
)

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload
        },
    },
    extraReducers: {
        [fetchPizzas.pending]: (state) => {
            state.status = 'loading'
            state.items = []
        },
        [fetchPizzas.fulfilled]: (state, action) => {
            state.items = action.payload
            state.status = 'success'
        },
        [fetchPizzas.rejected]: (state) => {
            state.status = 'error'
            state.items = []
        },
    }
})

export const selectPizzaData = (state) => state.pizza

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer