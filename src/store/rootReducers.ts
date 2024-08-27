import { combineReducers } from '@reduxjs/toolkit';
import theme from '~/store/slice/themeSlice';
import authReducer from './slice/authSlice';
import cartReducer from '~/store/slice/cartSlice';
import filterSlice from './slice/filterSlice';
import headerReducer from '~/store/slice/headerSlice';
import detailProductReducer from '~/store/slice/DetailProduct';
import orderReducer from '~/store/slice/orderSlice';
import rateProductSlice from './slice/rateProductSlice';

const rootReducer = combineReducers({
    theme,
    authReducer,
    cartReducer,
    filter: filterSlice.reducer,
    headerReducer,
    detailProductReducer,
    order: orderReducer,
    rateProductSlice,
});

export default rootReducer;
