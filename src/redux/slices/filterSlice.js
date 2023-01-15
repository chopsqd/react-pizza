import { createSlice } from '@reduxjs/toolkit'

// Изначальное состояние
const initialState = {
    value: 0,
}

// Создаем slice / логика обработки состояния
export const filterSlice = createSlice({
    // Название слайса
    name: 'filter',
    // initialState: initialState ( const initialState = { ... } )
    initialState,
    // Методы изменения состояния
    reducers: {

    },
})

// Action creators are generated for each case reducer function
export const { } = filterSlice.actions

// filterSlice.reducer отвечает за изменение состояния
export default filterSlice.reducer