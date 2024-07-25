import { combineReducers } from '@reduxjs/toolkit';
import cartReducer from '~/store/slice/cartSlice';
import headerReducer from '~/store/slice/headerSlice';
import theme from '~/store/slice/themeSlice';
import authReducer from './slice/authSlice';
import filterProductSlice from './slice/filterProductSlice';
import filterSlice from './slice/filterSlice';
import filterSliceNew from './slice/filterSlice-new';

const rootReducer = combineReducers({
    theme,
    authReducer,
    cartReducer,
    filters: filterSlice.reducer,
    filtersNew: filterSliceNew.reducer,
    headerReducer,
    filterProduct: filterProductSlice,
});

export default rootReducer;
