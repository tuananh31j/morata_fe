// src/features/orderSlice.js
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IOrderParams } from '~/types/Order';

interface Order {
    _id: string;
    orderStatus: string;
}

type IInitialState = {
    data: Order[];
    filteredData: Order[];
    searchQuery: string;
    filterStatus: boolean;
    queryParams: IOrderParams;
};

const initialState: IInitialState = {
    data: [] as Order[],
    filteredData: [] as Order[],
    searchQuery: '',
    filterStatus: false,
    queryParams: {
        paymentMethod: '',
        isPaid: '',
        orderStatus: '',
        page: '1',
        limit: '10',
        sort: '',
    },
};

type IFilterPayload = {
    key: keyof Omit<IOrderParams, 'page' | 'sort'>;
    value: string;
};

type IParamsPayload = {
    key: keyof IOrderParams;
    value: string;
};
const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        setOrders: (state, action) => {
            state.data = action.payload;
            state.filteredData = action.payload;
        },
        updateQueryParamsOrder: (state, action: PayloadAction<IParamsPayload>) => {
            const { key, value } = action.payload;
            state.queryParams[key] = value;
        },
        filterAttributesOrder: (state, action: PayloadAction<IFilterPayload>) => {
            const { key, value } = action.payload;
            state.queryParams.page = '1';
            state.queryParams.sort = '';
            state.queryParams[key] = value;
        },
        setFilteredData: (state, action) => {
            state.filteredData = action.payload;
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        setFilterStatus: (state, action) => {
            state.filterStatus = action.payload;
        },
    },
});

export const {
    setOrders,
    setFilteredData,
    setSearchQuery,
    setFilterStatus,
    updateQueryParamsOrder,
    filterAttributesOrder,
} = orderSlice.actions;
const orderReducer = orderSlice.reducer;
export default orderReducer;
