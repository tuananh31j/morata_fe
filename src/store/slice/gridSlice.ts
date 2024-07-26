import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: { grid: string } = { grid: '' };
const gridSlice = createSlice({
    name: 'grid',
    initialState,
    reducers: {
        setGrid: (state, action: PayloadAction<string>) => {
            state.grid = action.payload;
        },
    },
});

export const { setGrid } = gridSlice.actions;
export default gridSlice;
