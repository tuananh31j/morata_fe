import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IVariantItem } from '~/pages/Clients/ProductDetails/ProductDetails';

type IinitialState = {
    images: string[] | null;
    variant: IVariantItem | null;
    activeImage: string | null;
};
const initialState: IinitialState = {
    activeImage: null,
    images: null,
    variant: null,
};

const detailProduct = createSlice({
    name: 'detailProduct',
    initialState,
    reducers: {
        setImages: (state, action: PayloadAction<string[]>) => {
            state.images = action.payload;
        },
        updateVariant: (state, action: PayloadAction<IVariantItem>) => {
            state.variant = action.payload;
        },
    },
});

export const { setImages, updateVariant } = detailProduct.actions;
export default detailProduct.reducer;
