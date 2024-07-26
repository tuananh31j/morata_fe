import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Params } from '~/types/Api';

const initialState: { query: any } = { query: {} };
const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setQuery: (state, action: PayloadAction<Params>) => {
            state.query = action.payload;
        },
    },
});

export const { setQuery } = filterSlice.actions;
export default filterSlice;
