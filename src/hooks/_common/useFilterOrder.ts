import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import { resetFilter } from '~/store/slice/filterSlice';
import { filterAttributesOrder, updateQueryParamsOrder } from '~/store/slice/orderSlice';
import { useTypedSelector } from '~/store/store';
import { IOrderParams } from '~/types/Order';

const useFilterOrder = () => {
    const { pathname } = useLocation();
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const navigator = useNavigate();

    const { queryParams } = useTypedSelector((state) => state.orderReducer);

    useEffect(() => {
        searchParams?.forEach((value, key) => {
            dispatch(updateQueryParamsOrder({ key: key as keyof IOrderParams, value }));
        });
    }, []);

    const updateQueryParam = (key: keyof IOrderParams, value: string) => {
        const newParams = new URLSearchParams(searchParams?.toString());
        newParams.set(key, value);

        navigator(`${pathname}?${newParams.toString()}`);

        dispatch(updateQueryParamsOrder({ key, value }));
    };

    const updateFilterAttribute = (key: keyof Omit<IOrderParams, 'page' | 'sort'>, value: string) => {
        const newParams = new URLSearchParams(searchParams?.toString());
        newParams.delete('page');
        newParams.delete('sort');
        if (value) newParams.set(key, String(value));
        else newParams.delete(key);

        navigator(`${pathname}?${newParams.toString()}`);

        dispatch(filterAttributesOrder({ key, value }));
    };
    const resetQueryParams = () => {
        if (pathname) {
            dispatch(resetFilter());
            navigator(pathname);
        }
    };

    return {
        queryParams,
        updateFilterAttribute,
        updateQueryParam,
        resetQueryParams,
    };
};

export default useFilterOrder;
