import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import theme from '~/store/slice/themeSlice';

const store = configureStore({
    reducer: { theme },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
