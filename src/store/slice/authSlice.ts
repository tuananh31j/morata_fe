import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IUser } from '~/utils/api/apiHelper';

// type IPayloadLogin = {
//     _id: string;
//     username: string;
//     email: string;
// };
const userStoraged = localStorage.getItem('user');
const initialState: { user: IUser | null } = { user: userStoraged ? JSON.parse(userStoraged) : null };
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
        },
    },
});

const authReducer = authSlice.reducer;
export const { setUser } = authSlice.actions;
export default authReducer;
