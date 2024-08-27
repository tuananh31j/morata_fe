import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IUser } from '~/utils/api/apiHelper';

// type IPayloadLogin = {
//     _id: string;
//     name: string;
//     email: string;
// };
const userStoraged = localStorage.getItem('user');
const initialState: { user: IUser | null } = { user: userStoraged ? JSON.parse(userStoraged) : null };
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        },
    },
});

const authReducer = authSlice.reducer;
export const { login, logout } = authSlice.actions;
export default authReducer;
