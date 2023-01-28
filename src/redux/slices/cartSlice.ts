import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../store";
import {CartItemType} from "../../@types/cart.types";
import {getCartFromLS} from "../../utils/getCartFromLS";
import {calcTotalPrice} from "../../utils/calcTotalPrice";

interface CartSliceState {
    items: CartItemType[]
    totalPrice: number
}

const {items, totalPrice} = getCartFromLS()

const initialState: CartSliceState = {
    items,
    totalPrice
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<CartItemType>) {
            const findItem = state.items.find(obj => obj.id === action.payload.id)

            if(findItem) {
                findItem.count++
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1
                })
            }

            state.totalPrice = calcTotalPrice(state.items)
        },
        minusItem(state, action: PayloadAction<number>) {
            const findItem = state.items.find(obj => obj.id === action.payload)

            if(findItem && findItem.count > 1) {
                findItem.count--
            }
        },
        removeItem(state, action: PayloadAction<number>) {
            state.items = state.items.filter(obj => obj.id === action.payload)
        },
        clearItems(state) {
            state.items = []
            state.totalPrice = 0
        },
    },
})

// Селекторы
export const selectCart = (state: RootState) => state.cart
export const selectCartItemById = (id: number) => (state: RootState) => state.cart.items.find(obj => obj.id === id)

export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions

export default cartSlice.reducer