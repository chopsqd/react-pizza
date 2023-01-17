import { createSlice } from '@reduxjs/toolkit'

// Изначальное состояние
const initialState = {
    categoryId: 0,
    sort: {
        name: 'популярности',
        sortProperty: 'rating'
    }
}

// Создаем slice / логика обработки состояния
export const filterSlice = createSlice({
    // Название слайса
    name: 'filter',
    // initialState: initialState ( const initialState = { ... } )
    initialState,
    // Методы (Actions) изменения состояния
    reducers: {
        setCategoryId(state, action) {
            state.categoryId = action.payload
        },
        setSort(state, action) {
            state.sort = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setCategoryId, setSort } = filterSlice.actions

// filterSlice.reducer отвечает за изменение состояния
export default filterSlice.reducer