import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ICheckoutCash } from '~/types/checkout/Checkout';

const detailStoraged = sessionStorage.getItem('orderDetail');
const initialState: { Detail: ICheckoutCash | null } = {
    Detail: detailStoraged ? JSON.parse(detailStoraged) : null,
};
const orderSlice = createSlice({
    name: 'orderDetal',
    initialState,
    reducers: {
        setOrder: (state, action: PayloadAction<{ Detail: ICheckoutCash }>) => {
            state.Detail = action.payload.Detail;
            sessionStorage.setItem('orderDetail', JSON.stringify(action.payload.Detail));
        },
        unSetOrder: (state, action: PayloadAction<{ Detail: ICheckoutCash }>) => {
            state.Detail = action.payload.Detail;
            sessionStorage.removeItem('orderDetail');
        },
    },
});
export const { setOrder, unSetOrder } = orderSlice.actions;
const orderReducer = orderSlice.reducer;
export default orderReducer;
