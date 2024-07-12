import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IParams } from '~/types/Api';

export type IInitialState = {
    grid: string;
    queryParams: Partial<IParams>;
};

export type IParamsPayload = {
    key: keyof Pick<IParams, 'limit' | 'price' | 'brandId' | 'categoryId' | 'rating' | 'page' | 'sort'>;
    value: string;
};

export type IFilterPayload = {
    key: keyof Pick<IParams, 'limit' | 'price' | 'brandId' | 'categoryId' | 'rating'>;
    value: string;
};

const initialState: IInitialState = {
    grid: '',
    queryParams: {
        search: '',
        page: '1',
        limit: '8',
        sort: '',
        price: '',
        rating: '',
        brandId: '',
        categoryId: '',
    },
};

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        updateQueryParams: (state, action: PayloadAction<IParamsPayload>) => {
            const { key, value } = action.payload;
            state.queryParams[key] = value;
        },
        filterAttributes: (state, action: PayloadAction<IFilterPayload>) => {
            const { key, value } = action.payload;
            state.queryParams.page = '1';
            state.queryParams.sort = '';
            state.queryParams[key] = value;
        },
        updateGrid: (state, action: PayloadAction<string>) => {
            state.grid = action.payload;
        },
        resetFilter: (state) => {
            state.queryParams = initialState.queryParams;
        },
    },
});

export const { updateQueryParams, resetFilter, updateGrid, filterAttributes } = filterSlice.actions;
export default filterSlice;
