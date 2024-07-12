import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPagination } from '~/types/Api';
import { IOrderParams } from '~/types/Order';

export const KEY_STATE_FILTER_PARAMS = 'queryParams';

export const initFilter = {
    orderStatus: null,
    isPaid: null,
    paymentMethod: null,
};
const initialState: { queryParams: IOrderParams; pagination: IPagination } = {
    [KEY_STATE_FILTER_PARAMS]: initFilter,
    pagination: { page: 1, limit: 10 },
};

const filterSliceNew = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        updateFilterParams: (state, action: PayloadAction<{ filter: IOrderParams; page: number }>) => {
            state.queryParams = action.payload.filter;
            state.pagination.page = action.payload.page;
        },
    },
});

export const { updateFilterParams } = filterSliceNew.actions;
export default filterSliceNew;
