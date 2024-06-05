import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import { filterAttributes, resetFilter, updateGrid, updateQueryParams } from '~/store/slice/filterSlice';
import { useTypedSelector } from '~/store/store';
import { IParams } from '~/types/Api';

export const useFilters = () => {
    const { pathname } = useLocation();
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const navigator = useNavigate();

    const { queryParams, grid } = useTypedSelector((state) => state.filters);

    useEffect(() => {
        searchParams?.forEach((value, key) => {
            dispatch(updateQueryParams({ key: key as keyof IParams, value }));
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const updateQueryParam = (key: keyof IParams, value: string) => {
        const newParams = new URLSearchParams(searchParams?.toString());

        if (value) newParams.set(key, String(value));
        else newParams.delete(key);

        navigator(`${pathname}?${newParams.toString()}`);

        dispatch(updateQueryParams({ key, value }));
    };
    const updateFilterAttribute = (key: keyof Omit<IParams, 'page' | 'sort'>, value: string) => {
        const newParams = new URLSearchParams(searchParams?.toString());
        newParams.delete('page');
        newParams.delete('sort');
        if (value) newParams.set(key, String(value));
        else newParams.delete(key);

        navigator(`${pathname}?${newParams.toString()}`);

        dispatch(filterAttributes({ key, value }));
    };
    const updateGridClass = (className: string) => {
        dispatch(updateGrid(className));
    };

    const resetQueryParams = () => {
        if (pathname) {
            dispatch(resetFilter());
            navigator(pathname);
        }
    };

    return {
        updateGridClass,
        updateFilterAttribute,
        updateQueryParam,
        grid,
        queryParams,
        resetQueryParams,
    };
};
