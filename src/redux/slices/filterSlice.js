import { createSlice } from '@reduxjs/toolkit'

const initialState = {
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
        setCategoryId(state, action) {
            state.categoryId = action.payload
        },
        setSort(state, action) {
            state.sort = action.payload
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload
        },
        setOrderType(state) {
            state.orderType = !state.orderType
        },
    },
})

export const { setCategoryId, setSort, setCurrentPage, setOrderType } = filterSlice.actions

export default filterSlice.reducer