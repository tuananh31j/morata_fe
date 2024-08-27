import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
    searchValue: '',
    forcusSearch: false,
    categoryId: {
        id: '',
        name: 'All Categories',
    },
};
const headerSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setSearchValue: (state, action: PayloadAction<string>) => {
            state.searchValue = action.payload;
        },
        setFocusSearch: (state, action: PayloadAction<boolean>) => {
            state.forcusSearch = action.payload;
        },
        setCategoryId: (state, action: PayloadAction<{ id: string; name: string }>) => {
            state.categoryId.id = action.payload.id;
            state.categoryId.name = action.payload.name;
        },
    },
});
export const { setSearchValue, setFocusSearch, setCategoryId } = headerSlice.actions;
const headerReducer = headerSlice.reducer;
export default headerReducer;
