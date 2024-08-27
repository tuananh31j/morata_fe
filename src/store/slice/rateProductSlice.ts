import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    orderId: '',
    isOpen: false,
    productId: '',
    productVariationId: '',
};

const rateProductSlice = createSlice({
    name: 'rateProduct',
    initialState,
    reducers: {
        setReviewData: (
            state,
            action: PayloadAction<{ orderId: string; isOpen: boolean; productId?: string; productVariationId?: string }>
        ) => {
            state.orderId = action.payload.orderId;
            state.isOpen = action.payload.isOpen;
            state.productId = action.payload.productId || '';
            state.productVariationId = action.payload.productVariationId || '';
        },
    },
});
export const { setReviewData } = rateProductSlice.actions;
export default rateProductSlice.reducer;
