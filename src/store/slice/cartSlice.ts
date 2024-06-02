import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartOpen: false,
};
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setOpen: (state) => {
            state.cartOpen = true;
        },
        setClose: (state) => {
            state.cartOpen = false;
        },
    },
});
export const { setClose, setOpen } = cartSlice.actions;
const cartReducer = cartSlice.reducer;
export default cartReducer;
