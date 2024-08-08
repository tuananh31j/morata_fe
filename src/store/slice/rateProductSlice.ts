import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    orderId: '',
    isOpen: false,
};

const rateProductSlice = createSlice({
    name: 'rateProduct',
    initialState,
    reducers: {
        setReviewData: (state, action: PayloadAction<{ orderId: string; isOpen: boolean }>) => {
            state.orderId = action.payload.orderId;
            state.isOpen = action.payload.isOpen;
        },
    },
});
export const { setReviewData } = rateProductSlice.actions;
export default rateProductSlice.reducer;
