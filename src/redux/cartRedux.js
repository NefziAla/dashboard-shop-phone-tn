import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    carts: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getCartStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getCartSuccess: (state, action) => {
      state.isFetching = false;
      state.carts = action.payload;
    },
    getCartFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    deleteCartStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteCartSuccess: (state, action) => {
      state.isFetching = false;
      state.carts.splice(
        state.carts.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteCartFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getCartStart,
  getCartSuccess,
  getCartFailure,
  deleteCartStart,
  deleteCartSuccess,
  deleteCartFailure,
} = cartSlice.actions;

export default cartSlice.reducer;