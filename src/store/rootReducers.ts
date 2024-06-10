import { combineReducers } from '@reduxjs/toolkit';
import theme from '~/store/slice/themeSlice';
import authReducer from './slice/authSlice';
import cartReducer from '~/store/slice/cartSlice';
import filterSlice from './slice/filterSlice';
import headerReducer from '~/store/slice/headerSlice';

const rootReducer = combineReducers({ theme, authReducer, cartReducer, filters: filterSlice.reducer, headerReducer });

export default rootReducer;
