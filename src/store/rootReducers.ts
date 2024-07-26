import { combineReducers } from '@reduxjs/toolkit';
import cartReducer from '~/store/slice/cartSlice';
import headerReducer from '~/store/slice/headerSlice';
import theme from '~/store/slice/themeSlice';
import authReducer from './slice/authSlice';
import filterSlice from './slice/filterSlice';
import orderReducer from '~/store/slice/orderSlice';

const rootReducer = combineReducers({
    theme,
    authReducer,
    cartReducer,
    headerReducer,
    orderReducer,
    filter: filterSlice.reducer,
});

export default rootReducer;
