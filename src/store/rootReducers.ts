import { combineReducers } from '@reduxjs/toolkit';
import theme from '~/store/slice/themeSlice';
import authReducer from './slice/authSlice';
import cartReducer from '~/store/slice/cartSlice';
import filterSlice from './slice/filterSlice';
import headerReducer from '~/store/slice/headerSlice';
import AdminTableFilterProduct from './slice/AdminfilterProduct';
import filterSliceNew from './slice/filterSlice-new';
import DetailProduct from '~/store/slice/DetailProduct';
import orderReducer from '~/store/slice/orderSlice';

const rootReducer = combineReducers({
    theme,
    authReducer,
    cartReducer,
    filters: filterSlice.reducer,
    filtersNew: filterSliceNew.reducer,
    headerReducer,
    DetailProduct,
    orderReducer,
    AdminTableFilterProduct,
});

export default rootReducer;
