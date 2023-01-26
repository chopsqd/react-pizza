import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../store";

type SortType = {
    name: string
    sortProperty: 'rating' | 'title' | 'price'
}

export interface FilterSliceState {
    searchValue: string
    categoryId: number
    sort: SortType
    currentPage: number
    orderType: boolean
}

const initialState: FilterSliceState = {
    searchValue: '',
    categoryId: 0,
    sort: {
        name: 'популярности',
        sortProperty: 'rating'
    },
    currentPage: 1,
    orderType: true
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload
        },
        setCategoryId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload
        },
        setSort(state, action: PayloadAction<SortType>) {
            state.sort = action.payload
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload
        },
        setOrderType(state) {
            state.orderType = !state.orderType
        },
    },
})

export const selectFilter = (state: RootState) => state.filter

export const { setCategoryId, setSort, setCurrentPage, setOrderType, setSearchValue } = filterSlice.actions

export default filterSlice.reducer