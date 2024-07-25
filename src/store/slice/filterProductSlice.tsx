import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPagination } from '~/types/Api';
import { IProductParams } from '~/types/Product';

export const KEY_STATE_FILTER_PARAMS = 'queryParams';

export const initFilter = {
    search: null,
    categoryId: null,
};
const initialState: { queryParams: IProductParams; pagination: IPagination } = {
    [KEY_STATE_FILTER_PARAMS]: initFilter,
    pagination: { page: 1, limit: 10 },
};

const filterProductSlice = createSlice({
    name: 'filtersProduct',
    initialState,
    reducers: {
        updateFilterParams: (state, action: PayloadAction<{ filter: IProductParams; page: number }>) => {
            state.queryParams = action.payload.filter;
            state.pagination.page = action.payload.page;
        },
    },
});

export const { updateFilterParams } = filterProductSlice.actions;
export default filterProductSlice.reducer;
