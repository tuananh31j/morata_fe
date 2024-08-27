import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IVariantItem } from '~/pages/Clients/ProductDetails/ProductDetails';

type IinitialState = {
    images: string | null;
    variant: IVariantItem | null;
};
const initialState: IinitialState = {
    images: null,
    variant: null,
};

const detailProduct = createSlice({
    name: 'detailProduct',
    initialState,
    reducers: {
        setImages: (state, action: PayloadAction<string>) => {
            state.images = action.payload;
        },
        unSetImages: (state) => {
            state.images = null;
        },
        updateVariant: (state, action: PayloadAction<IVariantItem>) => {
            state.variant = action.payload;
        },
    },
});

export const { setImages, updateVariant, unSetImages } = detailProduct.actions;
const detailProductReducer = detailProduct.reducer;
export default detailProductReducer;
