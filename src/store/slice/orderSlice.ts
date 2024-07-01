// src/features/orderSlice.js
import { createSlice } from '@reduxjs/toolkit';

interface Order {
    _id: string;
    orderStatus: string;
}

const orderSlice = createSlice({
    name: 'orders',
    initialState: {
        data: [] as Order[],
        filteredData: [] as Order[],
        searchQuery: '',
        filterStatus: false,
        queryParams: {
            paymentMethod: '',
            isPaid: '',
            orderStatus: '',
            page: 1,
            limit: 10,
        },
    },
    reducers: {
        setOrders: (state, action) => {
            state.data = action.payload;
            state.filteredData = action.payload;
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
        filterOrders: (state, action) => {
            if (!action.payload.trim()) {
                state.filteredData = [...state.data];
            } else {
                state.filteredData = state.data.filter((order) => order._id.includes(action.payload));
            }
        },
    },
});

export const { setOrders, setFilteredData, setSearchQuery, setFilterStatus, filterOrders } = orderSlice.actions;
const orderReducer = orderSlice.reducer;
export default orderReducer;
