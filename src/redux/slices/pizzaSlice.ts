import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import axios from "axios";
import {RootState} from "../store";
import {PizzaItemType} from "../../@types/pizza.types";
import {FilterSliceState} from "./filterSlice";

enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

interface PizzaSliceState {
    items: PizzaItemType[]
    status: Status
}

const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING
}

// createAsyncThunk<Возвращаемый тип, Тип аргументов>
export const fetchPizzas = createAsyncThunk<PizzaItemType[], FilterSliceState>(
    'pizza/fetchPizzas',
    async({categoryId, sort, currentPage, orderType, searchValue}) => {
        const {data} = await axios.get<PizzaItemType[]>(`https://63bbfb2fcf99234bfa6aa932.mockapi.io/items?limit=4&page=${currentPage}&${categoryId ? `category=${categoryId}` : ''}&sortBy=${sort.sortProperty}&order=${orderType ? 'desc' : 'asc'}${searchValue ? `&search=${searchValue}` : ''}`)
        return data
    }
)

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<PizzaItemType[]>) {
            state.items = action.payload
        },
    },
    extraReducers: (builder => {
        builder.addCase(fetchPizzas.pending, (state) => {
            state.status = Status.LOADING
            state.items = []
        })

        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload
            state.status = Status.SUCCESS
        })

        builder.addCase(fetchPizzas.rejected, (state) => {
            state.status = Status.ERROR
            state.items = []
        })
    })
})

export const selectPizzaData = (state: RootState) => state.pizza

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer