import { combineReducers } from '@reduxjs/toolkit';
import theme from '~/store/slice/themeSlice';
import authReducer from './slice/authSlice';
import cartReducer from '~/store/slice/cartSlice';
import filterSlice from './slice/filterSlice';
import headerReducer from '~/store/slice/headerSlice';
import DetailProduct from '~/store/slice/DetailProduct';
import orderReducer from '~/store/slice/orderSlice';

const rootReducer = combineReducers({
    theme,
    authReducer,
    cartReducer,
    filter: filterSlice.reducer,
    headerReducer,
    DetailProduct,
    orderReducer,
});

export default rootReducer;
