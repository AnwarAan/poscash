import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isSearch: false,
  quantity: 0,
}

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    toggleSearch: (state, action) => {
      if (!state.isSearch) {
        state.searchProducts = []
      }
      state.isSearch = action.payload
    },
    incrementQuantity: (state) => {
      state.quantity += 1
    },
    decrementQuantity: (state) => {
      if (state.quantity > 0) {
        state.quantity -= 1
      }
    },
  },
})

export const selectQuantity = (state) => state.product.quantity
export const { toggleSearch, incrementQuantity, decrementQuantity } =
  productSlice.actions
export default productSlice.reducer
